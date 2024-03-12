package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.NotEmpty;

public record UpdateTeamNameDTO(
        @NotEmpty(message = "Il nome della squadra non può essere vuoto")
        String teamName
) {
}
