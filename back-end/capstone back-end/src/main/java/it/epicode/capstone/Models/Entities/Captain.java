package it.epicode.capstone.Models.Entities;

import it.epicode.capstone.Models.Entities.SuperClass.Person;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Captain extends Person {

    @OneToOne(mappedBy = "captain")
    private Team team;
    public Captain(String name, String surname, LocalDate dateOfBirth, Team team) {
        super(name, surname, dateOfBirth);
        this.team = team;
    }

}
