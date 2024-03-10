package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.UpdateStatsPlayerDTO;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmPlayerPoints;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Models.ResponsesDTO.PlayerPointRes;
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

import java.util.UUID;

@RestController
@RequestMapping("/api/player")
@Tag(name = "PLAYER API (only for managers)")
@PreAuthorize("hasAuthority('MANAGER')")
@SecurityRequirement(name = "Easy3vs3Auth")
public class PlayerController {

    @Autowired
    private PlayerService playerSv;

    @PatchMapping("/update/credential/{id}")
    @Operation(
            description = "Update player's credentials by ID.",
            summary = "Update Player Credentials by ID"
    )
    public ConfirmRes updateCredentialPlayers(@PathVariable UUID id,@RequestBody @Validated PlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateCredentialPlayer(id, playerDTO);
        return new ConfirmRes("Player's credential has been updated successfully", HttpStatus.CREATED);
    }

    @PatchMapping("/update/stats/{id}")
    @Operation(
            description = "Update player's statistics by ID.",
            summary = "Update Player Stats by ID"
    )
    public ConfirmRes updateStatsById(@PathVariable UUID id,@RequestBody @Validated UpdateStatsPlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateStatsById(id, playerDTO);
        return new ConfirmRes("Player's stats have been updated successfully", HttpStatus.CREATED);
    }

    @PatchMapping("/update/stats/{name}")
    @Operation(
            description = "Update player's statistics by name.",
            summary = "Update Player Stats by Name"
    )
    public ConfirmRes updateStatsByName(@PathVariable String name,@RequestBody @Validated UpdateStatsPlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateStatsByName(name, playerDTO);
        return new ConfirmRes("Player's stats have been updated successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            description = "Delete a player by ID.",
            summary = "Delete Player by ID"
    )
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        playerSv.deleteById(id);
        return new DeleteRes("Player deletion successful.");
    }

    @DeleteMapping("/delete/{name}")
    @Operation(
            description = "Delete a player by name.",
            summary = "Delete Player by Name"
    )
    public DeleteRes deleteByName(@PathVariable String name)throws BadRequestException{
        playerSv.deleteByName(name);
        return new DeleteRes("Player deletion successful.");
    }


}