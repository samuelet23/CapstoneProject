package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Exceptions.TournamentDataException;
import it.epicode.capstone.Models.DTO.RefereeDTO;
import it.epicode.capstone.Models.DTO.TeamDTO;
import it.epicode.capstone.Models.DTO.TournamentDTO;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Referee;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmPlayerPoints;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Models.ResponsesDTO.RoundsGeneratedRes;
import it.epicode.capstone.Services.PlaceService;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tournament")
@Tag(name = "TOURNAMENT API (only for managers)")
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
    public ConfirmRes updateLevelToJunior(@RequestParam("tournament-name") String tournamentName, @RequestBody List<RefereeDTO> refereesDTO, BindingResult bindingResult) throws Exception {
        HandlerException.badRequestException(bindingResult);
        tournamentSv.updateLevelToJunior(tournamentName);
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
    public ConfirmRes updateLevelToRisingStars(@RequestParam("tournament-name") String tournamentName, @RequestBody List<RefereeDTO> refereesDTO, BindingResult bindingResult) throws Exception {
        HandlerException.badRequestException(bindingResult);
        tournamentSv.updateLevelToRisingStars( tournamentName);
        return new ConfirmRes(
                "Tournament Level has been updated to RISING STARS",
                HttpStatus.CREATED
        );
    }

    @PatchMapping("/update/level/elite/tournament-name")
    @Operation(
            description = "Update the level of a tournament to Elite and update the number of referees accordingly.",
            summary = "Update tournament level to Elite"
    )
    public ConfirmRes updateLevelToElite(@RequestParam("tournament-name") String tournamentName, @RequestBody @Validated List<RefereeDTO> refereesDTO, BindingResult bindingResult ) throws Exception {
        HandlerException.badRequestException(bindingResult);
        tournamentSv.updateLevelToElite(tournamentName);
        return new ConfirmRes(
                "Tournament Level has been updated to ELITE",
                HttpStatus.CREATED
        );
    }

    @PostMapping("/add/existing-team/tournament-name")
    public ConfirmRes addTeamExistingToTournament(@RequestParam("existing-team") String nameTeam,@RequestParam("tournament-name") String nameTournament) throws BadRequestException {

        tournamentSv.addTeamExistingToTournament(nameTeam,nameTournament);

        return new ConfirmRes(
                "Existing Team added successfully",
                HttpStatus.CREATED
        );
    }
    @PostMapping("/add/created-team/tournament-name")
    public ConfirmRes addCreatedTeamToTournament(@RequestBody @Validated TeamDTO teamDTO, @RequestParam("tournament-name") String nameTournament, BindingResult bindingResult) throws BadRequestException {
        HandlerException.badRequestException(bindingResult);
        tournamentSv.addCreatedTeamToTournament(teamDTO,nameTournament);
        return new ConfirmRes(
                "Created Team added successfully",
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




}

