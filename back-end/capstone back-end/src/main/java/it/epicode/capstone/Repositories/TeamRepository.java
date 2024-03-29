package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TeamRepository extends JpaRepository<Team, UUID>, PagingAndSortingRepository<Team, UUID> {

    List<Team> findByCaptainIsNull();
    List<Team> findByTournamentIsNull();
    @Query("SELECT t FROM Team t WHERE LOWER(REPLACE(t.name, ' ', '')) = LOWER(REPLACE(:name, ' ', ''))")
    Optional<Team> findByName(String name);
    @Query("SELECT t FROM Team t WHERE t.tournament.name = :name")
    List<Team> findByTournament(String name);

    @Query("SELECT t FROM Team t WHERE :namePlayer IN (SELECT p.name FROM t.players p)")
    Team findByPlayerName(@Param("namePlayer") String namePlayer);


}
