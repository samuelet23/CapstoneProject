package it.epicode.capstone.Models.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Set;

public record  TournamentDTO (
         @NotBlank(message = "Il nome non può essere vuoto")
         String name,
         @NotBlank(message = "La data di inizio non può essere vuota e deve essere di questo formato dd-mm-aaaa")
         String startDate,
         String coverUrl,


         PlaceDTO place,

         String level
) {
}
