package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.UpdateStatsPlayerDTO;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Models.Enums.RoleInTheGame;
import it.epicode.capstone.Repositories.PlayerRepository;
import org.apache.catalina.valves.rewrite.InternalRewriteMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    public Player getByNickname(String nickname)throws BadRequestException{
        return playerRp.findByNickname(nickname).orElseThrow(
                () -> new BadRequestException("Player with nickname "+nickname+" Not Found" )
        );
    }
    public Integer getPointsByPlayerId(UUID id){
        return playerRp.findPointsByPlayerId(id);
    }
    public List<Object[]> getPlayersWithNameAndPointsByTournament(Tournament tournament){
        return playerRp.getPlayersWithNameAndPointsByTournament(tournament);
    }
    public Player create(PlayerDTO playerDTO){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Player p = new Player();
        p.setName(playerDTO.name());
        p.setSurname(playerDTO.surname());
        p.setNickname(playerDTO.nickname());
        p.setDateOfBirth(LocalDate.parse(playerDTO.dateOfBirth(), formatter));
        p.setRoleInTheGame(RoleInTheGame.PLAYER);
        p.setSigla(playerDTO.sigla());
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
    public Player updateCredentialPlayer(String name, PlayerDTO playerDTO) throws BadRequestException {

        Player p = getByNickname(name);
        p.setName(playerDTO.name());
        p.setSurname(playerDTO.surname());
        p.setDateOfBirth(LocalDate.parse(playerDTO.dateOfBirth()));

        return playerRp.save(p);
    }


    public Player updateNicknameById(UUID id,String nickname) throws BadRequestException {
        Player p = getById(id);
        p.setNickname(nickname);
        return  playerRp.save(p);

    }
    public void updateSigla(String name, String sigla)throws BadRequestException{
        Player p = getByNickname(name);
        if (p.getSigla().equals(sigla )) {
            throw new BadRequestException("Player: "+p.getNickname()+" ha già questa sigla");
        }
        p.setSigla(sigla);
        playerRp.save(p);
    }
    public void updateStatsById(UUID id, UpdateStatsPlayerDTO playerDTO)throws BadRequestException{
        Player p = getById(id);
        p.setPoint(playerDTO.point());
        p.setGamesPlayed(playerDTO.gamesPlayed());

        playerRp.save(p);
    }
    public void updateStatsByName(String name, UpdateStatsPlayerDTO playerDTO)throws BadRequestException{
        Player p = getByNickname(name);
        p.setPoint(playerDTO.point());
        p.setGamesPlayed(playerDTO.gamesPlayed());

        playerRp.save(p);
    }
    public void deleteById(UUID id)throws BadRequestException{
        Player p = getById(id);
        playerRp.delete(p);
    }
    public void deleteByName(String name)throws BadRequestException{
        Player p = getByNickname(name);
        playerRp.delete(p);
    }


}
