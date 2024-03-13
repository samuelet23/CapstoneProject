package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.NoTournamentsAvailableException;
import it.epicode.capstone.Exceptions.TournamentDataException;
import it.epicode.capstone.Models.DTO.*;
import it.epicode.capstone.Models.Entities.*;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Enums.*;
import it.epicode.capstone.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

@Service
public class TournamentService {
    @Autowired
    private TournamentRepository tournamentRp;
    @Autowired
    private AddressRepository addressRp;

    @Autowired
    private RefereeRepository refereeRp;

    @Autowired
    private PlaceRepository placeRp;
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
    private TeamRepository teamRp;
    @Autowired
    private TownRepository townRp;
    @Autowired
    private PlayerService playerSv;

    public Page<Tournament> getAll(Pageable pageable) {
        return tournamentRp.findAll(pageable);
    }

    public Tournament getById(UUID id) throws BadRequestException {
        return tournamentRp.findById(id).orElseThrow(
                () -> new BadRequestException("Tournament with id: " + id + " Not Found")
        );
    }

    public Tournament getByName(String name) throws BadRequestException {
        return tournamentRp.findByName(name).orElseThrow(
                () -> new BadRequestException("Tournament with name: " + name + " Not Found")
        );
    }

    public Tournament createTournament(TournamentDTO dto) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        Tournament t = new Tournament();
        t.setName(dto.name());
        isStartDateValid(dto);
        t.setStartDate(LocalDate.parse(dto.startDate(), formatter));
        t.setLevel(TournamentLevel.valueOf(dto.level()));
        try {

            List<Referee> referees = createReferee(dto.referees());
            t.setNumOfRefereeForTournament(referees, t.getLevel());
        } catch (Exception e) {
            throw new Exception("Error creating tournament: " + e.getMessage());
        }
        t.setPlace(placeSv.create(dto.place()));
        t.setInitialRound(Round.OCTAVEFINAL);
        return tournamentRp.save(t);
    }


    public void subscribeExistingTeam(String nameTeam, String nameTournament) throws BadRequestException {
        Tournament t = getByName(nameTournament);
        if (t.getTeams().size() >= 16) {
            throw new BadRequestException("Il torneo ha già raggiunto il numero massimo di squadre (16)");
        }
        Team team = teamSv.getByName(nameTeam);
        t.addTeam(team);
        tournamentRp.save(t);
    }


    public void createAndSubscribeTeamToTournament(TeamDTO teamDTO, String nameTournament) throws BadRequestException {
        Tournament t = getByName(nameTournament);
        if (t.getTeams().size() >= 16) {
            throw new BadRequestException("Il torneo ha già raggiunto il numero massimo di squadre (16)");
        }
        Team team = teamSv.createTeam(teamDTO);
        team.setTournament(t);
        tournamentRp.save(t);
    }

    public List<Game> startTournament(String nameTournament)throws BadRequestException {
        Tournament t = getByName(nameTournament);
        if (t.getTeams().size() != 16) {
            throw new BadRequestException("Il numero di squadre presente ad un torneo deve essere 16, Il torneo inizierà dagli ottavi di finale");
        }
        int expectedReferees = t.getMaxRefereesForLevel(t.getLevel());
        if (t.getReferees().size() != expectedReferees) {
            throw new BadRequestException("Il numero di arbitri per il livello del torneo non è corretto. Il livello " + t.getLevel() + " richiede " + expectedReferees + " arbitri.");
        }

        generateOttaviMatches(t);
        return t.getGames();
    }

    public void generateOttaviMatches(Tournament tournament) {
        List<Team> teamsList = new ArrayList<>(tournament.getTeams());
        List<Game> ottaviMatches = new ArrayList<>();

        Collections.shuffle(teamsList);

        if (teamsList.size() < 16) {
            throw new IllegalArgumentException("Il numero di squadre deve essere almeno 16 per generare le partite degli ottavi di finale.");
        }

        Round initialRound = Round.OCTAVEFINAL;

        for (int i = 0; i < teamsList.size(); i += 2) {
            Team homeTeam = teamsList.get(i);
            Team awayTeam = teamsList.get(i + 1);

            Game ottavo = new Game(homeTeam, awayTeam, 0, 0);
            ottavo.setRound(initialRound);
            ottavo.setStatus(GameStatus.SCHEDULED);
            ottavo.setTournament(tournament);
            gameRp.save(ottavo);
            ottaviMatches.add(ottavo);
        }

        tournament.setGames(ottaviMatches);
        tournament.setInitialRound(initialRound);
        Tournament t = tournamentRp.save(tournament);
    }

    public List<Game> generateQuartiMatches(String nameTournament) throws BadRequestException {
        Tournament tournament = getByName(nameTournament);
        List<Game> ottaviMatches = tournament.getGames();
        List<Team> quartiTeams = new ArrayList<>();
        if (ottaviMatches == null || ottaviMatches.isEmpty()) {
            throw new IllegalStateException("Non sono stati giocati gli ottavi di finale per il torneo " + nameTournament);
        }
        for (Game game : ottaviMatches) {
            Team winner = game.getWinner();
            if (winner != null) {
                quartiTeams.add(winner);
            }
        }
        if (quartiTeams.size() < 8) {
            throw new IllegalStateException("Non ci sono abbastanza team vincenti per generare i quarti di finale.");
        }
        gameRp.deleteAll();

        Collections.shuffle(quartiTeams);

        List<Game> quartiMatches = new ArrayList<>();
        Round initialRound = Round.QUARTERFINAL;
        for (int i = 0; i < quartiTeams.size(); i += 2) {
            Team homeTeam = quartiTeams.get(i);
            Team awayTeam = quartiTeams.get(i + 1);

            Game quarti = new Game(homeTeam, awayTeam, 0, 0);
            quarti.setRound(initialRound);
            quarti.setStatus(GameStatus.SCHEDULED);
            quarti.setTournament(tournament);
            gameRp.save(quarti);
            quartiMatches.add(quarti);
        }

        tournament.setGames(quartiMatches);
        tournament.setInitialRound(initialRound);
        Tournament t = tournamentRp.save(tournament);
        return  t.getGames();
    }

    public List<Game> generateSemiFinals(String nameTournament) throws BadRequestException {
        Tournament tournament = getByName(nameTournament);
        List<Game> quartiMatches = tournament.getGames();
        List<Team> semiFinalsTeams = new ArrayList<>();

        if (quartiMatches == null || quartiMatches.isEmpty()) {
            throw new IllegalStateException("Non sono stati giocati i quarti di finale per il torneo " + nameTournament);
        }

        for (Game game : quartiMatches) {
            Team winner = game.getWinner();
            if (winner != null) {
                semiFinalsTeams.add(winner);
            }
        }

        if (semiFinalsTeams.size() < 4) {
            throw new IllegalStateException("Non ci sono abbastanza team vincenti per generare le semifinali.");
        }

        gameRp.deleteAll();

        Collections.shuffle(semiFinalsTeams);

        List<Game> semiFinalsMatches = new ArrayList<>();
        Round initialRound = Round.SEMIFINAL;
        for (int i = 0; i < semiFinalsTeams.size(); i += 2) {
            Team homeTeam = semiFinalsTeams.get(i);
            Team awayTeam = semiFinalsTeams.get(i + 1);

            Game semiFinal = new Game(homeTeam, awayTeam, 0, 0);
            semiFinal.setRound(initialRound);
            semiFinal.setStatus(GameStatus.SCHEDULED);
            semiFinal.setTournament(tournament);
            gameRp.save(semiFinal);
            semiFinalsMatches.add(semiFinal);
        }

        tournament.setGames(semiFinalsMatches);
        tournament.setInitialRound(initialRound);
        Tournament t = tournamentRp.save(tournament);
        return  t.getGames();
    }

    public Game generateFinale(String nameTournament) throws BadRequestException {
        Tournament tournament = getByName(nameTournament);
        List<Game> semifinaliMatches = tournament.getGames();
        List<Team> finalTeams = new ArrayList<>();

        if (semifinaliMatches == null || semifinaliMatches.isEmpty()) {
            throw new IllegalStateException("Non sono state giocate le semifinali per il torneo " + nameTournament);
        }

        for (Game game : semifinaliMatches) {
            Team winner = game.getWinner();
            if (winner != null) {
                finalTeams.add(winner);
            }
        }

        if (finalTeams.size() < 2) {
            throw new IllegalStateException("Non ci sono abbastanza team vincenti per generare la finale.");
        }

        gameRp.deleteAll();

        Team homeTeam = finalTeams.get(0);
        Team awayTeam = finalTeams.get(1);

        Game finale = new Game(homeTeam, awayTeam, 0, 0);
        finale.setRound(Round.FINAL);
        finale.setStatus(GameStatus.SCHEDULED);
        finale.setTournament(tournament);
        gameRp.save(finale);

        tournament.setGames(Collections.singletonList(finale));
        tournament.setInitialRound(Round.FINAL);
        Tournament t = tournamentRp.save(tournament);
        return  finale;
    }



    public void updateLevelToJunior(List<RefereeDTO> refereeDTOS, String name) throws BadRequestException {
        if (refereeDTOS.size() != 1) {
            throw new BadRequestException("JUNIOR level requires exactly 1 referees");
        }

        List<Referee> referees = new ArrayList<>();
        Tournament t = getByName(name);
        if (t.getReferees().size() > 1) {
            while (t.getReferees().size() > 1) {
                Referee refereeToRemove = t.getReferees().remove(t.getReferees().size() - 1);
                refereeToRemove.setTournament(null);
                refereeRp.save(refereeToRemove);
            }
        }
        for (RefereeDTO refereeDTO : refereeDTOS) {
            Referee referee;
            try {
                referee = refereeSv.getByNickname(refereeDTO.nickname());
            } catch (BadRequestException e) {
                referee = refereeSv.createReferee(refereeDTO);
            }
            referees.add(referee);
            referee.setTournament(t);
        }

        t.setNumOfRefereeForTournament(referees, TournamentLevel.JUNIOR);

        t.setLevel(TournamentLevel.JUNIOR);

            tournamentRp.save(t);

    }

    public void updateLevelToRisingStars(List<RefereeDTO> refereeDTOS, String name) throws BadRequestException {
        if (refereeDTOS.size() != 2) {
            throw new BadRequestException("RISING STARS level requires exactly 2 referees");
        }

        List<Referee> referees = new ArrayList<>();
        Tournament t = getByName(name);

        if (t.getReferees().size() > 2) {
            while (t.getReferees().size() > 2) {
                Referee refereeToRemove = t.getReferees().remove(t.getReferees().size() - 1);
                refereeToRemove.setTournament(null);
                refereeRp.save(refereeToRemove);
            }
        }
        for (RefereeDTO refereeDTO : refereeDTOS) {
            Referee referee;
            try {
                referee = refereeSv.getByNickname(refereeDTO.nickname());
            } catch (BadRequestException e) {
                referee = refereeSv.createReferee(refereeDTO);
            }
            referees.add(referee);
            referee.setTournament(t);
        }

        t.setNumOfRefereeForTournament(referees, TournamentLevel.RISINGSTARS);
        t.setLevel(TournamentLevel.RISINGSTARS);

        tournamentRp.save(t);
    }

    public void updateLevelToElite(List<RefereeDTO> refereeDTOS, String name) throws BadRequestException {
        if (refereeDTOS.size() != 3) {
            throw new BadRequestException("ELITE level requires exactly 3 referees");
        }

        List<Referee> referees = new ArrayList<>();
        Tournament t = getByName(name);

        if (t.getReferees().size() > 3) {
            while (t.getReferees().size() > 3) {
                Referee refereeToRemove = t.getReferees().remove(t.getReferees().size() - 1);
                refereeToRemove.setTournament(null);
                refereeRp.save(refereeToRemove);
            }
        }

        for (RefereeDTO refereeDTO : refereeDTOS) {
            Referee referee;
            try {
                referee = refereeSv.getByNickname(refereeDTO.nickname());
            } catch (BadRequestException e) {
                referee = refereeSv.createReferee(refereeDTO);
            }
            referees.add(referee);
            referee.setTournament(t);
        }

        t.setNumOfRefereeForTournament(referees, TournamentLevel.ELITE);
        t.setLevel(TournamentLevel.ELITE);


        tournamentRp.save(t);

    }




    public void uploadCoverUrl(Tournament tournament, String url) {
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


    public List<Tournament> getByStartDateAfter(String startDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        List<Tournament> tournaments = tournamentRp.findByStartDateAfter(LocalDate.parse(startDate, formatter));
        if (tournaments.isEmpty()) {
            throw new NoTournamentsAvailableException("No tournaments available after the provided start date: " + startDate);
        }

        return tournaments;

    }

    public List<Tournament> findByPlaceAndStartDateAfter(String townName, String startDate) throws BadRequestException {
        Place p = placeSv.getByTownName(townName);
        List<Tournament> tournaments = tournamentRp.findByPlaceAndStartDateAfter(p, LocalDate.parse(startDate));
        if (tournaments.isEmpty()) {
            throw new NoTournamentsAvailableException("No tournaments available after the provided start date or the provided town name");
        }
        return tournaments;
    }

    public void deleteById(UUID id) throws BadRequestException {
        Tournament t = getById(id);
        tournamentRp.delete(t);
    }

    public void deleteByName(String name) throws BadRequestException {
        Tournament t = getByName(name);
        tournamentRp.delete(t);
    }



    private List<Referee> createReferee(List<String> refereeNames) throws BadRequestException {
        List<Referee> referees = new ArrayList<>();
        for (String name : refereeNames) {
            Referee referee = refereeSv.getByNickname(name);
            if (referee.getRole() != RoleInTheGame.REFEREE) {
                throw new IllegalArgumentException("The person with name " + referee.getName() + " isn't a Referee");
            }
            referees.add(referee);
        }
        refereeRp.saveAll(referees);
        return referees;
    }



    private List<Team> getQualifiedTeamsForNextRound(Tournament tournament, int numTeams) throws TournamentDataException {
        List<Game> games = gameRp.findByTournament(tournament);
        List<Team> qualifiedTeams = teamSv.getAllByTournamentName(tournament.getName());

        for (Game game : games) {
            if (game.getStatus() == GameStatus.FINISHED && game.getRound() != tournament.getInitialRound()) {
                Team winner = game.getWinner();
                if (winner != null && !qualifiedTeams.contains(winner)) {
                    qualifiedTeams.add(winner);
                } else {
                    throw new TournamentDataException("Error in selecting qualified teams");
                }
            }
        }

        if (qualifiedTeams.size() > numTeams) {
            qualifiedTeams = qualifiedTeams.subList(0, numTeams);
        }

        return qualifiedTeams;
    }


    public boolean isStartDateValid(TournamentDTO dto) {
        LocalDate now = LocalDate.now();
        LocalDate startDate;

        try {
            startDate = LocalDate.parse(dto.startDate());
        } catch (DateTimeParseException e) {
            return false;
        }

        return !startDate.isBefore(now);
    }

}
