package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.Address;
import it.epicode.capstone.Models.Entities.Town;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface AddressRepository extends JpaRepository<Address, UUID>, PagingAndSortingRepository<Address, UUID> {

    List<Address> findByTown(Town town);

}
