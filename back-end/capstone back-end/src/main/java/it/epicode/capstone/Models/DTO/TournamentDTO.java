package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Entities.Game;
import it.epicode.capstone.Models.Entities.Place;
import it.epicode.capstone.Models.Entities.Team;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Set;

public record TournamentDTO (
         @NotBlank(message = "The name field cannot be empty/null")
         String name,
         @NotBlank(message = "The startDat field cannot be empty/null and the date must be dd/MM/yyyy")
         String startDate,
         String coverUrl,
         @NotEmpty(message = "The tournament must have a referee")
         @Size(min = 1, max = 3, message = "The tournament must have between 1 and 3 referee")
         @Valid
         List<String> referees,
         @NotEmpty(message = "The tournament must have the teams")
         @Size(min = 12, max = 16, message = "The tournament must have between 12 and 16 teams")
         @Valid
         Set<TeamDTO> teams,

         @NotBlank(message = "The place field cannot be empty/null")
         @NotEmpty(message = "This field must contain via, civico,cap, town name , sigla province ")
         @Valid
         PlaceDTO place,

         String level
) {
}
