package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.TeamDTO;
import it.epicode.capstone.Models.DTO.UpdateCoordinatorDTO;
import it.epicode.capstone.Models.DTO.UpdateTeamNameDTO;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/team")
@Tag(name = "TEAM ")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAuthority('MANAGER')")
public class TeamController {

    @Autowired
    private TeamService teamSv;


    @PutMapping("/update/team/{team-name}")
    @Operation(
            description = "Update team.",
            summary = "Update team "
    )
    public Team updateTeam(@PathVariable("team-name") String name, @RequestBody @Validated TeamDTO teamDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return teamSv.updateTeam(name, teamDTO);

    }
    @PatchMapping("/update/{id}/team-name")
    @Operation(
            description = "Update the captain of a team.",
            summary = "Update team captain"
    )
    public Team updateCaptainFromTeam(@PathVariable("id") UUID id, @RequestBody @Validated UpdateTeamNameDTO nameDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return teamSv.updateName(id, nameDTO.teamName());

    }
    @PatchMapping("/update/captain/team-name")
    @Operation(
            description = "Update the captain of a team.",
            summary = "Update team captain"
    )
    public Player updateCaptainFromTeam(@RequestParam("team-name") String teamName, @RequestBody @Validated UpdateCoordinatorDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return teamSv.updateCaptain(teamName, playerDTO.nickname());

    }

    @DeleteMapping("/delete/byId/{id}")
    @Operation(
            description = "Delete a team by its ID.",
            summary = "Delete team by ID"
    )
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        teamSv.deleteById(id);
        return new DeleteRes(
                "Team with id: " + id + " has been deleted successfully"
        );
    }

    @DeleteMapping("/delete/byName/{name}")
    @Operation(
            description = "Delete a team by its name.",
            summary = "Delete team by name"
    )
    public DeleteRes deleteByName(@PathVariable String name)throws BadRequestException{
        teamSv.deleteByName(name);
        return new DeleteRes(
                "Team with name: " + name + " has been deleted successfully"
        );
    }



}
