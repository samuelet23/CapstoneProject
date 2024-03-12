package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Enums.Round;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record BeforeGameDTO(
        @NotBlank(message = "Il nome della squadra di casa non può essere vuoto o null")
        String homeTeamName,
        @NotBlank(message = "Il nome della squadra ospite non può essere vuoto o null")
        String awayTeamName,

        @NotBlank(message = "Il round non può essere vuoto o null")
        String round
) {
}
