package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record UserDTO (
        @NotBlank(message = "Il campo nome non può essere vuoto/null")
        @Size(min = 3, message = "Il nome deve essere di almeno 3 caratteri")
        String name,
        @NotBlank(message = "Il campo cognome non può essere vuoto/null")
        @Size(min = 3, message = "Il cognome deve essere di almeno 3 caratteri")
        String surname,
        @NotBlank(message = "Il campo nome utente non può essere vuoto/null")
        @Size(min = 5, message = "Il nome utente deve essere di almeno 5 caratteri")
        String username,
        @NotBlank(message = "Il campo data di nascita non può essere vuoto/null, la data deve essere in formato gg/MM/aaaa")
        String dateOfBirth,
        @Email(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Email non valida")
        String email,
        String role,

        String url,

        @NotBlank(message = "Il campo password non può essere vuoto/null")
        @Size(min = 7, message = "La password deve essere di almeno 7 caratteri")
        String password,
        @NotBlank(message = "Il campo conferma password non può essere vuoto/null")
        String confirmPassword
) {}

