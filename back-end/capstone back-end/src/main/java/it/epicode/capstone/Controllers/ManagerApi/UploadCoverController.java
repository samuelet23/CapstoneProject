package it.epicode.capstone.Controllers.ManagerApi;

import com.cloudinary.Cloudinary;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.UploadConfirm;
import it.epicode.capstone.Services.TeamService;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

@RestController
@RequestMapping("/api/upload")
@Tag(name = "UPLOAD COVER TOURNAMENT ")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAuthority('MANAGER')")
public class UploadCoverController {

    @Autowired
    private TeamService teamSv;

    @Autowired
    private TournamentService tournamentSv;
    @Autowired
    private Cloudinary cloudinary;


    @PatchMapping("/cover-tournament")
    @Operation(
            description = "Upload a cover image for a tournament.",
            summary = "Upload tournament cover image"
    )
    public UploadConfirm uploadCoverTournament(@RequestParam("file") MultipartFile file) throws IOException, BadRequestException {
        String url = (String) cloudinary.uploader().upload(file.getBytes(), new HashMap<>()).get("url");
        return new UploadConfirm(
                "Cover was uploaded successfully",
                url
        );
    }

}
