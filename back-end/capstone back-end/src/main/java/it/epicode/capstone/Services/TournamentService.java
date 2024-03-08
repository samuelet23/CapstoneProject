package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.NotFoundException;
import it.epicode.capstone.Exceptions.TournamentDataException;
import it.epicode.capstone.Models.DTO.*;
import it.epicode.capstone.Models.Entities.*;
import it.epicode.capstone.Models.Enums.GameStatus;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Models.Enums.TournamentLevel;
import it.epicode.capstone.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
            List<String> refereeNames = dto.referees();
            List<Referee> referees = createReferee(refereeNames);
            t.setNumOfRefereeForTournament(referees, t.getLevel());
        } catch (Exception e) {
            throw new Exception("Error creating tournament: " + e.getMessage());
        }
        t.setTeams(createTeams(dto));
        t.setPlace(createPlaceFromDto(dto.place()));
        t.setInitialRound(8);
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
            game.setRound(8);
            game.setPhase("Ottavi di finale");
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
            game.setRound(4);
            game.setPhase("Quarti di finale");
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
            game.setRound(2);
            game.setPhase("Semifinali");

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
        game.setRound(1);
        game.setPhase("Finale");

        gameRp.save(game);

        tournament.setGames(games);

        return games;
    }



    public Tournament updateLevelToJunior(String name)throws BadRequestException{
        Tournament t = getByName(name);
        t.setLevel(TournamentLevel.JUNIOR);
        return tournamentRp.save(t);
    }
    public Tournament updateLevelToRisingStars(String name)throws BadRequestException{
        Tournament t = getByName(name);
        t.setLevel(TournamentLevel.RISINGSTARS);
        return tournamentRp.save(t);
    }
    public Tournament updateLevelToElite(String name)throws BadRequestException{
        Tournament t = getByName(name);
        t.setLevel(TournamentLevel.ELITE);
        return tournamentRp.save(t);
    }

    public Tournament updateCoverUrl(Tournament tournament, String url){
        tournament.setCoverUrl(url);
        return tournamentRp.save(tournament);
    }

    public List<Tournament> GetByLevel(String level){
        return tournamentRp.findByLevel(TournamentLevel.valueOf(level));
    }

    public List<Tournament> getByStartDateAfter(String startDate){
        return tournamentRp.findByStartDateAfter(LocalDate.parse(startDate));
    }
    public List<Tournament> findByTownAndStartDateAfter(String townName, String  startDate) throws BadRequestException {
        Place p = placeSv.getByTownName(townName);
        return tournamentRp.findByPlaceAndStartDateAfter(p, LocalDate.parse(startDate));
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
            Team team = teamSv.getByName(teamDTO.name());
            Set<Player> players = createPlayerFromDto(teamDTO.players());
            try {
                team.setPlayers(players);
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Error creating team: " + e.getMessage());
            }
            team.setLogo(teamDTO.logo());
            team.setName(teamDTO.name());


            Player captain = playerSv.getByName(teamDTO.captainName());


            team.setCaptain(captain);
            teams.add(team);
        }
        return teams;
    }

    private List<Referee> createReferee(List<String> refereeNames) throws BadRequestException {
        List<Referee> referees = refereeSv.getAll();
        for (String refereeName : refereeNames) {
            Referee referee;
            referee = refereeSv.getByName(refereeName);
            if (referee.getRole() != Role.REFEREE) {
                throw new IllegalArgumentException("The person with name"+referee.getName()+" isn't a Referee");
            }
            referees.add(referee);
        }
        return referees;
    }
    private Set<Player> createPlayerFromDto(Set<PlayerDTO> playerDTOs) throws BadRequestException {
        Set<Player> players = (Set<Player>) playerSv.findAll();
        for (PlayerDTO playerDTO : playerDTOs) {
            Player player = playerSv.getByName(playerDTO.name());
            player.setName(playerDTO.name());
            players.add(player);
        }
        return players;
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
            if (game.getStatus() == GameStatus.FINISHED && game.getRound() < tournament.getInitialRound()) {
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
