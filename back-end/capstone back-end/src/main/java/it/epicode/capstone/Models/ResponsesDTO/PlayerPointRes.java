package it.epicode.capstone.Models.ResponsesDTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Models.Entities.PlayerPoint;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.*;
import java.util.stream.Collectors;

@Data
@Tag(name = "Player And Points Response")
public class PlayerPointRes {

    private List<PlayerPoint> playerPointsList;

    public PlayerPointRes(List<Object[]> playersWithPoints) {
        playerPointsList = new ArrayList<>();
        for (Object[] result : playersWithPoints) {
            String playerName = (String) result[0];
            int points = (int) result[1];
            playerPointsList.add(new PlayerPoint(playerName, points));
        }

        playerPointsList.sort((p1, p2) -> Integer.compare(p2.getPoints(), p1.getPoints()));

    }
}
