package it.epicode.capstone.Controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.UpdateStatsPlayerDTO;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmPlayerPoints;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Models.ResponsesDTO.PlayerPointRes;
import it.epicode.capstone.Services.GameService;
import it.epicode.capstone.Services.PlayerService;
import it.epicode.capstone.Services.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/player")
@Tag(name = "Player API")
public class PlayerController {

    @Autowired
    private PlayerService playerSv;

    @Autowired
    private GameService gameSv;

    private TournamentService tournamentSv;

    @GetMapping("/get/all")
    public Page<Player> getAllPlayer(Pageable pageable) {
        return playerSv.findAll(pageable);
    }

    @GetMapping("/get/all/team-name")
    public Page<Player> getAllFromTeamName(@RequestParam("team-name") String teamName, Pageable pageable) {
        return playerSv.findAllByTeamName(teamName, pageable);
    }
    @GetMapping("/get/all/tournament-name")
    public Page<Player> getAllByTournamentName(@RequestParam("tournament-name") String tournamentName, Pageable pageable) {
        return playerSv.findAllByTournamentName(tournamentName, pageable);
    }

    @GetMapping("/get/name-player/averagePoints")
    public double averagePointPerGame(@RequestParam("name-player") String namePlayer) throws BadRequestException {
        Player p = playerSv.getByName(namePlayer);
        return gameSv.averagePointPerGame(p);
    }
    @GetMapping("/get/{id}")
    public Player getById(@PathVariable UUID id)throws BadRequestException{
        return playerSv.getById(id);
    }
    @GetMapping("/get/name")
    public Player getByName(@RequestParam String name)throws BadRequestException{
        return playerSv.getByName(name);
    }
    @GetMapping("/get/{id}/points")
    public ConfirmPlayerPoints getPointsByPlayerId(@PathVariable UUID id) {
         int points = playerSv.getPointsByPlayerId(id);
         return new ConfirmPlayerPoints("Player points have been successfully retrieved.",points);
    }
    @GetMapping("/get/point-player/tournament-name")
    public PlayerPointRes getPlayersAndPointsFromTournament(@RequestParam String tournamentName)throws BadRequestException{
        Tournament tournament = tournamentSv.getByName(tournamentName);
        return new PlayerPointRes(
                "Player points have been successfully retrieved.",
                playerSv.getPlayersWithNameAndPointsByTournament(tournament)
        );
    }
    @PostMapping("/create")
    @PreAuthorize("hasAuthority('CAPTAIN')")
    public Player createPlayer(@RequestBody @Validated PlayerDTO playerDTO){
        return playerSv.create(playerDTO);
    }

    @PatchMapping("/update/sigla/{name}")
    @PreAuthorize("hasAuthority('CAPTAIN')")
    public ConfirmRes updateSigla(@PathVariable String name,@RequestBody @Validated PlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateSigla(name, playerDTO.sigla());
        return new ConfirmRes(
                "Player with name"+name+" has been udated with the sigla"+ playerDTO.sigla(),
                HttpStatus.CREATED
                );
    }

    @PatchMapping("/update/credential/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ConfirmRes updateCredentialPlayers(@PathVariable UUID id,@RequestBody @Validated PlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateCredentialPlayer(id, playerDTO);
        return new ConfirmRes("Player's credential has been update successfully", HttpStatus.CREATED);
    }
    @PatchMapping("/update/stats/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ConfirmRes updateStatsById(@PathVariable UUID id,@RequestBody @Validated UpdateStatsPlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateStatsById(id, playerDTO);
        return new ConfirmRes("Player's stats has been update successfully", HttpStatus.CREATED);
    }
    @PatchMapping("/update/stats/{name}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public ConfirmRes updateStatsByName(@PathVariable String name,@RequestBody @Validated UpdateStatsPlayerDTO playerDTO, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        playerSv.updateStatsByName(name, playerDTO);
        return new ConfirmRes("Player's stats has been update successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
        public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        playerSv.deleteById(id);
        return new DeleteRes("Player deletion successful.");
    }
    @DeleteMapping("/delete/{name}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public DeleteRes deleteByName(@PathVariable String name)throws BadRequestException{
        playerSv.deleteByName(name);
        return new DeleteRes("Player deletion successful.");
    }


}