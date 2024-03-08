package it.epicode.capstone.Models.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.AnyKeyJavaClass;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "towns")
@Hidden
public class Town {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Setter(AccessLevel.NONE)
    private UUID id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sigla_province", nullable = false)
    private Province province;

    @JsonIgnore
    @OneToMany(mappedBy = "town")
    List<Address> addresses;

    @JsonIgnore
    @Transient
    String nameProvince ;

    public Town(String name, Province province) {
        this.name = name;
        this.province = province;
    }
    public Town(Province siglaProvince, String name) {
        this.name = name;
        nameProvince = siglaProvince.getSigla();
    }
}
