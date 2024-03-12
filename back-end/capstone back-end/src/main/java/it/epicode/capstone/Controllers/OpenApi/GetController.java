package it.epicode.capstone.Controllers.OpenApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.NotFoundException;
import it.epicode.capstone.Models.Entities.*;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmPlayerPoints;
import it.epicode.capstone.Models.ResponsesDTO.PlayerPointRes;
import it.epicode.capstone.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "OPEN GET API (accessible to everyone)")
@RequestMapping("/api/open")
public class GetController {
    @Autowired
    private GameService gameSv;
    @Autowired
    private UserService userSv;
    @Autowired
    private TeamService teamSv;
    @Autowired
    private RefereeService refereeSv;
    @Autowired
    private PlaceService placeSv;
    @Autowired
    private PlayerService playerSv;
    @Autowired
    private TournamentService tournamentSv;

//   ***************** GAME CONTROLLER *************************
    @GetMapping("/game/get/all")
    @Operation(
            description = "Retrieve all games with pagination support.",
            summary = "Get all games"
    )
    public Page<Game> getGameAll(Pageable pageable){
        return gameSv.getAll(pageable);
    }
    @GetMapping("/game/get/all/tournament/{name}")
    @Operation(
            description = "Retrieve all games associated with a specific tournament.",
            summary = "Get all games by tournament"
    )
    public List<Game> getGameAllByTournament(@PathVariable String name)throws BadRequestException {
        Tournament tournament = tournamentSv.getByName(name);
        return gameSv.getAllByTournament(tournament);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/game/get/{id}")
    @Operation(
            description = "Retrieve a game by its unique identifier.",
            summary = "Get a game by ID"
    )
    public Game getGameById(@PathVariable UUID id)throws BadRequestException {
        return gameSv.getById(id);
    }

// **************** PLACE CONTROLLER ****************

    @GetMapping("/place/get/all")
    @Operation(
            description = "Retrieve all places with pagination support.",
            summary = "Get all places"
    )
    public Page<Place> getAllPlace(Pageable pageable){
        return placeSv.getAll(pageable);
    }

    @GetMapping("/place/get/all/town")
    @Operation(
            description = "Retrieve all towns.",
            summary = "Get all towns"
    )
    public List<Town> getAllTown(){
        return placeSv.getAllTown();
    }

    @GetMapping("/place/get/all/province")
    @Operation(
            description = "Retrieve all provinces.",
            summary = "Get all provinces"
    )
    public List<Province> getAllProvince(){
        return placeSv.getAllProvince();
    }

    @GetMapping("/place/get/all/region")
    @Operation(
            description = "Retrieve all regions.",
            summary = "Get all regions"
    )
    public List<String> getAllRegion(){
        return placeSv.getAllRegion();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/place/get/{id}")
    @Operation(
            description = "Retrieve a place by its unique identifier.",
            summary = "Get a place by ID"
    )
    public Place getPlaceById(@PathVariable UUID id)throws BadRequestException{
        return placeSv.getById(id);
    }

    @GetMapping("/place/get/court-name")
    @Operation(
            description = "Retrieve a place by its court name.",
            summary = "Get a place by court name"
    )
    public Place getPlaceByCourtName(@RequestParam("court-name") String courtName)throws BadRequestException{
        return placeSv.getByCourtName(courtName);
    }

    @GetMapping("/place/get/town-name")
    @Operation(
            description = "Retrieve a place by its town name.",
            summary = "Get a place by town name"
    )
    public Place getTownName(@RequestParam("town-name") String townName)throws BadRequestException{
        return placeSv.getByTownName(townName);
    }

    //   ****************** PLAYER CONTROLLER ********************

    @GetMapping("/player/get/all")
    @Operation(
            description = "Retrieve all players with pagination support.",
            summary = "Get all players"
    )
    public Page<Player> getAllPlayer(Pageable pageable) {
        return playerSv.findAll(pageable);
    }
    @GetMapping("/player/get/all/team-name")
    @Operation(
            description = "Retrieve all players belonging to a specific team.",
            summary = "Get all players by team name"
    )
    public Page<Player> getAllFromTeamName(@RequestParam("team-name") String teamName, Pageable pageable) {
        return playerSv.findAllByTeamName(teamName, pageable);
    }

    @GetMapping("/player/get/all/tournament-name")
    @Operation(
            description = "Retrieve all players participating in a specific tournament.",
            summary = "Get all players by tournament name"
    )
    public Page<Player> getAllByTournamentName(@RequestParam("tournament-name") String tournamentName, Pageable pageable) {
        return playerSv.findAllByTournamentName(tournamentName, pageable);
    }
    @GetMapping("/player/get/averagePoints/name-player")
    @Operation(
            description = "Retrieve the average points per game for a player.",
            summary = "Get average points per game by player name"
    )
    public double averagePointPerGame(@RequestParam("name-player") String namePlayer) throws BadRequestException {
        Player p = playerSv.getByNickname(namePlayer);
        return gameSv.averagePointPerGame(p);
    }
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/player/get/byId/{id}")
    @Operation(
            description = "Retrieve a player by their unique identifier.",
            summary = "Get a player by ID"
    )
    public Player getPlayerById(@PathVariable UUID id)throws BadRequestException{
        return playerSv.getById(id);
    }
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/player/get/byName/{name}")
    @Operation(
            description = "Retrieve a player by their name.",
            summary = "Get a player by name"
    )
    public Player getPlayerByName(@RequestParam String name)throws BadRequestException{
        return playerSv.getByNickname(name);
    }
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/player/get/{id}/points")
    @Operation(
            description = "Retrieve the points scored by a player.",
            summary = "Get points by player ID"
    )
    public ConfirmPlayerPoints getPointsByPlayerId(@PathVariable UUID id) {
        int points = playerSv.getPointsByPlayerId(id);
        return new ConfirmPlayerPoints("Player points have been successfully retrieved.",points);
    }
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/player/get/point-player/tournament-name")
    @Operation(
            description = "Retrieve players and their points for a specific tournament.",
            summary = "Get players and points by tournament name"
    )
    public PlayerPointRes getPlayersAndPointsFromTournament(@RequestParam String tournamentName)throws BadRequestException{
        Tournament tournament = tournamentSv.getByName(tournamentName);
        return new PlayerPointRes(
                "Player points have been successfully retrieved.",
                playerSv.getPlayersWithNameAndPointsByTournament(tournament)
        );
    }

    // ****************** REFEREE CONTROLLER ********************
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/referee/get/all")
    @Operation(
            description = "Retrieve all referees.",
            summary = "Get all referees"
    )
    public List<Referee> getAllReferee(){
        return refereeSv.getAll();
    }
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/referee/get/byId/{id}")
    @Operation(
            description = "Retrieve a referee by their unique identifier.",
            summary = "Get a referee by ID"
    )
    public Referee getRefereeById(@PathVariable UUID id)throws BadRequestException {
        return refereeSv.getById(id);
    }
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/referee/get/byNickname/{nickname}")
    @Operation(
            description = "Retrieve a referee by their nickname.",
            summary = "Get a referee by nickname"
    )
    public Referee getRefereeByNickname(@PathVariable String nickname)throws BadRequestException {
        return refereeSv.getByNickname(nickname);
    }
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/referee/get/all/tournament-name")
    @Operation(
            description = "Retrieve all referees for a specific tournament.",
            summary = "Get all referees by tournament name"
    )
    public List<Referee> getAllFromTournamentName(@RequestParam("tournament-name") String name){
        return refereeSv.getAllRefereeFromTournament(name);
    }


    // ****************** TEAM CONTROLLER ********************

    @GetMapping("/team/get/all")
    @Operation(
            description = "Retrieve all teams with pagination support.",
            summary = "Get all teams"
    )
    public Page<Team> getAllTeam(Pageable pageable){
        return teamSv.getAll(pageable);
    }

    @GetMapping("/team/get/all/tournament-name")
    @Operation(
            description = "Retrieve all teams participating in a specific tournament.",
            summary = "Get all teams by tournament name"
    )
    public List<Team> getAllByTournamentName(@RequestParam("tournament-name") String tournamentName){
        return teamSv.getAllByTournamentName(tournamentName);
    }

    @GetMapping("/team/get/all/without-captain")
    @Operation(
            description = "Retrieve all teams without a captain.",
            summary = "Get all teams without captain"
    )
    public List<Team> getAllTeamWithoutCaptain() throws NotFoundException {
        List<Team> teams = teamSv.getAllTeamWithoutCaptain();
        if (teams.isEmpty()) {
            throw new NotFoundException("No teams without a captain found.");
        }
        return teams;
    }

    @GetMapping("/team/get/byId/{id}")
    @Operation(
            description = "Retrieve a team by its unique identifier.",
            summary = "Get a team by ID"
    )
    public Team getTeamById(@PathVariable UUID id)throws BadRequestException {
        return teamSv.getById(id);
    }

    @GetMapping("/team/get/byName/{name}")
    @Operation(
            description = "Retrieve a team by its name.",
            summary = "Get a team by name"
    )
    public Team getTeamByName(@PathVariable String name)throws BadRequestException {
        return teamSv.getByName(name);
    }

    @GetMapping("/team/get/player-name")
    @Operation(
            description = "Retrieve the team by a player's name.",
            summary = "Get a team by player's name"
    )
    public Team getTeamByPlayerName(@RequestParam("player-name") String playerName)throws BadRequestException{
        return teamSv.getByPlayerName(playerName);
    }


    // ****************** TOURNAMENT CONTROLLER ********************

    @GetMapping("/tournament/get/all")
    @Operation(
            description = "Retrieve all tournaments with pagination support.",
            summary = "Get all tournaments"
    )
    public Page<Tournament> getAllTournament(Pageable pageable){
        return tournamentSv.getAll(pageable);
    }

    @GetMapping("/tournament/get/all/place-id")
    @Operation(
            description = "Retrieve all tournaments associated with a specific place.",
            summary = "Get all tournaments by place ID"
    )
    public Page<Competition> getAllTournamentByPlaceId(@RequestParam("place-id") UUID id, Pageable pageable){
        return placeSv.getAllTournamentsByPlaceId(id, pageable);
    }

    @GetMapping("/tournament/get/all/auto-complete/court-name")
    @Operation(
            description = "Retrieve tournaments matching a keyword in the court name.",
            summary = "Get tournaments by court name (autocomplete)"
    )
    public Page<Competition> getAllTournamentByCourtName(@RequestParam("court-name") String courtName, Pageable pageable){
        return placeSv.findTournamentsByKeywordInCourtName(courtName, pageable);
    }

    @GetMapping("/tournament/get/all/auto-complete/town-name")
    @Operation(
            description = "Retrieve tournaments matching a keyword in the town name.",
            summary = "Get tournaments by town name (autocomplete)"
    )
    public Page<Competition> getAllTournamentByTownName(@RequestParam("town-name") String townName, Pageable pageable){
        return placeSv.findTournamentsByKeywordInTownName(townName, pageable);
    }

    @GetMapping("/tournament/get/all/auto-complete/region-name")
    @Operation(
            description = "Retrieve tournaments matching a keyword in the region name.",
            summary = "Get tournaments by region name (autocomplete)"
    )
    public Page<Competition> getAllTournamentByRegion(@RequestParam("region-name") String region, Pageable pageable){
        return placeSv.findTournamentsByKeywordInRegion(region, pageable);
    }

    @GetMapping("/tournament/get/all/tournament-level")
    @Operation(
            description = "Retrieve tournaments by their level.",
            summary = "Get tournaments by level"
    )
    public List<Tournament> getAllTournamentByLevel(@RequestParam("tournament-level") String level) throws BadRequestException {
        return tournamentSv.getByLevel(level);
    }

    @GetMapping("/tournament/get/all/after-starter-date")
    @Operation(
            description = "Retrieve tournaments starting after a specific date.",
            summary = "Get tournaments starting after a given date"
    )
    public List<Tournament> getAllTournamentAfterStarDate(@RequestParam("after-starter-date") String startDate) {
        return tournamentSv.getByStartDateAfter(startDate);
    }

    @GetMapping("/tournament/get/all/after-starter-date/town-name")
    @Operation(
            description = "Retrieve tournaments starting after a specific date in a given town.",
            summary = "Get tournaments starting after a given date in a specific town"
    )
    public List<Tournament> getAllTournamentAfterStarDateAndTown(@RequestParam("town-name") String townName, @RequestParam("after-starter-date")String startDate) throws BadRequestException {
        return tournamentSv.findByPlaceAndStartDateAfter(townName,startDate);
    }
    @GetMapping("/tournament/get/byId/{id}")
    @Operation(
            description = "Retrieve a tournament by its unique identifier.",
            summary = "Get a tournament by ID"
    )
    public Tournament getTournamentById(@PathVariable UUID id)throws BadRequestException {
        return tournamentSv.getById(id);
    }
    @GetMapping("/tournament/get/byName/{tournament-name}")
    @Operation(
            description = "Retrieve a tournament by its name.",
            summary = "Get a tournament by name"
    )
    public Tournament getTournamentByName(@PathVariable("tournament-name") String name)throws BadRequestException {
        return tournamentSv.getByName(name);
    }


    // ****************** USER CONTROLLER ********************
    @GetMapping("/user/get/all")
    @Operation(
            description = "Retrieve all users with pagination support.",
            summary = "Get all users"
    )
    public Page<User> getAll(Pageable pageable){
        return userSv.getAll(pageable);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping("/user/get/byId/{id}")
    @Operation(
            description = "Retrieve a user by their unique identifier.",
            summary = "Get a user by ID"
    )
    public User getUserById(@PathVariable UUID id)throws BadRequestException {
        return userSv.getById(id);
    }

    @PreAuthorize("hasAuthority('MANAGER')")
    @GetMapping("/user/get/byUsername/{username}")
    @Operation(
            description = "Retrieve a user by their username.",
            summary = "Get a user by username"
    )
    public User getByUsername(@PathVariable  String username)throws BadRequestException {
        return userSv.getByUsername(username);
    }

}
