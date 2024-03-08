package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.Entities.Tournament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayerRepository extends JpaRepository<Player, UUID>, PagingAndSortingRepository<Player, UUID> {

    Optional<Player> findByName(String name);
    @Query("SELECT p FROM Player p WHERE p.team.name = :teamName")
    Page<Player> findAllByTeamName(@Param("teamName")String teamName, Pageable pageable);

    @Query("SELECT p FROM Player p WHERE p.team.tournament.name = :name")
    Page<Player> findAllByTournamentName(@Param("name") String name, Pageable pageable);

    @Query("SELECT p.point FROM Player p WHERE p.id = :playerId")
    Integer findPointsByPlayerId(UUID playerId);

    @Query("SELECT p.name, p.point FROM Player p JOIN p.team t JOIN t.tournament c WHERE c = :tournament")
    List<Object[]> getPlayersWithNameAndPointsByTournament( Tournament tournament);

}
