package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DuringGameDTO(
        @NotBlank(message = "home points field cannot be empty/null")
        @Size(max = 149, message = "isn't NBA")
        int homePoints,
        @NotBlank(message = "away points field cannot be empty/null")
        @Size(max = 149, message = "isn't NBA")
        int awayPoints

) {
}
