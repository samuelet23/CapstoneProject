package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import io.swagger.v3.oas.annotations.Hidden;
import it.epicode.capstone.Models.Entities.Town;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "provinces")
@Hidden
public class Province {

    @Id
    @Setter(AccessLevel.NONE)
    private String sigla;

    private String region;
    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "province")
    private List<Town> towns;


    public Province(String sigla, String name, String region) {
        this.sigla = sigla;
        this.name = name;
        this.region = region;
    }

    @Override
    public String toString() {
        return "Province{" +
                "sigla='" + sigla + '\'' +
                ", region='" + region + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
