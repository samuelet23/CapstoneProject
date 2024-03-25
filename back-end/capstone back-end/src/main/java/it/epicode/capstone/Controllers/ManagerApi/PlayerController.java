package it.epicode.capstone.Controllers.ManagerApi;

import com.cloudinary.Cloudinary;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.UpdateStatsPlayerDTO;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.*;
import it.epicode.capstone.Services.GameService;
import it.epicode.capstone.Services.PlayerService;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
@RequestMapping("/api/player")
@Tag(name = "PLAYER ")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAuthority('MANAGER')")
public class PlayerController {

    @Autowired
    private PlayerService playerSv;
    @Autowired
    private Cloudinary cloudinary;

    @PatchMapping("/update/credential/{id}")
    @Operation(
            description = "Update player's credentials by Name.",
            summary = "Update Player Credentials by Name"
    )
    public Player updateCredentialPlayers(@PathVariable UUID id,@RequestBody @Validated PlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return playerSv.updateCredentialPlayer(id, playerDTO);
    }

    @PatchMapping("/update/stats/byId/{id}")
    @Operation(
            description = "Update player's statistics by ID.",
            summary = "Update Player Stats by ID"
    )
    public ConfirmRes updateStatsById(@PathVariable UUID id,@RequestBody @Validated UpdateStatsPlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateStatsById(id, playerDTO);
        return new ConfirmRes("Player's stats have been updated successfully", HttpStatus.CREATED);
    }

    @PatchMapping("/update/stats/byNickname/{nickname}")
    @Operation(
            description = "Update player's statistics by nickname.",
            summary = "Update Player Stats by nickname"
    )
    public ConfirmRes updateStatsByNickname(@PathVariable String nickname,@RequestBody @Validated UpdateStatsPlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateStatsByName(nickname, playerDTO);
        return new ConfirmRes("Player's stats have been updated successfully", HttpStatus.CREATED);
    }

    @PatchMapping("upload/logo-player/{nickname}")
    @Operation(
            description = "Upload a logo for player.",
            summary = "Upload logo player"
    )
    public UploadConfirm uploadLogoPlayer(@RequestParam("file") MultipartFile file, @PathVariable("nickname") String nickname) throws IOException, BadRequestException {
        String url = (String) cloudinary.uploader().upload(file.getBytes(), new HashMap<>()).get("url");
        playerSv.uploadLogo(url,nickname);
        return new UploadConfirm(
                "Cover was uploaded successfully",
                url
        );
    }

    @DeleteMapping("/delete/byId/{id}")
    @Operation(
            description = "Delete a player by ID.",
            summary = "Delete Player by ID"
    )
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        playerSv.deleteById(id);
        return new DeleteRes("Player deletion successful.");
    }

    @DeleteMapping("/delete/byName/{nickname}")
    @Operation(
            description = "Delete a player by nickname.",
            summary = "Delete Player by nickname"
    )
    public DeleteRes deleteByNickname(@PathVariable String nickname)throws BadRequestException{
        playerSv.deleteByName(nickname);
        return new DeleteRes("Player deletion successful.");
    }


}