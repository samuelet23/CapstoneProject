package it.epicode.capstone.Controllers.ManagerApi;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.AddressDTO;
import it.epicode.capstone.Models.DTO.PlaceDTO;
import it.epicode.capstone.Models.Entities.Address;
import it.epicode.capstone.Models.Entities.Place;
import it.epicode.capstone.Models.Entities.Province;
import it.epicode.capstone.Models.Entities.Town;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Repositories.TownRepository;
import it.epicode.capstone.Services.PlaceService;
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
@RequestMapping("/api/place")
@Tag(name = "TOWN/PROVINCE/REGION API (only for Managers)")
@PreAuthorize("hasAuthority('MANAGER')")
@SecurityRequirement(name = "Easy3vs3Auth")
public class PlaceController {

    @Autowired
    private PlaceService placeSv;

    private TownRepository townRp;

    @PostMapping("/create")
    @Operation(
            description = "Create a new place.",
            summary = "Create Place"
    )
    public Place createPlace(@RequestBody @Validated PlaceDTO placeDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return placeSv.save(placeDTO) ;
    }

    @PutMapping("/update/{id}")
    @Operation(
            description = "Update a place by ID.",
            summary = "Update Place by ID"
    )
    public ConfirmRes updatePlaceById(@RequestBody @Validated PlaceDTO placeDTO,@PathVariable UUID id,BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        placeSv.updateById(placeDTO, id);
        return new ConfirmRes(
                "Place has been updated successfully",
                HttpStatus.ACCEPTED
        );
    }

    @PutMapping("/update/court-name")
    @Operation(
            description = "Update a place by court name.",
            summary = "Update Place by Court Name"
    )
    public ConfirmRes updatePlaceByCourtName(@RequestBody PlaceDTO placeDTO, @RequestParam("court-name") String courtName,BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        placeSv.updateByCourtName(placeDTO, courtName);
        return new ConfirmRes(
                "Place has been updated successfully",
                HttpStatus.ACCEPTED
        );
    }

    @PatchMapping("/update/id/court-name")
    @Operation(
            description = "Update court name of a place by ID.",
            summary = "Update Court Name of Place by ID"
    )
    public ConfirmRes updateCourtName(@RequestParam UUID id, @RequestBody @Validated PlaceDTO placeDTO,BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        placeSv.updateCourtName(id, placeDTO.courtName());
        return new ConfirmRes(
                "Court name has been updated successfully",
                HttpStatus.ACCEPTED
        );
    }

    @PatchMapping("/update/id/address")
    @Operation(
            description = "Update address of a place by ID.",
            summary = "Update Address of Place by ID"
    )
    public ConfirmRes updateAddress(@RequestParam UUID id,@RequestBody @Validated AddressDTO address, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        Address a = new Address(
                address.via(),
                address.civico(),
                address.cap(),
                address.townName(),
                address.siglaProvince()
        );
        placeSv.updateAddress(id, a);
        return new ConfirmRes(
                "Address has been updated successfully",
                HttpStatus.ACCEPTED
        );
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            description = "Delete a place by ID.",
            summary = "Delete Place by ID"
    )
    public DeleteRes deletePlace (@PathVariable UUID id)throws BadRequestException{
        placeSv.delete(id);
        return new DeleteRes(
                "Place has been deleted successfully"
        );
    }

}
