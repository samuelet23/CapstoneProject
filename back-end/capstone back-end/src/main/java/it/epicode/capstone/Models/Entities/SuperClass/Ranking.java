package it.epicode.capstone.Models.Entities.SuperClass;

import it.epicode.capstone.Models.Entities.RankedPlayers;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
public abstract class Ranking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @Transient
    private RankedPlayers players;

    @Transient
    private Competition tournament;
}
