package it.epicode.capstone.Models.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.Set;
import java.util.UUID;
public record TeamDTO(
        @NotEmpty(message = "La squadra deve avere dei giocatori")
        @Size(min = 3, max = 5, message = "La squadra deve avere tra 3 e 5 giocatori")
        @Valid
        Set<PlayerDTO> players,

        @NotBlank(message = "Il campo nome non può essere vuoto/null")
        String nameTeam,
        @NotBlank(message = "Il campo captainName non può essere vuoto/null")
        String captainName,
        UUID idTournament
) {
}
