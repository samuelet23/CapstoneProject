package it.epicode.capstone.Controllers;

import com.cloudinary.Cloudinary;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.UploadConfirm;
import it.epicode.capstone.Services.TeamService;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@Tag(name = "Upload IMG API")
public class UploadImgController {

    @Autowired
    private TeamService teamSv;

    @Autowired
    private TournamentService tournamentSv;
    @Autowired
    private Cloudinary cloudinary;


    @PatchMapping("/logo-team/{name-team}")
    public UploadConfirm uploadLogoTeam(@RequestParam("file") MultipartFile file, @PathVariable("name-team") String nameTeam, BindingResult bindingResult) throws IOException, BadRequestException {
        HandlerException.badRequestException(bindingResult);
        HandlerException.ioException(bindingResult);
        Team team = teamSv.getByName(nameTeam);
        String url = (String) cloudinary.uploader().upload(file.getBytes(), new HashMap<>()).get("url");
        teamSv.updateLogo(team, url);
        return new UploadConfirm(
                "Logo for " + nameTeam + " uploaded successfully.",
                        url
        );
    }
    @PatchMapping("/cover-tournament/{tournament-name}")
    public UploadConfirm uploadCoverTournament(@RequestParam("file") MultipartFile file,@PathVariable("tournament-name") String tournamentName, BindingResult bindingResult) throws IOException, BadRequestException {
        HandlerException.ioException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        Tournament t = tournamentSv.getByName(tournamentName);
        String url = (String) cloudinary.uploader().upload(file.getBytes(), new HashMap<>()).get("url");
        tournamentSv.uploadCoverUrl(t,url);
        return new UploadConfirm(
                "Cover for "+tournamentName+" uploaded successfully",
                url
        );
    }
}
