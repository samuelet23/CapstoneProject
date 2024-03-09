package it.epicode.capstone.Models.ResponsesDTO;

import it.epicode.capstone.Models.Entities.Game;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class RoundsGeneratedRes {
    private Timestamp timestamp;
    private HttpStatus httpStatus;
    private String message;
    private List<Game> games;

    public RoundsGeneratedRes(String message, List<Game> games) {
        this.message = message;
        this.games = games;
        this.timestamp = Timestamp.valueOf(LocalDateTime.now());
        this.httpStatus = HttpStatus.CREATED;
    }
}
