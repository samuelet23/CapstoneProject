package it.epicode.capstone.Models.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.Transient;

@Data
@AllArgsConstructor
@Transient
public class PlayerPoint {
    private String playerName;
    private int points;


}
