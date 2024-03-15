package it.epicode.capstone.Models.ResponsesDTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Tag(name = "Access Token Response")
public class AccessTokenRes {
    private String accessToken;
    private String dateOfBirth;
    private String name;
    private String role;
    private String surname;
    private String username;
}
