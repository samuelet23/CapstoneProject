package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Exceptions.NotFoundException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.TeamDTO;
import it.epicode.capstone.Models.DTO.UpdateCaptainDTO;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Services.TeamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/team")
@Tag(name = "TEAM ")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAuthority('MANAGER')")
public class TeamController {

    @Autowired
    private TeamService teamSv;


    @PatchMapping("/update/captain/team-name")
    @Operation(
            description = "Update the captain of a team.",
            summary = "Update team captain"
    )
    public ConfirmRes updateCaptainFromTeam(@RequestParam("team-name") String teamName, @RequestBody @Validated UpdateCaptainDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        teamSv.updateCaptain(teamName, playerDTO.nickname());
        return new ConfirmRes(
                "Captain updated successfully. " + playerDTO.nickname() + " is now the captain of the team " + teamName + ".",
                HttpStatus.CREATED
        );
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
