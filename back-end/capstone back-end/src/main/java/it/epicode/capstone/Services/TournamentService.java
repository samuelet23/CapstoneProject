package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.NoTournamentsAvailableException;
import it.epicode.capstone.Exceptions.NotFoundException;
import it.epicode.capstone.Exceptions.TournamentDataException;
import it.epicode.capstone.Models.DTO.*;
import it.epicode.capstone.Models.Entities.*;
import it.epicode.capstone.Models.Enums.*;
import it.epicode.capstone.Repositories.*;
import org.slf4j.event.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TournamentService {
    @Autowired
    private TournamentRepository tournamentRp;
    @Autowired
    private ProvinceRepository provinceRp;
    @Autowired
    private RefereeService refereeSv;
    @Autowired
    private GameRepository gameRp;
    @Autowired
    private PlaceService placeSv;
    @Autowired
    private TeamService teamSv;
    @Autowired
    private TownRepository townRp;
    @Autowired
    private PlayerService playerSv;

    public Page<Tournament> getAll(Pageable pageable){
        return tournamentRp.findAll(pageable);
    }
    public Tournament getById(UUID id)throws BadRequestException {
        return tournamentRp.findById(id).orElseThrow(
                () -> new BadRequestException("Tournament with id: "+id+" Not Found")
        );
    }
    public Tournament getByName(String name)throws BadRequestException {
        return tournamentRp.findByName(name).orElseThrow(
                () -> new BadRequestException("Tournament with name: "+name+" Not Found")
        );
    }
    public Tournament createTournament(TournamentDTO dto) throws Exception {
        Tournament t = new Tournament();
        t.setName(dto.name());
        t.setStartDate(LocalDate.parse(dto.startDate()));
        t.setLevel(TournamentLevel.valueOf(dto.level()));
        try {

            List<Referee> referees = createReferee(dto.referees());
            t.setNumOfRefereeForTournament(referees, t.getLevel());
        } catch (Exception e) {
            throw new Exception("Error creating tournament: " + e.getMessage());
        }
        t.setTeams(createTeams(dto));
        t.setPlace(createPlaceFromDto(dto.place()));
        t.setInitialRound(Round.OCTAVEFINAL);
        generateOttaviMatches(t);
        return tournamentRp.save(t);
    }

    public List<Game> generateOttaviMatches(Tournament tournament) {
        List<Team> teams = (List<Team>) tournament.getTeams();

        Collections.shuffle(teams);

        List<Game> games = new ArrayList<>();

        for (int i = 0; i < teams.size(); i += 2) {
            Team homeTeam = teams.get(i);
            Team awayTeam = teams.get(i + 1);

            Game game = new Game();
            game.setHomeTeam(homeTeam);
            game.setAwayTeam(awayTeam);
            game.setStatus(GameStatus.SCHEDULED);
            game.setRound(Round.OCTAVEFINAL);
            games.add(game);

            gameRp.save(game);
        }
        return games;

    }
    public List<Game> generateQuarterFinalMatches(Tournament tournament) throws TournamentDataException {
        List<Game> games = new ArrayList<>();
        List<Team> quarterFinalTeams = getQualifiedTeamsForNextRound(tournament, 8);

        if (quarterFinalTeams.size() != 4) {
            throw new IllegalArgumentException("Invalid number of teams qualified for quarter-finals.");
        }

        Collections.shuffle(quarterFinalTeams);

        for (int i = 0; i < quarterFinalTeams.size(); i += 2) {
            Team homeTeam = quarterFinalTeams.get(i);
            Team awayTeam = quarterFinalTeams.get(i + 1);

            Game game = new Game();
            game.setHomeTeam(homeTeam);
            game.setAwayTeam(awayTeam);
            game.setStatus(GameStatus.SCHEDULED);
            game.setRound(Round.QUARTERFINAL);
            games.add(game);
            gameRp.save(game);
        }

        tournament.setGames(games);
        return games;
    }

    public List<Game> generateSemiFinalMatches(Tournament tournament) throws TournamentDataException {
        List<Game> games = new ArrayList<>();
        List<Team> semiFinalTeams = getQualifiedTeamsForNextRound(tournament, 4);

        if (semiFinalTeams.size() != 2) {
            throw new IllegalArgumentException("Invalid number of teams qualified for semi-finals.");
        }

        Collections.shuffle(semiFinalTeams);

        for (int i = 0; i < semiFinalTeams.size(); i += 2) {
            Team homeTeam = semiFinalTeams.get(i);
            Team awayTeam = semiFinalTeams.get(i + 1);

            Game game = new Game();
            game.setHomeTeam(homeTeam);
            game.setAwayTeam(awayTeam);
            game.setStatus(GameStatus.SCHEDULED);
            game.setRound(Round.SEMIFINAL);

            games.add(game);

            gameRp.save(game);
        }

        tournament.setGames(games);
        return games;
    }

    public List<Game> generateFinalMatch(Tournament tournament) throws TournamentDataException {
        List<Game> games = gameRp.findByTournament(tournament);
        List<Team> finalTeams = getQualifiedTeamsForNextRound(tournament, 2);

        if (finalTeams.size() != 1) {
            throw new IllegalArgumentException("Invalid number of teams qualified for final match.");
        }

        Team homeTeam = finalTeams.get(0);
        Team awayTeam = finalTeams.get(1);

        Game game = new Game();
        game.setHomeTeam(homeTeam);
        game.setAwayTeam(awayTeam);
        game.setStatus(GameStatus.SCHEDULED);
        game.setRound(Round.FINAL);

        gameRp.save(game);

        tournament.setGames(games);

        return games;
    }



    public void updateLevelToJunior(String name)throws BadRequestException{
        Tournament t = getByName(name);
        t.setLevel(TournamentLevel.JUNIOR);
        tournamentRp.save(t);
    }
    public void updateLevelToRisingStars(String name)throws BadRequestException{
        Tournament t = getByName(name);
        t.setLevel(TournamentLevel.RISINGSTARS);
        tournamentRp.save(t);
    }
    public void updateLevelToElite(String name)throws BadRequestException{
        Tournament t = getByName(name);
        t.setLevel(TournamentLevel.ELITE);
        tournamentRp.save(t);
    }

    public void uploadCoverUrl(Tournament tournament, String url){
        tournament.setCoverUrl(url);
        tournamentRp.save(tournament);
    }

    public List<Tournament> getByLevel(String level) throws BadRequestException {
        TournamentLevel tournamentLevel = null;
        try {
            String levelWithoutSpaces = level.replaceAll("\\s", "");
            levelWithoutSpaces = levelWithoutSpaces.toUpperCase();
            tournamentLevel = TournamentLevel.valueOf(levelWithoutSpaces);
        } catch (IllegalArgumentException ex) {
            throw new BadRequestException("Invalid tournament level provided: " + level);
        }

        return tournamentRp.findByLevel(tournamentLevel);
    }


    public List<Tournament> getByStartDateAfter(String startDate){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        List<Tournament> tournaments = tournamentRp.findByStartDateAfter(LocalDate.parse(startDate, formatter));
        if (tournaments.isEmpty()) {
            throw new NoTournamentsAvailableException("No tournaments available after the provided start date: " + startDate);
        }

        return tournaments;

    }
    public List<Tournament> findByPlaceAndStartDateAfter(String townName, String  startDate) throws BadRequestException {
        Place p = placeSv.getByTownName(townName);
        List<Tournament> tournaments = tournamentRp.findByPlaceAndStartDateAfter(p, LocalDate.parse(startDate));
        if (tournaments.isEmpty()) {
            throw new NoTournamentsAvailableException("No tournaments available after the provided start date or the provided town name" );
        }
        return  tournaments;
    }

    public void deleteById(UUID id)throws BadRequestException{
        Tournament t = getById(id);
        tournamentRp.delete(t);
    }
    public void deleteByName(String name)throws BadRequestException{
        Tournament t = getByName(name);
        tournamentRp.delete(t);
    }











    private Set<Team> createTeams(TournamentDTO dto) throws BadRequestException, NotFoundException {
        if (dto.teams().size() < 12 || dto.teams().size() > 16) {
            throw new BadRequestException("The tournament must have between 12 and 16 teams.");
        }
        Set<Team> teams = new HashSet<>();
        for (TeamDTO teamDTO : dto.teams()) {
              Team team = teamSv.createTeam(teamDTO);
            teams.add(team);
        }
        return teams;
    }

    private List<Referee> createReferee(List<String> refereeNames) throws BadRequestException {
        List<Referee> referees = new ArrayList<>();
        for (String name : refereeNames) {
            Referee referee = refereeSv.getByName(name);
            if (referee.getRole() != RoleInTheGame.REFEREE) {
                throw new IllegalArgumentException("The person with name " + referee.getName() + " isn't a Referee");
            }
            referees.add(referee);
        }
        return referees;
    }
    public Place createPlaceFromDto(PlaceDTO placeDTO) throws BadRequestException {
        AddressDTO addressDTO = placeDTO.address();
        Province province = provinceRp.findBySigla(addressDTO.siglaProvince())
                .orElseThrow(() -> new BadRequestException("Province with sigla: " + addressDTO.siglaProvince() + " Not Found"));
        Town town = townRp.findByName(addressDTO.townName())
                .orElseThrow(() -> new BadRequestException("Town with name: " + addressDTO.townName() + " Not Found"));

        Address address = new Address(addressDTO.via(), addressDTO.civico(), addressDTO.cap(), town.getName(), province.getSigla());
        return new Place(address, placeDTO.courtName());
    }
    private List<Team> getQualifiedTeamsForNextRound(Tournament tournament, int numTeams) throws TournamentDataException {
        List<Game> games = gameRp.findByTournament(tournament);
        List<Team> qualifiedTeams = teamSv.getAllByTournamentName(tournament.getName());

        for (Game game : games) {
            if (game.getStatus() == GameStatus.FINISHED && game.getRound() != tournament.getInitialRound()) {
                Team winner = game.getWinner();
                if (winner != null && !qualifiedTeams.contains(winner)) {
                    qualifiedTeams.add(winner);
                } else{
                    throw new TournamentDataException("Error in selecting qualified teams");
                }
            }
        }

        if (qualifiedTeams.size() > numTeams) {
            qualifiedTeams = qualifiedTeams.subList(0, numTeams);
        }

        return qualifiedTeams;
    }
}
