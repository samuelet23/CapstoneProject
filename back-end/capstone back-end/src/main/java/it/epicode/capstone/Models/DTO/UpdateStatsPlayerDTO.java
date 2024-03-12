package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;

public record UpdateStatsPlayerDTO(
        int point,
        int gamesPlayed
) {
}
