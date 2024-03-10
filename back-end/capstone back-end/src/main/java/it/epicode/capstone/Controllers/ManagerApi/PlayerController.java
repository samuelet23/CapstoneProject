package it.epicode.capstone.Controllers.ManagerApi;

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
    public ConfirmRes updateCredentialPlayers(@PathVariable UUID id,@RequestBody @Validated PlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateCredentialPlayer(id, playerDTO);
        return new ConfirmRes("Player's credential has been update successfully", HttpStatus.CREATED);
    }
    @PatchMapping("/update/stats/{id}")
    public ConfirmRes updateStatsById(@PathVariable UUID id,@RequestBody @Validated UpdateStatsPlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateStatsById(id, playerDTO);
        return new ConfirmRes("Player's stats has been update successfully", HttpStatus.CREATED);
    }
    @PatchMapping("/update/stats/{name}")
    public ConfirmRes updateStatsByName(@PathVariable String name,@RequestBody @Validated UpdateStatsPlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateStatsByName(name, playerDTO);
        return new ConfirmRes("Player's stats has been update successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
        public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        playerSv.deleteById(id);
        return new DeleteRes("Player deletion successful.");
    }
    @DeleteMapping("/delete/{name}")
    public DeleteRes deleteByName(@PathVariable String name)throws BadRequestException{
        playerSv.deleteByName(name);
        return new DeleteRes("Player deletion successful.");
    }


}