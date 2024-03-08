package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BeforeGameDTO(
        @NotBlank(message = "home team field cannot be empty/null")
        String homeTeam,
        @NotBlank(message = "away team field cannot be empty/null")
        String awayTeam,
        @NotBlank(message = "round field cannot be empty/null")
        int round
) {
}
