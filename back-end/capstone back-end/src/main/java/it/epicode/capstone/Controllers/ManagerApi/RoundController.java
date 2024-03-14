package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.TournamentDataException;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/generate")
@Tag(name = "ROUND ")
@PreAuthorize("hasAuthority('MANAGER')")
@SecurityRequirement(name = "Easy3vs3Auth")
//@Hidden
public class RoundController {

    @Autowired
    private TournamentService tournamentSv;


    @PostMapping("/quarter-final/{tournament-name}")
    @Operation(
            description = "Generate quarter finals for a tournament.",
            summary = "Generate Quarter Finals"
    )
    public ConfirmRes generateQuarterFinals(@PathVariable("tournament-name")String nameTournament) throws BadRequestException, TournamentDataException {
        List<Game> games = tournamentSv.generateQuartiMatches(nameTournament);
        return new ConfirmRes(
                "Quarter finals generated successfully.",
                HttpStatus.CREATED
        );
    }

    @PostMapping("/semi-final/{tournament-name}")
    @Operation(
            description = "Generate semi finals for a tournament.",
            summary = "Generate Semi Finals"
    )
    public ConfirmRes generateSemiFinals(@PathVariable("tournament-name")String nameTournament) throws BadRequestException, TournamentDataException {
        List<Game> games = tournamentSv.generateSemiFinals(nameTournament);
        return new ConfirmRes(
                "Semi finals generated successfully.",
                HttpStatus.CREATED
        );
    }

    @PostMapping("/final/{tournament-name}")
    @Operation(
            description = "Generate final match for a tournament.",
            summary = "Generate Final Match"
    )
    public ConfirmRes generateFinal(@PathVariable("tournament-name")String nameTournament) throws BadRequestException, TournamentDataException {
        Game game = tournamentSv.generateFinale(nameTournament);
        return new ConfirmRes(
                "Final generated successfully.",
                HttpStatus.CREATED
        );
    }


}
