package it.epicode.capstone.Models.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record UserDTO (
        @NotBlank(message = "The name field cannot be empty/null")
        @Size(min = 3, message = "Name must be of 3 characters")
        String name,
        @NotBlank(message = "The surname field cannot be empty/null")
        @Size(min = 3,message = "Surname must be of 3 characters")
        String surname,
        @NotBlank(message = "The username field cannot be empty/null")
        @Size(min = 5, message = "Username must be of 5 characters")
        String username,
        @NotBlank(message = "The date Of Birth field cannot be empty/null, the date must be dd/MM/yyyy")
        String dateOfBirth,
        @Email(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "not valid email")
        String email,
        @NotBlank(message = "The password field cannot be empty/null")
        @Size(min = 7, message = "Password must be of 7 characters")
        String password,
        @NotBlank(message = "The confirm password field cannot be empty/null")
        String confirmPassword
) {
}
