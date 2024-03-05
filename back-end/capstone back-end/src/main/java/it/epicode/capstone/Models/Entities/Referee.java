package it.epicode.capstone.Models.Entities;

import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.SuperClass.Person;
import it.epicode.capstone.Models.Enums.LevelReferee;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Referee extends Person {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "referee_id")
    private Competition tournament;

    @Enumerated(EnumType.STRING)
    private LevelReferee level;

    public Referee(String name, String surname, LocalDate dateOfBirth) {
        super(name, surname, dateOfBirth);
    }
    public Referee(String name, String surname, LocalDate dateOfBirth, Competition tournament, LevelReferee level) {
        super(name, surname, dateOfBirth);
        this.tournament = tournament;
        this.level = level;
    }

}
