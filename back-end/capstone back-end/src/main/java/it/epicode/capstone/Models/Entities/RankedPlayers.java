package it.epicode.capstone.Models.Entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class RankedPlayers {

    @Autowired
    private List<Player> players;

    private List<Integer> points = players.stream().map(Player::getPoint).toList();

    private List<Integer> assists = players.stream().map(Player::getAssist).toList();


}
