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
        @NotBlank(message = "Il campo Via non può essere vuoto o nullo")
        String via,

        @NotBlank(message = "Il campo Civico non può essere vuoto o nullo")
        String civico,

        @Pattern(regexp = "\\d{5}", message = "Il CAP deve essere composto da 5 cifre")
        String cap,

        @NotBlank(message = "Il campo Nome Città non può essere vuoto o nullo")
        String townName,

        @NotBlank(message = "Il campo Sigla Provincia non può essere vuoto o nullo")
        @Pattern(regexp = "[A-Z]{2}", message = "La Sigla della Provincia deve essere composta da 2 caratteri maiuscoli")
        String  siglaProvince

) {
}
