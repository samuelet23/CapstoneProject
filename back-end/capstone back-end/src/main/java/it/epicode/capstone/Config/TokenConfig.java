package it.epicode.capstone.Config;

import io.jsonwebtoken.security.Password;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.InternalServerErrorException;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.DTO.UserDTO;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.ResponsesDTO.AccessTokenRes;
import it.epicode.capstone.Repositories.UserRepository;
import it.epicode.capstone.Services.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Order(1)
public class TokenConfig implements CommandLineRunner {

    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRp;

    @Override
    public void run(String... args) throws Exception {
        UserDTO managerDTO = new UserDTO(
                "manager",
                "manager",
                "manager1",
                "23/11/2000",
                "manager@gmail.com",
                "MANAGER",
                "manager",
                "manager"
        );

        generateManagerToken(managerDTO);


        UserDTO captainDTO = new UserDTO(
                "captain",
                "captain",
                "captain1",
                "23/11/2000",
                "captain@gmail.com",
                "CAPTAIN",
                "captain",
                "captain"
        );

        generateCaptainToken(captainDTO);
    }

    private void generateManagerToken(UserDTO managerDTO) throws UnauthorizedException, BadRequestException, InternalServerErrorException {
        try {
            AccessTokenRes accessTokenRes = authService.login(managerDTO.username(), managerDTO.password());
            System.out.println("Manager Token: " + accessTokenRes.getAccessToken());
        } catch (BadRequestException | UnauthorizedException e) {
            authService.registerManager(managerDTO);
            AccessTokenRes accessTokenRes = authService.login(managerDTO.username(), managerDTO.password());
            System.out.println("Manager Token: "+ accessTokenRes.getAccessToken());
        }
    }

    private void generateCaptainToken(UserDTO captainDTO) throws UnauthorizedException, BadRequestException, InternalServerErrorException {
       try {
        AccessTokenRes accessTokenRes = authService.login(captainDTO.username(), captainDTO.password());
        System.out.println("Captain Token: " + accessTokenRes.getAccessToken());
    } catch (BadRequestException | UnauthorizedException e) {
        authService.registerCaptain(captainDTO);
        AccessTokenRes accessTokenRes = authService.login(captainDTO.username(), captainDTO.password());
        System.out.println("Captain Token: " + accessTokenRes.getAccessToken());
    }
    }






};


