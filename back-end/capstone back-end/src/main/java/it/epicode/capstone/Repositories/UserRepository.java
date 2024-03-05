package it.epicode.capstone.Repositories;

import it.epicode.capstone.Models.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>, PagingAndSortingRepository<User, UUID> {

    public Optional<User> findByEmail(String email);
    public Optional<User> findByUsername(String username);
    @Query("SELECT u.email FROM User u")
    public List<String> getAllEmail();
    @Query("SELECT u.username FROM User u")
    public List<String> getAllUsernames();
}
