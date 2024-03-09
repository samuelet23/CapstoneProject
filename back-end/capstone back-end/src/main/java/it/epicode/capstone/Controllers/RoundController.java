package it.epicode.capstone.Controllers;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Exceptions.TournamentDataException;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.RoundsGeneratedRes;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/generate-round")
@Tag(name = "Generate Round API")
@Hidden
public class RoundController {

    @Autowired
    private TournamentService tournamentSv;

    @GetMapping("/octave-final/{tournament-name}")
    public RoundsGeneratedRes generateOctaveFinals(@PathVariable("tournament-name") String nameTournament, BindingResult bindingResult)throws BadRequestException {
        Tournament t = tournamentSv.getByName(nameTournament);
        HandlerException.badRequestException(bindingResult);
        List<Game> games =tournamentSv.generateOttaviMatches(t);
        return new RoundsGeneratedRes(
                "Octave finals generated successfully.",
                games
        );
    }
    @GetMapping("/quarter-final/{tournament-name}")
    public RoundsGeneratedRes generateQuarterFinals(@PathVariable("tournament-name")String nameTournament, BindingResult bindingResult) throws BadRequestException, TournamentDataException {
        Tournament t = tournamentSv.getByName(nameTournament);
        HandlerException.tournamentDataException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        List<Game> games =tournamentSv.generateQuarterFinalMatches(t);
        return new RoundsGeneratedRes(
                "Quarter finals generated successfully.",
                games
        );
    }
    @GetMapping("/semi-final/{tournament-name}")
    public RoundsGeneratedRes generateSemiFinals(@PathVariable("tournament-name")String nameTournament, BindingResult bindingResult) throws BadRequestException, TournamentDataException {
        Tournament t = tournamentSv.getByName(nameTournament);
        HandlerException.tournamentDataException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        List<Game> games =tournamentSv.generateSemiFinalMatches(t);
        return new RoundsGeneratedRes(
                "Semi finals generated successfully.",
                games
        );
    }
    @GetMapping("/final/{tournament-name}")
    public RoundsGeneratedRes generateFinal(@PathVariable("tournament-name")String nameTournament, BindingResult bindingResult) throws BadRequestException, TournamentDataException {
        Tournament t = tournamentSv.getByName(nameTournament);
        HandlerException.tournamentDataException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        List<Game> games =tournamentSv.generateFinalMatch(t);
        return new RoundsGeneratedRes(
                "Final generated successfully.",
                games
        );
    }

}
