package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Entities.SuperClass.Competition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record RefereeDTO (
        @NotBlank(message = "The name field cannot be empty/null")
        @Size(min = 3, message = "Name must be of 3 characters")
        String name,
        @NotBlank(message = "The surname field cannot be empty/null")
        @Size(min = 3,message = "Surname must be of 3 characters")
        String surname,
        @NotBlank(message = "Il campo soprannome non può essere vuoto/null")
        @Size(min = 3, message = "Il soprannome deve essere composto da almeno 3 caratteri")
        String nickname,

        @NotBlank(message = "The date Of Birth field cannot be empty/null, the date must be dd/MM/yyyy")
        String dateOfBirth,
        UUID idTournament
){
}
