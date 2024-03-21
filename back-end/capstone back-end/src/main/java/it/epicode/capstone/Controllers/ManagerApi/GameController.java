package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.AddPointsDTO;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Services.GameService;
import it.epicode.capstone.Services.PlayerService;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/game")
@Tag(name = "GAME")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAuthority('MANAGER')")
public class GameController {

    @Autowired
    private GameService gameSv;
    @Autowired
    private PlayerService playerSv;
    @Autowired
    private TournamentService tournamentSv;


    @PostMapping("/start/game-id")
    @Operation(
            description = "start a game.",
            summary = "Start Game"
    )
    public Game startGame(@RequestParam("game-id") UUID id)throws BadRequestException{
        return gameSv.createGame(id);

    }

    @PutMapping("/update/{id}/homePoints")
    @Operation(
            description = "Update home points of a game.",
            summary = "Update Home Points"
    )
    public ConfirmRes updateHomePoints(@PathVariable UUID id,@RequestBody AddPointsDTO addPointsDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        gameSv.updateHomePoints(id, addPointsDTO.pointToAdd(), addPointsDTO.siglaPlayer());
        return new ConfirmRes(
                "I punti sono statti aggiunti correttamente",
                HttpStatus.OK
        );
    }

    @PutMapping("/update/{id}/awayPoints")
    @Operation(
            description = "Update away points of a game.",
            summary = "Update Away Points"
    )
    public ConfirmRes updateAwayPoints(@PathVariable UUID id, @RequestBody @Validated AddPointsDTO addPointsDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        gameSv.updateAwayPoints(id, addPointsDTO.pointToAdd(), addPointsDTO.siglaPlayer());

        return new ConfirmRes(
                "I punti sono statti aggiunti correttamente",
                HttpStatus.OK
        );
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
