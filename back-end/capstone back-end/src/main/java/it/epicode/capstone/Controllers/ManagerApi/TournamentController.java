package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.RefereeDTO;
import it.epicode.capstone.Models.DTO.TeamDTO;
import it.epicode.capstone.Models.DTO.TournamentDTO;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Services.PlaceService;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tournament")
@Tag(name = "TOURNAMENT ")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAuthority('MANAGER')")
public class TournamentController {

    @Autowired
    private PlaceService placeSv;

    @Autowired
    private TournamentService tournamentSv;

    @PostMapping("/create")
    @Operation(
            description = "Create a new tournament.",
            summary = "Create tournament"
    )
    public Tournament createTournament(@RequestBody @Validated  TournamentDTO dto)throws Exception{
        return tournamentSv.createTournament(dto);
    }



    @PatchMapping("/update/level/junior/tournament-name")
    @Operation(
            description = "Update the level of a tournament to Junior and update the number of referees accordingly.",
            summary = "Update tournament level to Junior"
    )
    public ConfirmRes updateLevelToJunior(@RequestParam("tournament-name") String tournamentName, @RequestBody @Validated List<RefereeDTO> refereesDTOs, BindingResult bindingResult) throws Exception {
        HandlerException.badRequestException(bindingResult);
        tournamentSv.updateLevelToJunior(refereesDTOs,tournamentName);
        return new ConfirmRes(
                "Tournament Level has been updated to JUNIOR",
                HttpStatus.CREATED
        );
    }



    @PatchMapping("/update/level/rising-stars/tournament-name")
    @Operation(
            description = "Update the level of a tournament to Rising Stars and update the number of referees accordingly.",
            summary = "Update tournament level to Rising Stars"
    )
    public ConfirmRes updateLevelToRisingStars(@RequestParam("tournament-name") String tournamentName, @RequestBody @Validated List<RefereeDTO> refereesDTOs, BindingResult bindingResult) throws Exception {
        HandlerException.badRequestException(bindingResult);
        tournamentSv.updateLevelToRisingStars(refereesDTOs, tournamentName);
        return new ConfirmRes(
                "Tournament Level has been updated to RISING STARS",
                HttpStatus.CREATED
        );
    }
    @PreAuthorize("hasAnyAuthority('COORDINATOR','MANAGER')")
    @PostMapping("/start/{tournament-name}")
    public List<Game> startTournament(@PathVariable("tournament-name") String nameTournament)throws BadRequestException{
        return tournamentSv.startTournament(nameTournament);
    }


    @PatchMapping("/update/level/elite/tournament-name")
    @Operation(
            description = "Update the level of a tournament to Elite and update the number of referees accordingly.",
            summary = "Update tournament level to Elite"
    )
    public ConfirmRes updateLevelToElite(@RequestParam("tournament-name") String tournamentName, @RequestBody @Validated List<RefereeDTO> refereesDTOs, BindingResult bindingResult ) throws Exception {
        HandlerException.badRequestException(bindingResult);
        tournamentSv.updateLevelToElite(refereesDTOs,tournamentName);
        return new ConfirmRes(
                "Tournament Level has been updated to ELITE",
                HttpStatus.CREATED
        );
    }



    @DeleteMapping("/delete/byId/{id}")
    @Operation(
            description = "Delete a tournament by its ID.",
            summary = "Delete tournament by ID"
    )
    public DeleteRes deleteTournamentById(@PathVariable UUID id)throws BadRequestException{
        tournamentSv.deleteById(id);
        return new DeleteRes(
                "Tournament with ID "+id+ " has been deleted successfully"
        );
    }

    @DeleteMapping("/delete/byName/{name}")
    @Operation(
            description = "Delete a tournament by its name.",
            summary = "Delete tournament by name"
    )
    public DeleteRes deleteTournamentByName(@PathVariable String name)throws BadRequestException{
        tournamentSv.deleteByName(name);
        return new DeleteRes(
                "Tournament with name "+name+ " has been deleted successfully"
        );
    }

    @DeleteMapping("/delete/team-from-tournament/{teamName}/{tournamentName}")
    @Operation(
            description = "Remove a team from a tournament.",
            summary = "Remove team from tournament"
    )
    public DeleteRes deleteTeamFromTournament(@PathVariable String teamName, @PathVariable String tournamentName) throws BadRequestException {
        tournamentSv.deleteTeamFromTournament(teamName, tournamentName);
        return new DeleteRes(
                "Team with name: " + teamName + " has been removed from tournament: " + tournamentName + " successfully"
        );
    }


}

