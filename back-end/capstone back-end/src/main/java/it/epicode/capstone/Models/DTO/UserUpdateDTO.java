package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdateDTO(
        @NotBlank(message = "The username field cannot be empty/null")
        @Size(min = 5, message = "Username must be of 5 characters")
        String username,
        @Email(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Not Valid Email")
        String email,
        @NotBlank(message = "The name field cannot be empty/null")
        @Size(min = 3, message = "Name must be of 3 characters")
        String name,
        @NotBlank(message = "The surname field cannot be empty/null")
        @Size(min = 3,message = "Surname must be of 3 characters")
        String surname
) {
}
