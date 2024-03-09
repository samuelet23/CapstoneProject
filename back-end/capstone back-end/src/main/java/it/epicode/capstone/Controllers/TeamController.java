package it.epicode.capstone.Controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Exceptions.NotFoundException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.TeamDTO;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Services.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/team")
@Tag(name = "Team API")
public class TeamController {

    @Autowired
    private TeamService teamSv;

    @GetMapping("/get/all")
    public Page<Team> getAllTeam(Pageable pageable){
        return teamSv.getAll(pageable);
    }
    @GetMapping("/get/all/tournament-name")
    public List<Team> getAllByTournamentName(@RequestParam("tournament-name") String tournamentName){
        return teamSv.getAllByTournamentName(tournamentName);
    }
    @GetMapping("/get/all/without-captain")
    public List<Team> getAllTeamWithoutCaptain() throws NotFoundException {
        List<Team> teams = teamSv.getAllTeamWithoutCaptain();
        if (teams.isEmpty()) {
            throw new NotFoundException( "No teams without a captain found." );
        }
        return teams;
    }
    @GetMapping("/get/{id}")
    public Team getTeamById(@PathVariable UUID id)throws BadRequestException {
        return teamSv.getById(id);
    }
    @GetMapping("/get/{name}")
    public Team getTeamByName(@PathVariable String name)throws BadRequestException {
        return teamSv.getByName(name);
    }
    @GetMapping("/get/player-name")
    public Team getTeamByPlayerName(@RequestParam("player-name") String playerName)throws BadRequestException{
        return teamSv.getByPlayerName(playerName);
    }

    @PostMapping("/create")
    public Team createTeam(@RequestBody @Validated TeamDTO teamDTO, BindingResult bindingResult ){
        HandlerException.illegalArgumentException(bindingResult);
        return teamSv.saveTeam(teamDTO);
    }
    @PutMapping("/update/{id}")
    public Team updateTeam(@PathVariable UUID id, @RequestBody @Validated TeamDTO teamDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return teamSv.update(id, teamDTO);
    }
    @PatchMapping("/update/captain/team-name")
    public ConfirmRes updateCaptainFromTeam(@RequestParam("team-name") String teamName, @RequestBody @Validated  PlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        teamSv.updateCaptain(teamName, playerDTO.name());
        return new ConfirmRes(
                "Captain updated successfully."+ playerDTO.name()+ "is now the captain of the team "+teamName+".",
                HttpStatus.CREATED
        );
    }

    @DeleteMapping("/delete/{id}")
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        teamSv.deleteById(id);
        return new DeleteRes(
                "Team with id: "+id+" has been deleted successfully"
        );
    }
    @DeleteMapping("/delete/{name}")
    public DeleteRes deleteByName(@PathVariable String name)throws BadRequestException{
        teamSv.deleteByName(name);
        return new DeleteRes(
                "Team with name: "+name+" has been deleted successfully"
        );
    }

}
