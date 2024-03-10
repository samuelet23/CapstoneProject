package it.epicode.capstone.Controllers.OpenApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.DependentSchema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Exceptions.InternalServerErrorException;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.DTO.LoginDTO;
import it.epicode.capstone.Models.DTO.UserDTO;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.ResponsesDTO.AccessTokenRes;
import it.epicode.capstone.Services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "AUTH API (used for endpoints related to authentication )")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Operation(
            description = "Register endpoint for user",
            summary = "This is a summary for register endpoint"

    )
    @PostMapping("/register")
    public User register(@RequestBody @Validated UserDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException {
        System.out.println(userDTO);
        HandlerException.exception(bindingResult);
        return authService.register(userDTO);
    }

    @Operation(
            description = "Login endpoint for user",
            summary = "This is a summary for login endpoint"

    )
    @PostMapping("/login")
    public AccessTokenRes login (@RequestBody @Validated LoginDTO loginDTO, BindingResult bindingResult) throws UnauthorizedException, BadRequestException {
        HandlerException.exception(bindingResult);
        return authService.login(loginDTO.username(), loginDTO.password());
    }
}