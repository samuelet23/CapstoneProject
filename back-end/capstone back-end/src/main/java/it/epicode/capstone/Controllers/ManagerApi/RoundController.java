package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Exceptions.TournamentDataException;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.RoundsGeneratedRes;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/generate-round")
@Tag(name = "GENERATE ROUND API (only for managers)")
@PreAuthorize("hasAuthority('MANAGER')")
//@SecurityRequirement(name = "Easy3vs3Auth")
@Hidden
public class RoundController {

    @Autowired
    private TournamentService tournamentSv;


    @PostMapping("/quarter-final/{tournament-name}")
    @Operation(
            description = "Generate quarter finals for a tournament.",
            summary = "Generate Quarter Finals"
    )
    public RoundsGeneratedRes generateQuarterFinals(@PathVariable("tournament-name")String nameTournament) throws BadRequestException, TournamentDataException {
        List<Game> games = tournamentSv.generateQuartiMatches(nameTournament);
        return new RoundsGeneratedRes(
                "Quarter finals generated successfully.",
                games
        );
    }

    @PostMapping("/semi-final/{tournament-name}")
    @Operation(
            description = "Generate semi finals for a tournament.",
            summary = "Generate Semi Finals"
    )
    public RoundsGeneratedRes generateSemiFinals(@PathVariable("tournament-name")String nameTournament) throws BadRequestException, TournamentDataException {
        List<Game> games = tournamentSv.generateSemiFinals(nameTournament);
        return new RoundsGeneratedRes(
                "Semi finals generated successfully.",
                games
        );
    }

    @PostMapping("/final/{tournament-name}")
    @Operation(
            description = "Generate final match for a tournament.",
            summary = "Generate Final Match"
    )
    public RoundsGeneratedRes generateFinal(@PathVariable("tournament-name")String nameTournament) throws BadRequestException, TournamentDataException {
        List<Game> games = tournamentSv.generateFinale(nameTournament);
        return new RoundsGeneratedRes(
                "Final generated successfully.",
                games
        );
    }


}
