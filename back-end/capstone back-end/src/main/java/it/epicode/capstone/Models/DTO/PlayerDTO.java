package it.epicode.capstone.Models.DTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Entities.Team;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PlayerDTO(
        @NotBlank(message = "Il campo nome non può essere vuoto/null")
        @Size(min = 3, message = "Il nome deve essere composto da almeno 3 caratteri")
        String name,

        @NotBlank(message = "Il campo cognome non può essere vuoto/null")
        @Size(min = 3, message = "Il cognome deve essere composto da almeno 3 caratteri")
        String surname,

        @NotBlank(message = "Il campo soprannome non può essere vuoto/null")
        @Size(min = 3, message = "Il soprannome deve essere composto da almeno 3 caratteri")
        String nickname,

        String url,

        @NotBlank(message = "Il campo data di nascita non può essere vuoto/null, la data deve essere nel formato gg-MM-aaaa")
        String dateOfBirth,

        @NotBlank(message = "Il campo sigla non può essere vuoto/null")
        @Pattern(regexp = "[A-E]", message = "La sigla deve essere una lettera compresa tra 'A' e 'E'")
        String sigla

) {
}
