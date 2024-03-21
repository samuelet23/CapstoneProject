package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Province {

    @Id
    @Setter(AccessLevel.NONE)
    private String sigla;

    private String region;
    private String name;

    @JsonIgnore
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
