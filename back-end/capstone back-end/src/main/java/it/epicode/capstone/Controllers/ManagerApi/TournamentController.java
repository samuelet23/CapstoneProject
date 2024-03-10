package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Exceptions.TournamentDataException;
import it.epicode.capstone.Models.DTO.TournamentDTO;
import it.epicode.capstone.Models.Entities.Game;
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
@PreAuthorize("hasAuthority('MANAGER')")
@SecurityRequirement(name = "Easy3vs3Auth") //inserire quest annotazion in tutti i controller che devono essere autenticati
public class TournamentController {

    @Autowired
    private PlaceService placeSv;

    @Autowired
    private TournamentService tournamentSv;


    @PostMapping("/create")
    public Tournament createTournament(@RequestBody @Validated  TournamentDTO dto)throws Exception{
        return tournamentSv.createTournament(dto);
    }

    @PatchMapping("/update/level/junior/tournament-name")
    public ConfirmRes updateLevelToJunior(@RequestParam("tournament-name") String tournamentName, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        tournamentSv.updateLevelToJunior(tournamentName);
        return new ConfirmRes(
                "Tournament Level has been updated to JUNIOR",
                    HttpStatus.CREATED
        );
    }
    @PatchMapping("/update/level/rising-stars/tournament-name")
    public ConfirmRes updateLevelToRisingStars(@RequestParam("tournament-name")String tournamentName, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        tournamentSv.updateLevelToRisingStars(tournamentName);
        return new ConfirmRes(
                "Tournament Level has been updated to RISING STARS",
                    HttpStatus.CREATED
        );
    }
    @PatchMapping("/update/level/elite/tournament-name")
    public ConfirmRes updateLevelToElite(@RequestParam("tournament-name")String tournamentName, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        tournamentSv.updateLevelToElite(tournamentName);
        return new ConfirmRes(
                "Tournament Level has been updated to ELITE",
                    HttpStatus.CREATED
        );
    }
    @DeleteMapping("/delete/{id}")
    public DeleteRes deleteTournamentById(@PathVariable UUID id)throws BadRequestException{
        tournamentSv.deleteById(id);
        return new DeleteRes(
                "tournament with id "+id+ " has been deleted successfully"
        );
    }
    @DeleteMapping("/delete/{name}")
    public DeleteRes deleteTournamentByName(@PathVariable String name)throws BadRequestException{
        tournamentSv.deleteByName(name);
        return new DeleteRes(
                "tournament with name "+name+ " has been deleted successfully"
        );
    }




}

