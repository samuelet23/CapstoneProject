package it.epicode.capstone.Models.Entities;

import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.SuperClass.Person;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @OneToMany(mappedBy = "team")
    private Set<Player> players;

    private String logo;
    private String nome;

    @OneToOne
    @JoinColumn(name = "captain_id")
    private Captain captain;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    private Competition tournament;
}
