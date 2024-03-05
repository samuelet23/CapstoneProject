package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private Timestamp createdAt;

    private Role role = Role.USER;

    public User(String name, String surname, LocalDate dateOfBirth, String username, String email, String password, String confirmPassword) throws BadRequestException {
        super(name, surname, dateOfBirth);
        this.username = username;
        this.email = email;
        this.password = password;
        if (confirmPassword()) {
            this.confirmPassword = confirmPassword;
        }else {
            throw new BadRequestException("Le due password non sono uguali");
        }
        createdAt = Timestamp.valueOf(LocalDateTime.now());
    }


    public boolean confirmPassword(){
        if (confirmPassword == password) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of(new SimpleGrantedAuthority(role.name()));
        Set<GrantedAuthority> authorities = new HashSet<>();

        authorities.add(new SimpleGrantedAuthority(role.name()));

        return authorities;
    }


    @Override
    public String toString() {
        return "";
    }
}
