package it.epicode.capstone.Models.DTO;

import it.epicode.capstone.Models.Entities.Team;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PlayerDTO(
        @NotBlank(message = "The name field cannot be empty/null")
        @Size(min = 3, message = "Name must be of 3 characters")
        String name,
        @NotBlank(message = "The surname field cannot be empty/null")
        @Size(min = 3,message = "Surname must be of 3 characters")
        String surname,
        @NotBlank(message = "The date Of Birth field cannot be empty/null, the date must be dd/MM/yyyy")
        String dateOfBirth

) {
}
