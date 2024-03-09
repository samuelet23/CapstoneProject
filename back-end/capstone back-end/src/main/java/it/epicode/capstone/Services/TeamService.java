package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.DTO.PlayerDTO;
import it.epicode.capstone.Models.DTO.TeamDTO;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Repositories.PlayerRepository;
import it.epicode.capstone.Repositories.TeamRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRp;

    @Autowired
    private PlayerRepository playerRp;
    @Autowired
    private PlayerService playerSv;

    public Page<Team> getAll(Pageable pageable) {
        return teamRp.findAll(pageable);
    }

    public Team getById(UUID id)throws BadRequestException{
        return teamRp.findById(id).orElseThrow(
                () -> new BadRequestException("Team with id: "+id+" Not Found")
        );
    }
    public Team getByName(String name)throws BadRequestException{
        return teamRp.findByName(name).orElseThrow(
                () -> new BadRequestException("Team with name: "+name+" Not Found")
        );
    }
    public List<Team> getAllByTournamentName(String name) {
        return teamRp.findByTournament(name);
    }

    public Team getByPlayerName(String name) throws BadRequestException {
        return teamRp.findByPlayersContains(name).orElseThrow(
                () -> new BadRequestException("The player with name " + name + " does not exist or is not associated with any team")
        );
    }
    public List<Team> getAllTeamWithoutCaptain(){
        return teamRp.findByCaptainIsNull();
    }
    @Transactional
    public Team createTeam(TeamDTO teamDTO) {
        Team team = new Team();
        team.setName(teamDTO.name());

        Set<Player> players = new HashSet<>();
        Set<Character> usedSiglas = new HashSet<>();

        for (PlayerDTO playerDTO : teamDTO.players()) {
            Player player = playerSv.create(playerDTO);
            if (!usedSiglas.contains(playerDTO.sigla()) && usedSiglas.size() < 5) {
                player.setSigla(playerDTO.sigla());
                usedSiglas.add(playerDTO.sigla());
            } else {
                throw new IllegalArgumentException("Error saving team: Invalid player sigla.");
            }

            Player savedPlayer = playerRp.save(player);
            players.add(savedPlayer);
            team.addPlayer(savedPlayer);
        }

        team.setPlayers(players);
        Player captain = playerRp.findByName(teamDTO.captainName())
                .orElseThrow(() -> new IllegalArgumentException("Captain player not found."));
        team.setCaptain(captain);

        return teamRp.save(team);
    }


    public Team updateName(UUID id, TeamDTO teamDTO) throws BadRequestException {
        Team team = getById(id);
        team.setName(teamDTO.name());

        return teamRp.save(team);
    }
    public Team updatePlayers(UUID id, TeamDTO teamDTO) throws BadRequestException {
        Team team = getById(id);

        Set<Player> players = new HashSet<>();
        for (PlayerDTO playerDTO : teamDTO.players()) {
            Player playerToUpdate = team.getPlayers().stream()
                    .filter(player -> player.getName().equals(playerDTO.name()))
                    .findFirst()
                    .orElseThrow(() -> new BadRequestException("Player not found in the team: " + playerDTO.name()));

            playerSv.updateCredentialPlayer(playerToUpdate.getId(), playerDTO);

            Player savedPlayer = playerRp.save(playerToUpdate);
            players.add(savedPlayer);
        }

        team.setPlayers(players);

        return teamRp.save(team);
    }

    public void updateCaptain(String teamName, String playerName)throws BadRequestException{
        Team t = getByName(teamName);
        Player p = playerRp.findByName(playerName).orElseThrow(
                () -> new IllegalArgumentException("Captain player Not Found")
        );
        if (t.getCaptain() ==  p) {
            throw new IllegalArgumentException("The Player with name: "+playerName+" is already a Captain");
        }
        t.setCaptain(p);
        teamRp.save(t);
    }
    public void updateLogo(Team team, String url)throws BadRequestException{
        team.setLogo(url);
        teamRp.save(team);
    }

    public void deleteById(UUID id)throws BadRequestException{
        Team t = getById(id);
        teamRp.delete(t);
    }
    public void deleteByName(String name)throws BadRequestException{
        Team t = getByName(name);
        teamRp.delete(t);
    }


}
