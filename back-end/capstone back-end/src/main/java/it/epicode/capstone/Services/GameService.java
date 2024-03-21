package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.Enums.GameStatus;
import it.epicode.capstone.Models.Enums.Round;
import it.epicode.capstone.Models.Enums.TournamentState;
import it.epicode.capstone.Repositories.GameRepository;
import it.epicode.capstone.Repositories.TeamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class GameService {
    public static final Logger logger = LoggerFactory.getLogger(GameService.class);

    @Autowired
    private GameRepository gameRp;

    @Autowired
    private TeamService teamSv;
    @Autowired
    private TournamentService tournamentSv;

    @Autowired
    private TeamRepository teamRp;

    public List<Game> getAll() {
        return gameRp.findAll();
    }
    public List<Game> getAllByTournament(Competition tournament){
        return gameRp.findByTournament(tournament);
    }

    public Game getById(UUID id) throws BadRequestException {
        return gameRp.findById(id).orElseThrow(
                () -> new BadRequestException("Game with id: " + id + " Not Found")
        );
    }

    public Game createGame(UUID matchId) throws BadRequestException {
        Game match = getById(matchId);
        if (match.getStatus() != GameStatus.SCHEDULED) {
            throw new BadRequestException("Il match si sta giocando o è già finito");
        }
        match.setStatus(GameStatus.STARTED);

        return gameRp.save(match);
    }
    public void updateHomePoints(UUID id, int pointsToAdd, String sigla) throws BadRequestException {
        Game game = getById(id);

        if (game.getStatus() != GameStatus.STARTED) {
            throw new BadRequestException("Non puoi inserire punti ad una partita che non è iniziata");
        }

        if (pointsToAdd < 1 || pointsToAdd > 3) {
            throw new BadRequestException("Puoi aggiungere solo da 1 a 3 punti in un'azione singola.");
        }

        if (!game.getHomeTeam().hasPlayerWithSigla(sigla)) {
            throw new BadRequestException("Non c'è nessun giocatore con la sigla specificata nella squadra di casa.");
        }

        game.setHomePoints(game.getHomePoints() + pointsToAdd);
        for (Player player : game.getHomeTeam().getPlayers()) {
            if (player.getSigla().equalsIgnoreCase(sigla)) {
                player.addPoints(pointsToAdd);
                break;
            }
        }

        gameRp.save(game);
    }

    public void updateAwayPoints(UUID id, int pointsToAdd, String sigla) throws BadRequestException {
        Game game = getById(id);
        if (game.getStatus() != GameStatus.STARTED) {
            throw new BadRequestException("Non puoi inserire punti ad una partita che non è iniziata");
        }


        if (pointsToAdd <= 0 || pointsToAdd > 3) {
            throw new BadRequestException("Puoi aggiungere solo da 1 a 3 punti in un'azione singola.");
        }

        if (!game.getAwayTeam().hasPlayerWithSigla(sigla)) {
            throw new BadRequestException("Non c'è nessun giocatore con la sigla specificata nella squadra di casa.");
        }

        game.setAwayPoints(game.getAwayPoints() + pointsToAdd);
        for (Player player : game.getAwayTeam().getPlayers()) {
            if (player.getSigla().equalsIgnoreCase(sigla)) {
                player.addPoints(pointsToAdd);
            }
        }

        gameRp.save(game);
    }

    public Team finishedGame(UUID id) throws Exception {
        Game game = getById(id);
        if (game.getStatus().equals(GameStatus.SCHEDULED)) {
            throw new BadRequestException("Non puoi inserire punti ad una partita che non è iniziata");
        }

        if (game.getStatus().equals(GameStatus.FINISHED)) {
            throw new IllegalArgumentException("la partità è già finita, ha vinto la squadra: "+game.getWinner().getName());
        }
        int homePoints = game.getHomePoints();
        int awayPoints = game.getAwayPoints();

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
                    throw new RuntimeException("La partità non può finire in parità, OVERTIME!");
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

        game.getWinner().setWonGames(Set.of(game));

        if (game.getRound() == Round.FINAL) {
            logger.info("Il toneo è stato vinto dalla squadra: "+game.getWinner().getName()+ " Complimenti da tutto lo staff");
        }

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