package it.epicode.capstone;

import it.epicode.capstone.Models.ResponsesDTO.AccessTokenRes;
import it.epicode.capstone.Services.AuthService;
import it.epicode.capstone.Services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CapstoneApplication {

	public static void main(String[] args) {
		SpringApplication.run(CapstoneApplication.class, args);

	}

}
