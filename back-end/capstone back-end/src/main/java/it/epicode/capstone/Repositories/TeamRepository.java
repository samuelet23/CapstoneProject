package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TeamRepository extends JpaRepository<Team, UUID>, PagingAndSortingRepository<Team, UUID> {

    List<Team> findByCaptainIsNull();

    Optional<Team> findByName(String name);
    @Query("SELECT t FROM Team t WHERE t.tournament.name = :name")
    List<Team> findByTournament(String name);

    @Query("SELECT t FROM Team t JOIN t.players p WHERE p.name = :namePlayer")
    Optional<Team> findByPlayersContains(String namePlayer);

}
