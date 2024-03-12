package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.NotBlank;

public record UpdateCourtNameDTO(
        @NotBlank(message = "The court name field cannot be empty/null")
        String courtName
) {
}
