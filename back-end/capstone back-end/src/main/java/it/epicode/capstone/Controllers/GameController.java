package it.epicode.capstone.Controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.AddPointsDTO;
import it.epicode.capstone.Models.DTO.BeforeGameDTO;
import it.epicode.capstone.Models.DTO.DuringGameDTO;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Services.GameService;
import it.epicode.capstone.Services.PlayerService;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/game")
@Tag(name = "Game")
public class GameController {

    @Autowired
    private GameService gameSv;
    @Autowired
    private PlayerService playerSv;
    @Autowired
    private TournamentService tournamentSv;
    @Autowired
    private ConfirmRes confirmRes;



    @GetMapping("/get/all")
    public Page<Game> getGameAll(Pageable pageable){
        return gameSv.getAll(pageable);
    }
    @GetMapping("/get/all/tournament/{name}")
    public List<Game> getGameAllByTournament(@PathVariable String name)throws BadRequestException{
        Tournament tournament = tournamentSv.getByName(name);
        return gameSv.getAllByTournament(tournament);
    }
    @GetMapping("/get/{id}")
    public Game getGameById(@PathVariable UUID id)throws BadRequestException {
        return gameSv.getById(id);
    }

    @PostMapping("/create")
    public Game createGame(@RequestBody @Validated BeforeGameDTO beforeGameDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return gameSv.createGame(beforeGameDTO);
    }

    @PutMapping("/update/{id}/homePoints")
    public Game updateHomePoints(@PathVariable UUID id,@RequestBody @Validated AddPointsDTO addPointsDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return gameSv.updateHomePoints(id, addPointsDTO.pointToAdd(), addPointsDTO.siglaPlayer());
    }
    @PutMapping("/update/{id}/awayPoints")
    public Game updateAwayPoints(@PathVariable UUID id, @RequestBody @Validated AddPointsDTO addPointsDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return gameSv.updateAwayPoints(id, addPointsDTO.pointToAdd(), addPointsDTO.siglaPlayer());
    }
    @PostMapping("/finish/{id}")
    public Team finishedGame(@PathVariable UUID id, @RequestBody @Validated DuringGameDTO gameDTO, BindingResult bindingResult)throws Exception{
        HandlerException.exception(bindingResult);
        return gameSv.finishedGame(id, gameDTO);
    }

    @DeleteMapping("/delete/{id}")
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        gameSv.delete(id);
        return new DeleteRes("game was successfully deleted");
    }
}
