package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Hidden;
import it.epicode.capstone.Models.Entities.SuperClass.Person;
import it.epicode.capstone.Models.Enums.Role;
import jakarta.persistence.*;
import jdk.jfr.Unsigned;
import lombok.*;
import it.epicode.capstone.Exceptions.BadRequestException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

//@EqualsAndHashCode(callSuper = true)
@Entity
@NoArgsConstructor
@Data
@Table(name = "users")
public class User extends Person implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @Column(unique = true)
    private  String username;
    @Column(unique = true)
    private  String email;

    @JsonIgnore
    private  String password;
    @JsonIgnore
    private  String confirmPassword;

    private String logoProfile;

    private Timestamp createdAt;

    @ManyToMany
    @JoinTable(
            name = "user_favorite_tournament",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "tournament_id")
    )
    private List<Tournament> favoriteTournaments;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String name, String surname, LocalDate dateOfBirth,Role role, String username, String email, String password, String confirmPassword) throws BadRequestException {
        super(name, surname, dateOfBirth);
        this.username = username;
        this.email = email;
        this.role = role;
        this.password = password;
        this.confirmPassword = confirmPassword;
        createdAt = Timestamp.valueOf(LocalDateTime.now());
    }

    public User(String name, String surname, LocalDate dateOfBirth, int age, String username, String email, String password, String confirmPassword, Role role) {
        super(name, surname, dateOfBirth, age);
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.createdAt = Timestamp.valueOf(LocalDateTime.now());
        this.role = role;
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    @Override
    @JsonIgnore
    public String toString() {
        return "";
    }
}
