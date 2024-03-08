package it.epicode.capstone.Models.Entities;

import io.swagger.v3.oas.annotations.Hidden;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "places")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToOne
    @JoinColumn(name = "town_id")
    private Town town;

    private String courtName;

    @OneToMany(mappedBy = "place")
    private List<Competition> tournaments;

    public Place(Address address, String courtName) {
        this.address = address;
        this.courtName = courtName;
    }
}
