package it.epicode.capstone.Models.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record PlaceDTO(
            @NotBlank(message = "The address field cannot be empty/null")
            @NotEmpty(message = "This field must contain via, civico,cap, town name and sigla province ")
            @Valid
            AddressDTO address,
            @NotBlank(message = "The court name field cannot be empty/null")
            String courtName

) {
}
