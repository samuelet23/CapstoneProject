package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.Place;
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.Entities.Tournament;
import it.epicode.capstone.Models.Enums.TournamentLevel;
import it.epicode.capstone.Models.Enums.TournamentState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TournamentRepository extends JpaRepository<Tournament, UUID> {
    List<Tournament> findAllByState(TournamentState state);
    List<Tournament> findByLevel(TournamentLevel level);
    Optional<Tournament> findByName(String name);
    List<Tournament> findByStartDateAfter(LocalDate startDate);
    @Query("SELECT t FROM Tournament t WHERE t.place = :place AND t.startDate > :startDate")
    List<Tournament> findByPlaceAndStartDateAfter(Place place, LocalDate startDate);


}

