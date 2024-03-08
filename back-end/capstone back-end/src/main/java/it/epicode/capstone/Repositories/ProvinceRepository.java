package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, String>, PagingAndSortingRepository<Province, String> {

    @Query("SELECT p FROM Province p ORDER BY name ASC")
    List<Province> findAllOrderByNomeAsc();

    @Query("SELECT p FROM Province p WHERE p.region = :region")
    List<String> extractAllProvincesByRegion(String region);

    @Query("SELECT p.region FROM Province p")
    List<String> extractAllRegions();
    Optional<Province> findBySigla(String sigla);


}
