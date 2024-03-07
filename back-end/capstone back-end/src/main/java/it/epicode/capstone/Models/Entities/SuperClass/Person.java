package it.epicode.capstone.Models.Entities.SuperClass;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.Period;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Setter(AccessLevel.NONE)
    private UUID id;

    String name;
    String surname;
    LocalDate dateOfBirth;

    @Setter(AccessLevel.NONE)
    int age = calculateAge();

    public Person(String name, String surname, LocalDate dateOfBirth){
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
    }

    public int calculateAge()  {
        LocalDate now = LocalDate.now();
        if (dateOfBirth == null) {
            throw new IllegalArgumentException("Invalid date of birth");
        }

        Period period = Period.between(this.dateOfBirth, now);

        int years = period.getYears();
        int month = period.getMonths();

        if (month < 0) {
            years--;
        }
        if (years < 14) {
            throw new RuntimeException("You are still too young to sign up for the platform");
        }

        return years;
    }

}
