package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.RefereeDTO;
import it.epicode.capstone.Models.Entities.Referee;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Services.RefereeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/referee")
@Tag(name = "REFEREE")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAuthority('MANAGER')")
public class RefereeController {

    @Autowired
    private RefereeService refereeSv;


    @PostMapping("/create/{name}")
    @Operation(
            description = "Create a new referee.",
            summary = "Create Referee"
    )
    public Referee createReferee(@PathVariable("name") String tournamentName,@RequestBody @Validated RefereeDTO refereeDTO, BindingResult bindingResult) throws BadRequestException {
        HandlerException.badRequestException(bindingResult);
        return refereeSv.createReferee(refereeDTO, tournamentName);
    }

    @PutMapping("/update/byId/{id}")
    @Operation(
            description = "Update referee information.",
            summary = "Update Referee"
    )
    public ConfirmRes update(@PathVariable UUID id,@RequestBody @Validated RefereeDTO refereeDTO, BindingResult bindingResult )throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        refereeSv.updateById(id, refereeDTO);
        return new ConfirmRes(
                "Referee has been update successfully",
                HttpStatus.CREATED
        );
    }
    @PutMapping("/update/byNickname/{nickname}")
    @Operation(
            description = "Update referee information.",
            summary = "Update Referee"
    )
    public ConfirmRes update(@PathVariable String nickname,@RequestBody @Validated RefereeDTO refereeDTO, BindingResult bindingResult )throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        refereeSv.updateByNickname(nickname, refereeDTO);
        return new ConfirmRes(
                "Referee has been update successfully",
                HttpStatus.CREATED
        );
    }

    @DeleteMapping("/delete/byId/{id}")
    @Operation(
            description = "Delete a referee by ID.",
            summary = "Delete Referee by ID"
    )
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        refereeSv.deleteById(id);
        return new DeleteRes(
                "Referee has been deleted successfully"
        );
    }

    @DeleteMapping("/delete/byNickname/{nickname}")
    @Operation(
            description = "Delete a referee by name.",
            summary = "Delete Referee by Name"
    )
    public DeleteRes deleteByName(@PathVariable String nickname)throws BadRequestException{
        refereeSv.deleteByNickname(nickname);
        return new DeleteRes(
                "Referee has been deleted successfully"
        );
    }

}
