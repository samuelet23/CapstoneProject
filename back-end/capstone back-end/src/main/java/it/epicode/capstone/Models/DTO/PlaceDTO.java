package it.epicode.capstone.Models.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record PlaceDTO(

            AddressDTO address,
            @NotBlank(message = "Il nome del campo non può essere vuoto")
            String courtName

) {
}
