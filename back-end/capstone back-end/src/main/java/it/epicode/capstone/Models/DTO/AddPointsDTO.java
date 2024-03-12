package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.*;

public record AddPointsDTO (
        @Min(value = 1, message = "Il valore deve essere almeno 1")
        @Max(value = 3, message = "Il valore non può superare 3")
        int pointToAdd,
        @NotBlank(message = "siglaPlayer field cannot be empty/null")
        @Pattern(regexp = "[A-Ea-e]", message = "La sigla deve essere una lettera compresa tra 'A' e 'E'")
        String siglaPlayer
){
}
