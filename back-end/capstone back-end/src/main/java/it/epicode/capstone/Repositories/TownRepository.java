package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.Province;
import it.epicode.capstone.Models.Entities.Town;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TownRepository extends JpaRepository<Town, UUID>, PagingAndSortingRepository<Town, UUID> {
     Page<Town> findByNameContainingIgnoreCase(String name, Pageable pageable);
     List<Town> findByProvince(Province province);

     Optional<Town> findByName(String name);
     @Query("SELECT t FROM Town t WHERE t.name = :name AND t.province.sigla= :province")
     Optional<Town> findTownByNameAndProvince(String name, String province);

     @Query("SELECT t FROM Town t ORDER BY name ASC")
     public List<Town> findAllOrderByNomeAsc();

     List<Town> findAllByNameAndProvince(String name, Province province);
}
