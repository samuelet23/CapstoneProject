package it.epicode.capstone.Models.ResponsesDTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Tag(name = "Access Token Response")
public class AccessTokenRes {
    private String accessToken;
    private String role;
}
