package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AddPointsDTO (
        @NotBlank(message = "You must add some points")
        @Size(max = 3, message = "You can add maximum 3 points")
        int pointToAdd,
        @NotBlank(message = "siglaPlayer field cannot be empty/null")
        String siglaPlayer
){
}
