package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserUpdateDTO(
        @NotBlank(message = "The username field cannot be empty/null")
        String username,
        @Email(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "not valid email")
        String email,
        @NotBlank(message = "The name field cannot be empty/null")
        String name,
        @NotBlank(message = "The surname field cannot be empty/null")
        String surname
) {
}