package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.UpdateStatsPlayerDTO;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRp;

    public Page<Player> findAll(Pageable pageable){
        return playerRp.findAll(pageable);
    }
    public List<Player> findAll(){
        return playerRp.findAll();
    }
    public Page<Player> findAllByTeamName(String teamName, Pageable pageable){
        return playerRp.findAllByTeamName(teamName, pageable);
    }
    public Page<Player> findAllByTournamentName(String tournamentName, Pageable pageable){
        return playerRp.findAllByTournamentName(tournamentName, pageable);
    }

    public Player getById(UUID id)throws BadRequestException{
        return playerRp.findById(id).orElseThrow(
                () -> new BadRequestException("Player with id "+id+" Not Found" )
        );
    }
    public Player getByName(String name)throws BadRequestException{
        return playerRp.findByName(name).orElseThrow(
                () -> new BadRequestException("Player with id "+name+" Not Found" )
        );
    }
    public Integer getPointsByPlayerId(UUID id){
        return playerRp.findPointsByPlayerId(id);
    }
    public List<Object[]> getPlayersWithNameAndPointsByTournament(Tournament tournament){
        return playerRp.getPlayersWithNameAndPointsByTournament(tournament);
    }
    public Player save(PlayerDTO playerDTO){
        Player p = new Player();
        p.setName(playerDTO.name());
        p.setSurname(playerDTO.surname());
        p.setDateOfBirth(LocalDate.parse(playerDTO.dateOfBirth()));
        p.setPoint(0);
        p.setGamesPlayed(0);

        return playerRp.save(p);
    }
    public void updateCredentialPlayer(UUID id, PlayerDTO playerDTO) throws BadRequestException {

        Player p = getById(id);
        p.setName(playerDTO.name());
        p.setSurname(playerDTO.surname());
        p.setDateOfBirth(LocalDate.parse(playerDTO.dateOfBirth()));

        playerRp.save(p);
    }
    public void updateStatsById(UUID id, UpdateStatsPlayerDTO playerDTO)throws BadRequestException{
        Player p = getById(id);
        p.setPoint(playerDTO.point());
        p.setGamesPlayed(playerDTO.gamesPlayed());

        playerRp.save(p);
    }
    public void updateStatsByName(String name, UpdateStatsPlayerDTO playerDTO)throws BadRequestException{
        Player p = getByName(name);
        p.setPoint(playerDTO.point());
        p.setGamesPlayed(playerDTO.gamesPlayed());

        playerRp.save(p);
    }
    public void deleteById(UUID id)throws BadRequestException{
        Player p = getById(id);
        playerRp.delete(p);
    }
    public void deleteByName(String name)throws BadRequestException{
        Player p = getByName(name);
        playerRp.delete(p);
    }


}
