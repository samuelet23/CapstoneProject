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
import it.epicode.capstone.Models.DTO.ResetPassword;
import it.epicode.capstone.Models.DTO.UserDTO;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.ResponsesDTO.AccessTokenRes;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Services.AuthService;
import it.epicode.capstone.Services.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "AUTH ")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userSv;

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
        return authService.login(loginDTO.username(), loginDTO.password() );
    }

    @PutMapping("/forgot-password")
    public ConfirmRes forgotPassword(@RequestParam String email) throws MessagingException, BadRequestException {
        return authService.forgotPassword(email);
    }
    @PutMapping("/set-password")
    public ConfirmRes setPassword(@RequestParam String email, @RequestBody @Validated ResetPassword resetPassword, BindingResult bindingResult) throws BadRequestException {
        HandlerException.badRequestException(bindingResult);
        return authService.setPassword(email,resetPassword);
    }
}
