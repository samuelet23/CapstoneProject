package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPassword(
        @NotBlank(message = "La password da reimpostare non può essere vuota")
        @Size(min = 7 ,message = "La password deve essere di almeno 7 caratteri")
        String newPassword,
        @NotBlank(message = "La password di conferma non può essere vuota")
        @Size(min = 7 ,message = "La password di conferma deve essere di almeno 7 caratteri")
        String confirmNewPassword
) {
}
