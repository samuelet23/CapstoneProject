package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;

public record LoginDTO (
        @NotBlank(message = "The username field cannot be empty/null")
        String username,
        @NotBlank(message = "The password field cannot be empty/null")
        String password
){
}
