package it.epicode.capstone.Models.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Entities.Town;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
public record AddressDTO(
        @NotBlank(message = "The via field cannot be empty/null")
        String via,

        @NotBlank(message = "The civico field cannot be empty/null")
        String civico,

        @Pattern(regexp = "[A-Z]{5}", message = "Cap must be of 5 characters")
        int cap,
        @NotBlank(message = "The password field cannot be empty/null")
        String townName,
        @NotBlank(message = "The password field cannot be empty/null")
        @Pattern(regexp = "[A-Z]{2}", message = "Sigla of Province must be of 2 characters")
        String  siglaProvince
) {
}
