package it.epicode.capstone.Models.ResponsesDTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Tag(name = "Player And Points Response")
public class PlayerPointRes {

    private String message;
    private Map<String, Integer> playersPoints;
    private HttpStatus httpStatus;
    public PlayerPointRes(String message, List<Object[]> playersWithPoints) {
        playersPoints = new HashMap<>();
        for (Object[] result : playersWithPoints) {
            String playerName = (String) result[0];
            int points = (int) result[1];
            playersPoints.put(playerName, points);
        }
        this.message = message;
        this.httpStatus = HttpStatus.ACCEPTED;
    }
}
