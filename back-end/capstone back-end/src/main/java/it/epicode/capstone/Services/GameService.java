package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.DTO.BeforeGameDTO;
import it.epicode.capstone.Models.DTO.DuringGameDTO;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.Enums.GameStatus;
import it.epicode.capstone.Repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRp;

    @Autowired
    private TournamentService tournamentSv;


    public Page<Game> getAll(Pageable pageable) {
        return gameRp.findAll(pageable);
    }
    public List<Game> getAllByTournament(Competition tournament){
        return gameRp.findByTournament(tournament);
    }

    public Game getById(UUID id) throws BadRequestException {
        return gameRp.findById(id).orElseThrow(
                () -> new BadRequestException("Game with id: " + id + " Not Found")
        );
    }

    public Game createGame(BeforeGameDTO game) throws BadRequestException {

        Game match = new Game(
                new Team(game.homeTeam()),
                new Team(game.awayTeam()),
                0,
                0);
        match.setStatus(GameStatus.STARTED);
        match.setRound(game.round());
        throw new BadRequestException("The round number is not valid, must be even");


    }
    public Game updateHomePoints(UUID id, int pointsToAdd, String sigla) throws BadRequestException {
        Game game = getById(id);
        if (pointsToAdd <= 0 || pointsToAdd > 3) {
            throw new BadRequestException("You cannot add more than three points in a single action.");
        }

        if (game.getHomeTeam().hasPlayerWithSigla(sigla)) {
            throw new BadRequestException("There is no player with the specified sigla in the home team.");
        }

        game.setHomePoints(game.getHomePoints() + pointsToAdd);
        for (Player player : game.getHomeTeam().getPlayers()) {
            if (player.getSigla() == sigla) {
                player.addPoints(pointsToAdd);
            }
        }

        return gameRp.save(game);
    }

    public Game updateAwayPoints(UUID id, int pointsToAdd, String sigla) throws BadRequestException {
        Game game = getById(id);
        if (pointsToAdd <= 0 || pointsToAdd > 3) {
            throw new BadRequestException("You cannot add more than three points in a single action.");
        }

        if (game.getAwayTeam().hasPlayerWithSigla(sigla)) {
            throw new BadRequestException("There is no player with the specified sigla in the away team.");
        }

        game.setAwayPoints(game.getAwayPoints() + pointsToAdd);
        for (Player player : game.getAwayTeam().getPlayers()) {
            if (player.getSigla() == sigla) {
                player.addPoints(pointsToAdd);
            }
        }

        return gameRp.save(game);
    }

    public Team finishedGame(UUID id, DuringGameDTO gameDTO) throws Exception {
        int homePoints = gameDTO.homePoints();
        int awayPoints = gameDTO.awayPoints();

        Game game = getById(id);
        boolean matchFinished = false;

        while (!matchFinished) {
            try {
                game.setHomePoints(homePoints);
                game.setAwayPoints(awayPoints);

                if (homePoints > awayPoints) {
                    game.setWinner(game.getHomeTeam());
                    game.setStatus(GameStatus.FINISHED);
                } else if (homePoints < awayPoints) {
                    game.setWinner(game.getAwayTeam());
                    game.setStatus(GameStatus.FINISHED);
                } else {
                    throw new RuntimeException("The match cannot finish in a tie. Please continue the match.");
                }

                matchFinished = true;
            } catch (RuntimeException e) {
               throw new Exception(e.getMessage());
            }
        }
        for (Player player : game.getHomeTeam().getPlayers()) {
            player.setGamesPlayed(player.getGamesPlayed() + 1);
        }
        for (Player player : game.getAwayTeam().getPlayers()) {
            player.setGamesPlayed(player.getGamesPlayed() + 1);

        }

        game = gameRp.save(game);
        return game.getWinner();
    }



    public double averagePointPerGame(Player player){
            if (player.getGamesPlayed() == 0) {
                return 0;
            }
            return (double) player.getPoint() / player.getGamesPlayed();
    }


    public void delete(UUID id)throws BadRequestException{
        Game game = getById(id);
        gameRp.delete(game);
    }





}