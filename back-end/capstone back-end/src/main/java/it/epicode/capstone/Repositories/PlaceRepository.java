package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.*;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
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
public interface PlaceRepository extends JpaRepository<Place, UUID>, PagingAndSortingRepository<Place, UUID> {

    Optional<Place> findByCourtName(String courtName);
    @Query("SELECT p FROM Place p WHERE p.address.town.name = :name")
    Optional<Place> findByTownName(String name);


    @Query("SELECT p.address.town.name FROM Place p")
    List<Town> findAllTown();

    @Query("SELECT p.address.town.province FROM Place p")
    List<Province> findAllProvince();

    @Query("SELECT p.address.town.province.region FROM Place p")
    List<String> findAllRegion();
    @Query("SELECT p.tournaments FROM Place p WHERE p.id = :placeId")
    Page<Competition> findAllTournamentsByPlaceId(UUID placeId, Pageable pageable);


    //trova tutti i tornei in base al nome del campo
    @Query("SELECT c FROM Place p JOIN p.tournaments c WHERE LOWER(p.courtName) LIKE %:keyword%")
    Page<Competition> findTournamentsByKeywordInCourtName(@Param("keyword") String keyword, Pageable pageable);

    //trova tutti i tornei in base al comune
    @Query("SELECT c FROM Place p JOIN p.tournaments c WHERE LOWER(p.address.town.province.name) LIKE %:keyword%")
    List<Competition> findTournamentsByKeywordInProvinceName(@Param("keyword") String keyword);

    //trova tutti i tornei in base alla regione
    @Query("SELECT c FROM Place p JOIN p.tournaments c JOIN p.address.town t JOIN t.province pr WHERE LOWER(pr.region) LIKE %:keyword%")
    Page<Competition> findTournamentsByKeywordInRegion(@Param("keyword") String keyword, Pageable pageable);


}
