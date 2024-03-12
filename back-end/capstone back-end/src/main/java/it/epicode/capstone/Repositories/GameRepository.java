package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.Enums.Round;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
@Repository
public interface GameRepository extends JpaRepository<Game, UUID>, PagingAndSortingRepository<Game, UUID> {
    List<Game> findByTournament(Competition tournament);

    boolean existsByHomeTeamNameAndAwayTeamNameAndRound(String homeTeam, String awayTeam, Round round);
}
