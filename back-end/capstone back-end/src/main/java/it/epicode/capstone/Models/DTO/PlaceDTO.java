package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Entities.Address;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import it.epicode.capstone.Models.Entities.Town;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

@Tag(name = "Place")
public record PlaceDTO(
            @NotBlank(message = "The address field cannot be empty/null")
            @NotEmpty(message = "This field must contain via, civico,cap, town name and sigla province ")
            @Valid
            AddressDTO address,
            @NotBlank(message = "The court name field cannot be empty/null")
            String courtName

) {
}
