package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdateDTO(
        @NotBlank(message = "Il campo dell'username non può essere vuoto")
        @Size(min = 5, message = "L'username deve essere di 5 caratteri")
        String username,
        @Email(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Email non valida")
        String email,
        @NotBlank(message = "Il campo del nome non può essere vuoto")
        @Size(min = 3, message = "Il nome deve essere di almeno 3 caratteri")
        String name,
        @NotBlank(message = "Il campo del cognome non può essere vuoto")
        @Size(min = 3,message = "Il cognome deve essere di almeno 3 caratteri")
        String surname,

        @NotBlank(message = "Il campo della data di nascita non può essere vuoto")
        @Size(min = 3,message = "La data di nascita deve essere di almeno 3 caratteri")
        String dateOfBirth
) {
}
