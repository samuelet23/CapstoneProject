package it.epicode.capstone.Controllers;

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
@Tag(name = "Town/Province/Region API")
public class PlaceController {

    @Autowired
    private PlaceService placeSv;

    private TownRepository townRp;

    @GetMapping("/get/all")
    public Page<Place> getAllPlace(Pageable pageable){
        return placeSv.getAll(pageable);
    }
    @GetMapping("/get/all/town")
    public List<Town> getAllTown(){
        return placeSv.getAllTown();
    }
    @GetMapping("/get/all/province")
    public List<Province> getAllProvince(){
        return placeSv.getAllProvince();
    }
    @GetMapping("/get/all/region")
    public List<String> getAllRegione(){
        return placeSv.getAllRegion();
    }
    @GetMapping("/get/{id}")
    public Place getPlaceById(@PathVariable UUID id)throws BadRequestException{
        return placeSv.getById(id);
    }
    @GetMapping("/get/court-name")
    public Place getPlaceByCourtName(@RequestParam("court-name") String courtName)throws BadRequestException{
        return placeSv.getByCourtName(courtName);
    }
    @GetMapping("/get/town-name")
    public Place getTownName(@RequestParam("town-name") String townName)throws BadRequestException{
        return placeSv.getByTownName(townName);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('MANAGER')")
    public Place createPlace(@RequestBody @Validated PlaceDTO placeDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return placeSv.save(placeDTO) ;
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ConfirmRes updatePlaceById(@RequestBody @Validated PlaceDTO placeDTO,@PathVariable UUID id,BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        placeSv.updateById(placeDTO, id);
         return new ConfirmRes(
                 "place has been updated successfully",
                 HttpStatus.ACCEPTED
         );
    }
    @PutMapping("/update/court-name")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ConfirmRes updatePlaceByCourtName(@RequestBody PlaceDTO placeDTO, @RequestParam("court-name") String courtName,BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        placeSv.updateByCourtName(placeDTO, courtName);
         return new ConfirmRes(
                 "place has been updated successfully",
                 HttpStatus.ACCEPTED
         );
    }
    @PatchMapping("/update/id/court-name")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ConfirmRes updateCourtName(@RequestParam UUID id, @RequestBody @Validated PlaceDTO placeDTO,BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        placeSv.updateCourtName(id, placeDTO.courtName());
         return new ConfirmRes(
                 "court name has been updated successfully",
                 HttpStatus.ACCEPTED
         );
    }

    @PatchMapping("/update/id/address")
    @PreAuthorize("hasAuthority('MANAGER')")
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
                "address has been updated successfully",
                HttpStatus.ACCEPTED
        );
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public DeleteRes deletePlace (@PathVariable UUID id)throws BadRequestException{
        placeSv.delete(id);
        return new DeleteRes(
                "Place has been deleted successfully"
        );
    }

}
