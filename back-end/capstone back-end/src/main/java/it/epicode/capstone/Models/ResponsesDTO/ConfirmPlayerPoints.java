package it.epicode.capstone.Models.ResponsesDTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Tag(name = "Player Points Response")
public class ConfirmPlayerPoints {
    private Timestamp timestamp;
    private int statusCode;
    private String message;

    private Integer points;

    public ConfirmPlayerPoints(String message, int points) {
        this.message = message;
        timestamp = Timestamp.valueOf(LocalDateTime.now());
        statusCode = HttpStatus.ACCEPTED.value();
        this.points = points;
    }
}
