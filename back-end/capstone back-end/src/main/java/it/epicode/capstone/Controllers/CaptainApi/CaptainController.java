package it.epicode.capstone.Controllers.CaptainApi;

import com.cloudinary.Cloudinary;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.TeamDTO;
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
import java.util.UUID;

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
    public Player createPlayer(@RequestBody @Validated PlayerDTO playerDTO){
        return playerSv.create(playerDTO);
    }

    @PatchMapping("/player/update/sigla/{name}")
    @Operation(
            description = "Update a player's sigla by their name.",
            summary = "Update player's sigla by name"
    )
    public ConfirmRes updateSigla(@PathVariable String name, @RequestBody @Validated PlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException {
        HandlerException.badRequestException(bindingResult);
        playerSv.updateSigla(name, playerDTO.sigla());
        return new ConfirmRes(
                "Player with name "+name+" has been updated with the sigla "+ playerDTO.sigla(),
                HttpStatus.CREATED
        );
    }

// ***************** TEAM CONTROLLER *************************

    @PostMapping("/team/create")
    @Operation(
            description = "Create a new team.",
            summary = "Create team"
    )
    public Team createTeam(@RequestBody @Validated TeamDTO teamDTO, BindingResult bindingResult ){
        HandlerException.illegalArgumentException(bindingResult);
        return teamSv.createTeam(teamDTO);
    }

    @PutMapping("/team/update/name/{id}")
    @Operation(
            description = "Update a team's name by its unique identifier.",
            summary = "Update team's name by ID"
    )
    public Team updateName(@PathVariable UUID id, @RequestBody @Validated TeamDTO teamDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return teamSv.updateName(id, teamDTO);
    }

    @PutMapping("/team/update/player/{id}")
    @Operation(
            description = "Update a team's players by its unique identifier.",
            summary = "Update team's players by ID"
    )
    public Team updatePlayer(@PathVariable UUID id, @RequestBody @Validated TeamDTO teamDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return teamSv.updatePlayers(id, teamDTO);
    }

// ***************** UPLOAD IMG CONTROLLER *************************

    @PatchMapping("/upload/logo-team/{name-team}")
    @Operation(
            description = "Upload a logo for a team.",
            summary = "Upload team's logo"
    )
    public UploadConfirm uploadLogoTeam(@RequestParam("file") MultipartFile file, @PathVariable("name-team") String nameTeam, BindingResult bindingResult) throws IOException, BadRequestException {
        HandlerException.badRequestException(bindingResult);
        HandlerException.ioException(bindingResult);
        Team team = teamSv.getByName(nameTeam);
        String url = (String) cloudinary.uploader().upload(file.getBytes(), new HashMap<>()).get("url");
        teamSv.updateLogo(team, url);
        return new UploadConfirm(
                "Logo for " + nameTeam + " uploaded successfully.",
                url
        );
    }

}
