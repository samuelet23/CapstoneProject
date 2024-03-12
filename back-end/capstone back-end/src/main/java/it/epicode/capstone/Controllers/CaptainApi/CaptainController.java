package it.epicode.capstone.Controllers.CaptainApi;

import com.cloudinary.Cloudinary;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.TeamDTO;
import it.epicode.capstone.Models.DTO.UpdatePlayerTeamDTO;
import it.epicode.capstone.Models.DTO.UpdateTeamNameDTO;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.UploadConfirm;
import it.epicode.capstone.Services.PlayerService;
import it.epicode.capstone.Services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api")
@Tag(name = "CAPTAIN ROLE API (only  for Captains and Managers)")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAnyAuthority('CAPTAIN','MANAGER')")
public class CaptainController {
    @Autowired
    private PlayerService playerSv;
    @Autowired
    private TeamService teamSv;
    @Autowired
    private Cloudinary cloudinary;

// ***************** PLAYER CONTROLLER *************************

    @PostMapping("/player/create")
    @Operation(
            description = "Create a new player.",
            summary = "Create player"
    )
    public Player createPlayer(@RequestBody @Validated PlayerDTO playerDTO) throws BadRequestException {
        return playerSv.create(playerDTO);
    }

    @PatchMapping("/player/update/sigla/{nickname}")
    @Operation(
            description = "Update a player's sigla by their name.",
            summary = "Update player's sigla by name"
    )
    public ConfirmRes updateSigla(@PathVariable String nickname, @RequestBody Map<String, String> requestBody, BindingResult bindingResult)throws BadRequestException {
        if (!requestBody.containsKey("sigla") || requestBody.get("sigla").isEmpty()) {
            throw new BadRequestException("Il campo sigla non può essere vuoto.");
        }
        String sigla = requestBody.get("sigla");
        if (!Pattern.matches("[A-E]", sigla)) {
            throw new BadRequestException("La sigla deve essere una lettera compresa tra 'A' e 'E'");
        }
        HandlerException.badRequestException(bindingResult);

        playerSv.updateSigla(nickname, sigla);

        return new ConfirmRes(
                "Il giocatore con nome " + nickname + " è stato aggiornato con la sigla " + sigla,
                HttpStatus.CREATED
        );
    }

// ***************** TEAM CONTROLLER *************************

    @PostMapping("/team/create")
    @Operation(
            description = "Create a new team.",
            summary = "Create team"
    )
    public Team createTeam(@RequestBody @Validated TeamDTO teamDTO, BindingResult bindingResult ) throws BadRequestException {
        HandlerException.illegalArgumentException(bindingResult);
        return teamSv.createTeam(teamDTO);
    }

    @PatchMapping("/team/update/name/{id}")
    @Operation(
            description = "Aggiorna il nome di una squadra mediante il suo identificatore univoco.",
            summary = "Aggiorna il nome della squadra tramite l'ID"
    )
    public Team updateName(@PathVariable UUID id, @RequestBody UpdateTeamNameDTO teamName, BindingResult bindingResult) throws BadRequestException {

        HandlerException.badRequestException(bindingResult);
        return teamSv.updateName(id, teamName.teamName());
    }


// ***************** UPLOAD IMG CONTROLLER *************************

    @PatchMapping("/upload/logo-team/{name-team}")
    @Operation(
            description = "Upload a logo for a team.",
            summary = "Upload team's logo"
    )
    public UploadConfirm uploadLogoTeam(@RequestParam("file") MultipartFile file, @PathVariable("name-team") String nameTeam) throws IOException, BadRequestException {
        Team team = teamSv.getByName(nameTeam);
        String url = (String) cloudinary.uploader().upload(file.getBytes(), new HashMap<>()).get("url");
        teamSv.updateLogo(team, url);
        return new UploadConfirm(
                "Logo for " + nameTeam + " uploaded successfully.",
                url
        );
    }

}
