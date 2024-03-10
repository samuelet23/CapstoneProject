package it.epicode.capstone.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "All Get Method API")
@RequestMapping("/api")
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
    public Page<Game> getGameAll(Pageable pageable){
        return gameSv.getAll(pageable);
    }
    @GetMapping("/game/get/all/tournament/{name}")
    public List<Game> getGameAllByTournament(@PathVariable String name)throws BadRequestException {
        Tournament tournament = tournamentSv.getByName(name);
        return gameSv.getAllByTournament(tournament);
    }
    @GetMapping("/game/get/{id}")
    public Game getGameById(@PathVariable UUID id)throws BadRequestException {
        return gameSv.getById(id);
    }
    //   **************** PLACE CONTROLLER *******************
    @GetMapping("/place/get/all")
    public Page<Place> getAllPlace(Pageable pageable){
        return placeSv.getAll(pageable);
    }
    @GetMapping("/place/get/all/town")
    public List<Town> getAllTown(){
        return placeSv.getAllTown();
    }
    @GetMapping("/place/get/all/province")
    public List<Province> getAllProvince(){
        return placeSv.getAllProvince();
    }
    @GetMapping("/place/get/all/region")
    public List<String> getAllRegione(){
        return placeSv.getAllRegion();
    }
    @GetMapping("/place/get/{id}")
    public Place getPlaceById(@PathVariable UUID id)throws BadRequestException{
        return placeSv.getById(id);
    }
    @GetMapping("/place/get/court-name")
    public Place getPlaceByCourtName(@RequestParam("court-name") String courtName)throws BadRequestException{
        return placeSv.getByCourtName(courtName);
    }
    @GetMapping("/place/get/town-name")
    public Place getTownName(@RequestParam("town-name") String townName)throws BadRequestException{
        return placeSv.getByTownName(townName);
    }
    //   ****************** PLAYER CONTROLLER ********************

    @GetMapping("/player/get/all")
    public Page<Player> getAllPlayer(Pageable pageable) {
        return playerSv.findAll(pageable);
    }

    @GetMapping("/player/get/all/team-name")
    public Page<Player> getAllFromTeamName(@RequestParam("team-name") String teamName, Pageable pageable) {
        return playerSv.findAllByTeamName(teamName, pageable);
    }
    @GetMapping("/player/get/all/tournament-name")
    public Page<Player> getAllByTournamentName(@RequestParam("tournament-name") String tournamentName, Pageable pageable) {
        return playerSv.findAllByTournamentName(tournamentName, pageable);
    }

    @GetMapping("/player/get/name-player/averagePoints")
    public double averagePointPerGame(@RequestParam("name-player") String namePlayer) throws BadRequestException {
        Player p = playerSv.getByName(namePlayer);
        return gameSv.averagePointPerGame(p);
    }
    @GetMapping("/player/get/{id}")
    public Player getPlayerById(@PathVariable UUID id)throws BadRequestException{
        return playerSv.getById(id);
    }
    @GetMapping("/player/get/name")
    public Player getPlayerByName(@RequestParam String name)throws BadRequestException{
        return playerSv.getByName(name);
    }
    @GetMapping("/player/get/{id}/points")
    public ConfirmPlayerPoints getPointsByPlayerId(@PathVariable UUID id) {
        int points = playerSv.getPointsByPlayerId(id);
        return new ConfirmPlayerPoints("Player points have been successfully retrieved.",points);
    }
    @GetMapping("/player/get/point-player/tournament-name")
    public PlayerPointRes getPlayersAndPointsFromTournament(@RequestParam String tournamentName)throws BadRequestException{
        Tournament tournament = tournamentSv.getByName(tournamentName);
        return new PlayerPointRes(
                "Player points have been successfully retrieved.",
                playerSv.getPlayersWithNameAndPointsByTournament(tournament)
        );
    }

    //   ****************** REFEREE CONTROLLER ********************

    @GetMapping("/referee/get/all")
    public List<Referee> getAllReferee(){
        return refereeSv.getAll();
    }
    @GetMapping("/referee/get/{id}")
    public Referee getRefereeById(@PathVariable UUID id)throws BadRequestException {
        return refereeSv.getById(id);
    }
    @GetMapping("/referee/get/{name}")
    public Referee getRefereeByName(@PathVariable String name)throws BadRequestException {
        return refereeSv.getByName(name);
    }
    @GetMapping("/referee/get/all/tournament-name")
    public List<Referee> getAllFromTournamentName(@RequestParam("tournament-name") String name){
        return refereeSv.getAllRefereeFromTournament(name);
    }

    //   ****************** TEAM CONTROLLER ********************
    @GetMapping("/team/get/all")
    public Page<Team> getAllTeam(Pageable pageable){
        return teamSv.getAll(pageable);
    }
    @GetMapping("/team/get/all/tournament-name")
    public List<Team> getAllByTournamentName(@RequestParam("tournament-name") String tournamentName){
        return teamSv.getAllByTournamentName(tournamentName);
    }
    @GetMapping("/team/get/all/without-captain")
    public List<Team> getAllTeamWithoutCaptain() throws NotFoundException {
        List<Team> teams = teamSv.getAllTeamWithoutCaptain();
        if (teams.isEmpty()) {
            throw new NotFoundException( "No teams without a captain found." );
        }
        return teams;
    }
    @GetMapping("/team/get/{id}")
    public Team getTeamById(@PathVariable UUID id)throws BadRequestException {
        return teamSv.getById(id);
    }
    @GetMapping("/team/get/{name}")
    public Team getTeamByName(@PathVariable String name)throws BadRequestException {
        return teamSv.getByName(name);
    }
    @GetMapping("/team/get/player-name")
    public Team getTeamByPlayerName(@RequestParam("player-name") String playerName)throws BadRequestException{
        return teamSv.getByPlayerName(playerName);
    }

    //   ****************** TOURNAMENT CONTROLLER ********************

    @GetMapping("/tournament/get/all")
    public Page<Tournament> getAllTournament(Pageable pageable){
        return tournamentSv.getAll(pageable);
    }
    @GetMapping("/tournament/get/all/place-id")
    public Page<Competition> getAllTournamentByPlaceId(@RequestParam("place-id") UUID id, Pageable pageable){
        return placeSv.getAllTournamentsByPlaceId(id, pageable);
    }
    @GetMapping("/tournament/get/all/auto-complete/court-name")
    public Page<Competition> getAllTournamentByCourtName(@RequestParam("court-name") String courtName, Pageable pageable){
        return placeSv.findTournamentsByKeywordInCourtName(courtName, pageable);
    }
    @GetMapping("/tournament/get/all/auto-complete/town-name")
    public Page<Competition> getAllTournamentByTownName(@RequestParam("town-name") String townName, Pageable pageable){
        return placeSv.findTournamentsByKeywordInTownName(townName, pageable);
    }
    @GetMapping("/tournament/get/all/auto-complete/region-name")
    public Page<Competition> getAllTournamentByRegion(@RequestParam("region-name") String region, Pageable pageable){
        return placeSv.findTournamentsByKeywordInRegion(region, pageable);
    }
    @GetMapping("/tournament/get/all/tournament-level")
    public List<Tournament> getAllTournamentByLevel(@RequestParam("tournament-level") String level) throws BadRequestException {
        return tournamentSv.getByLevel(level);
    }
    @GetMapping("/tournament/get/all/after-starter-date")
    public List<Tournament> getAllTournamentAfterStarDate(@RequestParam("after-starter-date") String startDate) {
        return tournamentSv.getByStartDateAfter(startDate);
    }
    @GetMapping("/tournament/get/all/after-starter-date/town-name")
    public List<Tournament> getAllTournamentAfterStarDateAndTown(@RequestParam("town-name") String townName, @RequestParam("after-starter-date")String startDate) throws BadRequestException {
        return tournamentSv.findByTownAndStartDateAfter(townName,startDate);
    }
    @GetMapping("/tournament/get/{id}")
    public Tournament getTournamentById(@PathVariable UUID id)throws BadRequestException {
        return tournamentSv.getById(id);
    }
    @GetMapping("/tournament/get/{tournament-name}")
    public Tournament getTournamentByName(@PathVariable("tournament-name") String name)throws BadRequestException {
        return tournamentSv.getByName(name);
    }

    //   ****************** USER CONTROLLER ********************
    @GetMapping("/user/get/all")
    @PreAuthorize("hasAuthority('MANAGER')")
    public Page<User> getAll(Pageable pageable){
        return userSv.getAll(pageable);
    }
    @GetMapping("/user/get/{id}")
    public User getUserById(@PathVariable UUID id)throws BadRequestException {
        return userSv.getById(id);
    }
    @GetMapping("/user/get/username")
    public User getByUsername(@PathVariable String username)throws BadRequestException {
        return userSv.getByUsername(username);
    }
}
