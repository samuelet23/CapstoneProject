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
    public Team saveTeam(TeamDTO teamDTO) {
        Team team = new Team();
        team.setName(teamDTO.name());

        Set<Player> players = new HashSet<>();
        for (PlayerDTO playerDTO : teamDTO.players()) {
            Player player = new Player();
            player.setName(playerDTO.name());
            Player savedPlayer = playerRp.save(player);
            players.add(savedPlayer);
            team.addPlayer(savedPlayer);
        }

        team.setPlayers(players);

        Player captain = playerRp.findByName(teamDTO.captainName())
                .orElseThrow(() -> new IllegalArgumentException("Captain player not found."));
        team.setCaptain(captain);

        try {
            team.setPlayers(players);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Error saving team: " + e.getMessage());
        }

        return teamRp.save(team);
    }
    @Transactional
    public Team update(UUID id, TeamDTO teamDTO) throws BadRequestException {
        Team team = getById(id);
        team.setName(teamDTO.name());

        Set<Player> players = new HashSet<>();
        for (PlayerDTO playerDTO : teamDTO.players()) {
            Player player = new Player();
            player.setName(playerDTO.name());
            Player savedPlayer = playerRp.save(player);
            players.add(savedPlayer);
        }

        try {
            team.setPlayers(players);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Error updating team: " + e.getMessage());
        }

        Player captain = playerRp.findByName(teamDTO.captainName())
                .orElseThrow(() -> new IllegalArgumentException("Captain player not found."));
        team.setCaptain(captain);

        return teamRp.save(team);
    }

    public Team updateCaptain(String teamName, String playerName)throws BadRequestException{
        Team t = getByName(teamName);
        Player p = playerRp.findByName(playerName).orElseThrow(
                () -> new IllegalArgumentException("Captain player Not Found")
        );
        if (t.getCaptain() ==  p) {
            throw new IllegalArgumentException("The Player with name: "+playerName+" is already a Captain");
        }
        t.setCaptain(p);
        return teamRp.save(t);
    }
    public Team updateLogo(Team team, String url)throws BadRequestException{
        team.setLogo(url);
        return teamRp.save(team);
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
