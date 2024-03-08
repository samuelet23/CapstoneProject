package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    private String via;

    private String civico;

    private int cap;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "town_id", nullable = false)
    private Town town;

    @Transient
    private String townName;

    @Transient
    private String  siglaProvince;


    public Address(String via, String civico, int cap, String townName, String siglaProvince) {
        this.via = via;
        this.civico = civico;
        this.cap = cap;
        this.townName = townName;
        this.siglaProvince = siglaProvince;
    }
}
