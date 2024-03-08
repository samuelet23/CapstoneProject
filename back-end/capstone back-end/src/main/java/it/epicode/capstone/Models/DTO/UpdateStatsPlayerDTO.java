package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.NotBlank;

public record UpdateStatsPlayerDTO(
        @NotBlank(message = "The point field cannot be empty/null")
        int point,
        @NotBlank(message = "The gamesPlayed field cannot be empty/null")
        int gamesPlayed
) {
}
