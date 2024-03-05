package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import it.epicode.capstone.Models.Entities.Town;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Province {

    @Id
    @Setter(AccessLevel.NONE)
    private String sigla;

    private String region;
    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "province")
    private List<Town> towns;

}
