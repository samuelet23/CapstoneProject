package it.epicode.capstone.Controllers.UserApi;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.HandlerException;
import it.epicode.capstone.Exceptions.InternalServerErrorException;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.DTO.UpdatePasswordDTO;
import it.epicode.capstone.Models.DTO.UserDTO;
import it.epicode.capstone.Models.DTO.UserUpdateDTO;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Services.UserService;
import org.hibernate.sql.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@Tag(name = "USER API (accessible with normal authentication)")
@SecurityRequirement(name = "Easy3vs3Auth")
@PreAuthorize("hasAuthority('MANAGER')")
public class UserController {

    @Autowired
    private UserService userSv;



    @PostMapping("/create")
    @Operation(
            description = "Create a new user.",
            summary = "Create user"
    )
    public User createUser(@RequestBody @Validated UserDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException {
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        return userSv.create(userDTO);
    }

    @PutMapping("update/{id}")
    @Operation(
            description = "Update a user by their unique identifier.",
            summary = "Update user by ID"
    )
    public ConfirmRes updateUserById(@PathVariable UUID id,@RequestBody @Validated UserUpdateDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException, UnauthorizedException {
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        userSv.updateById(userDTO, id);
        return new ConfirmRes(
                "User with id: "+id+ " has been updated successfully.",
                HttpStatus.CREATED
        );
    }

    @PutMapping("update/{username}")
    @Operation(
            description = "Update a user by their username.",
            summary = "Update user by username"
    )
    public ConfirmRes updateUserByUsername(@PathVariable String username,@RequestBody @Validated UserUpdateDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException, UnauthorizedException {
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        userSv.updateByUsername(userDTO, username);
        return new ConfirmRes(
                "User with username: "+username+ " has been updated successfully.",
                HttpStatus.CREATED
        );
    }

    @PatchMapping("update/password/{username}")
    @Operation(
            description = "Update a user's password by their username.",
            summary = "Update user's password by username"
    )
    public ConfirmRes updatePasswordByUsername(@RequestBody @Validated UpdatePasswordDTO updatePasswordDTO,@PathVariable String username, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException, UnauthorizedException {
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.unathorizedException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        userSv.updatePasswordByUsername(updatePasswordDTO, username);
        return new ConfirmRes(
                "Password for user with username: "+username+ " has been updated successfully.",
                HttpStatus.CREATED
        );
    }

    @PatchMapping("update/username/{id}")
    @Operation(
            description = "Update a user's username by their unique identifier.",
            summary = "Update user's username by ID"
    )
    public ConfirmRes updateUsername(@PathVariable UUID id,@RequestBody @Validated UserUpdateDTO username, BindingResult bindingResult) throws BadRequestException, UnauthorizedException {
        HandlerException.badRequestException(bindingResult);
        userSv.updateUsername(id, username.username());
        return new ConfirmRes(
                "Username "+username.username()+" has been updated successfully",
                HttpStatus.CREATED
        );
    }

    @PatchMapping("update/{username}/manager")
    @Operation(
            description = "Update a user's role to manager by their username.",
            summary = "Update user's role to manager by username"
    )
    public Role updateRoleToManager(@PathVariable String username, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return userSv.updateRoleManagerByUsername(username);
    }

    @PatchMapping("update/{username}/captain")
    @Operation(
            description = "Update a user's role to captain by their username.",
            summary = "Update user's role to captain by username"
    )
    public Role updateRoleToCaptain(@PathVariable String username, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return userSv.updateRoleCaptainByUsername(username);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            description = "Delete a user by their unique identifier.",
            summary = "Delete user by ID"
    )
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        userSv.deleteById(id);
        return new DeleteRes(
                "User with id: "+id+" has been deleted successfully"
        );
    }

    @DeleteMapping("/delete/{username}")
    @Operation(
            description = "Delete a user by their username.",
            summary = "Delete user by username"
    )
    public DeleteRes deleteByUsername(@PathVariable String username)throws BadRequestException{
        userSv.deleteByUsername(username);
        return new DeleteRes(
                "User with username: "+username+" has been deleted successfully"
        );
    }


    private void checkUserAuthorization(String targetUsername) throws UnauthorizedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authenticatedUsername = authentication.getName();

        if (!authenticatedUsername.equals(targetUsername) && !authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ADMIN"))) {
            throw new UnauthorizedException("You are not authorized to perform this action");
        }
    }
}

