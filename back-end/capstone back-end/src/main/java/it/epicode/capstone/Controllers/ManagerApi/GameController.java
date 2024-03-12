package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.AddPointsDTO;
import it.epicode.capstone.Models.DTO.BeforeGameDTO;
import it.epicode.capstone.Models.DTO.DuringGameDTO;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Services.GameService;
import it.epicode.capstone.Services.PlayerService;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/game")
@Tag(name = "GAME API (only for Managers)")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAuthority('MANAGER')")
public class GameController {

    @Autowired
    private GameService gameSv;
    @Autowired
    private PlayerService playerSv;
    @Autowired
    private TournamentService tournamentSv;


    @PostMapping("/create")
    @Operation(
            description = "Create a new game.",
            summary = "Create Game"
    )
    public Game createGame(@RequestBody @Validated BeforeGameDTO beforeGameDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return gameSv.createGame(beforeGameDTO);
    }

    @PutMapping("/update/{id}/homePoints")
    @Operation(
            description = "Update home points of a game.",
            summary = "Update Home Points"
    )
    public Game updateHomePoints(@PathVariable UUID id,@RequestBody @Validated AddPointsDTO addPointsDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return gameSv.updateHomePoints(id, addPointsDTO.pointToAdd(), addPointsDTO.siglaPlayer());
    }

    @PutMapping("/update/{id}/awayPoints")
    @Operation(
            description = "Update away points of a game.",
            summary = "Update Away Points"
    )
    public Game updateAwayPoints(@PathVariable UUID id, @RequestBody @Validated AddPointsDTO addPointsDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return gameSv.updateAwayPoints(id, addPointsDTO.pointToAdd(), addPointsDTO.siglaPlayer());
    }

    @PostMapping("/finish/{id}")
    @Operation(
            description = "Finish a game.",
            summary = "Finish Game"
    )
    public Team finishedGame(@PathVariable UUID id)throws Exception{
        return gameSv.finishedGame(id);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            description = "Delete a game by ID.",
            summary = "Delete Game by ID"
    )
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        gameSv.delete(id);
        return new DeleteRes("Game was successfully deleted");
    }

}
