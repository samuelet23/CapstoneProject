package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.NotBlank;

public record UpdatePasswordDTO(
        @NotBlank(message = "The oldPassword field cannot be empty/null")
        String oldPassword,
        @NotBlank(message = "The newPassword field cannot be empty/null")
        String newPassword,
        @NotBlank(message = "The newConfirmPassword field cannot be empty/null")
        String newConfirmPassword
) {
}
