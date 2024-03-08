package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;

@Tag(name = "UpdateStatsPlayer")
public record UpdateStatsPlayerDTO(
        @NotBlank(message = "The point field cannot be empty/null")
        int point,
        @NotBlank(message = "The gamesPlayed field cannot be empty/null")
        int gamesPlayed
) {
}
