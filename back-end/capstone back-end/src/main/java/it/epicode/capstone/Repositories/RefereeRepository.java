package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.Referee;
import it.epicode.capstone.Models.Entities.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RefereeRepository extends JpaRepository<Referee, UUID> {

    @Query("SELECT r FROM Referee r WHERE r.tournament.name = :name")
    List<Referee> findByTournamentName(String name);

    Optional<Referee> findByNickname(String nickname);
}
