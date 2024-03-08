package it.epicode.capstone.Controllers;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Services.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@Tag(name = "Tournament Api")
@SecurityRequirement(name = "Easy3vs3Auth") //inserire quest annotazion in tutti i controller che devono essere autenticati
//@Hidden quest'annotazione nasconde tutto il controller, se messo su un metodo nasconderà solo il metodo
public class TournamentController {

    @Autowired
    private PlaceService placeSv;

    public Page<Competition> getAllTournamentByPlaceId(UUID id, Pageable pageable){
        return placeSv.getAllTournamentsByPlaceId(id, pageable);
    }
    public Page<Competition> getAllTournamentByKeywordCourtName(String keyword, Pageable pageable){
        return placeSv.findTournamentsByKeywordInCourtName(keyword, pageable);
    }
    public Page<Competition> getAllTournamentByKeywordTownName(String keyword, Pageable pageable){
        return placeSv.findTournamentsByKeywordInTownName(keyword, pageable);
    }
    public Page<Competition> getAllTournamentByKeywordRegion(String keyword, Pageable pageable){
        return placeSv.findTournamentsByKeywordInRegion(keyword, pageable);
    }

}
