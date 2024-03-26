package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.NotBlank;

public record UpdateCoordinatorDTO(
        @NotBlank(message = "Il campo name non può essere vuoto/null")
        String nickname
) {
}
