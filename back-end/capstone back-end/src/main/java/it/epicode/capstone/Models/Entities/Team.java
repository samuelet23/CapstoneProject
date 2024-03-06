package it.epicode.capstone.Models.Entities;

import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.SuperClass.Person;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
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
    private Set<Player> players = new HashSet<>();

    private String logo;
    private String name;

    private Player captain;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    private Competition tournament;

    public Team(String name){
        this.name = name;
    }
    public void setPlayers(Set<Player> players) throws IllegalArgumentException {
        if (players.size() < 3 || players.size() > 5) {
            throw new IllegalArgumentException("A team must have between 3 and 5 players.");
        }
        this.players = players;
    }
    public void addPlayer(Player player) throws IllegalArgumentException {
        if (players.size() >= 5) {
            throw new IllegalArgumentException("A team cannot have more than 5 players.");
        }
        players.add(player);
    }
    public void setCaptain(Player player) throws IllegalArgumentException {
        if (!players.contains(player)) {
            throw new IllegalArgumentException("The player must be part of the team to be set as captain.");
        }
        this.captain = player;
    }

}
