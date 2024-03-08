package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Entities.Player;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
public record TeamDTO(
        @NotEmpty(message = "The team must have players")
        @Size(min = 3, max = 5, message = "The team must have between 3 and 5 players")
        @Valid
        Set<PlayerDTO> players,
        String logo,
        @NotBlank(message = "The name field cannot be empty/null")
        String name,
        @NotBlank(message = "The captainName field cannot be empty/null")
        String captainName,
        UUID idTournament
) {
}
