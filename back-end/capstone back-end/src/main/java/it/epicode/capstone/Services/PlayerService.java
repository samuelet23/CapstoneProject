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
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
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
    public Player create(PlayerDTO playerDTO) throws BadRequestException {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            Player p = new Player();
            p.setName(playerDTO.name());
            p.setSurname(playerDTO.surname());
            p.setNickname(playerDTO.nickname());
            p.setDateOfBirth(LocalDate.parse(playerDTO.dateOfBirth(), formatter));
            if (!isOverFourteen(LocalDate.parse(playerDTO.dateOfBirth(), formatter))) {
                throw new BadRequestException("Il giocatore deve avere un'eta maggiore di 14 anni");
            }
            p.setAge(calculateAge(p.getDateOfBirth()));
            p.setRoleInTheGame(RoleInTheGame.PLAYER);
            p.setSigla(playerDTO.sigla());
            p.setPoint(0);
            p.setGamesPlayed(0);

            return playerRp.save(p);
        } catch (DateTimeParseException e) {
            throw new BadRequestException("Formato data di nascita non valido. Assicurati che sia nel formato dd/MM/yyyy");
        }
    }
    public void updateCredentialPlayer(UUID id, PlayerDTO playerDTO) throws BadRequestException {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            Player p = getById(id);
            p.setName(playerDTO.name());
            p.setSurname(playerDTO.surname());
            p.setDateOfBirth(LocalDate.parse(playerDTO.dateOfBirth(), formatter));
            if (!isOverFourteen(LocalDate.parse(playerDTO.dateOfBirth(), formatter))) {
                throw new BadRequestException("Il giocatore deve avere un'eta maggiore di 14 anni");
            }
            p.setAge(calculateAge(p.getDateOfBirth()));
            playerRp.save(p);
        } catch (DateTimeParseException e) {
            throw new BadRequestException("Formato data di nascita non valido. Assicurati che sia nel formato dd/MM/yyyy");
        }
    }
    public Player updateCredentialPlayer(String name, PlayerDTO playerDTO) throws BadRequestException {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            Player p = getByNickname(name);
            p.setName(playerDTO.name());
            p.setSurname(playerDTO.surname());
            p.setDateOfBirth(LocalDate.parse(playerDTO.dateOfBirth(), formatter));
            if (!isOverFourteen(LocalDate.parse(playerDTO.dateOfBirth(), formatter))) {
                throw new BadRequestException("Il giocatore deve avere un'eta maggiore di 14 anni");
            }
            p.setAge(calculateAge(p.getDateOfBirth()));
            return playerRp.save(p);
        } catch (DateTimeParseException e) {
            throw new BadRequestException("Formato data di nascita non valido. Assicurati che sia nel formato dd/MM/yyyy");
        }
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
        if (playerDTO.gamesPlayed() == 0 || playerDTO.gamesPlayed() > 4) {
            throw new BadRequestException("ERRORE: le partite giocato non possono essere uguali a 0 o superiori a 4");
        }
        p.setGamesPlayed(playerDTO.gamesPlayed());
        if (playerDTO.point() == 0) {
            throw new BadRequestException("Non puoi inserire 0 punti ad un giocatore, il minimo è 1");
        }
        p.setPoint(playerDTO.point());

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



    private static boolean isOverFourteen(LocalDate dateOfBirth) {
        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(dateOfBirth, currentDate);
        int age = period.getYears();
        return age > 14;
    }
    private static int calculateAge(LocalDate dateOfBirth) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(dateOfBirth, currentDate);
        return period.getYears();
    }
}
