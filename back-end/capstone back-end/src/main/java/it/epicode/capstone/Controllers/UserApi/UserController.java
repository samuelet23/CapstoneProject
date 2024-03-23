package it.epicode.capstone.Controllers.UserApi;

import com.cloudinary.Cloudinary;
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
import it.epicode.capstone.Models.Entities.Team;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Models.ResponsesDTO.DeleteRes;
import it.epicode.capstone.Models.ResponsesDTO.UpdateRoleRes;
import it.epicode.capstone.Models.ResponsesDTO.UploadConfirm;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@Tag(name = "USER")
@SecurityRequirement(name = "Easy3vs3Auth")
public class UserController {

    @Autowired
    private UserService userSv;
    @Autowired
    private Cloudinary cloudinary;


    @PostMapping("/create")
    @Operation(
            description = "Create a new user.",
            summary = "Create user"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public User createUser(@RequestBody @Validated UserDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException {
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        return userSv.create(userDTO);
    }

    @PutMapping("/update/byId/{id}")
    @Operation(
            description = "Update a user by their unique identifier.",
            summary = "Update user by ID"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public ConfirmRes updateUserById(@PathVariable UUID id,@RequestBody @Validated UserUpdateDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException, UnauthorizedException {
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        userSv.updateById(userDTO, id);
        return new ConfirmRes(
                "User: "+id+ " è stato modificato con successo.",
                HttpStatus.CREATED
        );
    }

    @PutMapping("/update/byUsername/{username}")
    @Operation(
            description = "Update a user by their username.",
            summary = "Update user by username"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public User updateUserByUsername(@PathVariable String username,@RequestBody @Validated UserUpdateDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException, UnauthorizedException {
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.badRequestException(bindingResult);
       return userSv.updateByUsername(userDTO, username);

    }

    @PatchMapping("/update/password/{username}")
    @Operation(
            description = "Update a user's password by their username.",
            summary = "Update user's password by username"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public ConfirmRes updatePasswordByUsername(@RequestBody @Validated UpdatePasswordDTO updatePasswordDTO,@PathVariable String username, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException, UnauthorizedException {
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.unathorizedException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        userSv.updatePasswordByUsername(updatePasswordDTO, username);
        return new ConfirmRes(
                "Password per utente: "+username+ " è stata modificata con successo",
                HttpStatus.CREATED
        );
    }

    @PatchMapping("/update/username/{id}")
    @Operation(
            description = "Update a user's username by their unique identifier.",
            summary = "Update user's username by ID"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public ConfirmRes updateUsername(@PathVariable UUID id,@RequestBody String username, BindingResult bindingResult) throws BadRequestException, UnauthorizedException {
        HandlerException.badRequestException(bindingResult);
        if (username.isEmpty()) {
            throw new BadRequestException("Il campo non può essere vuoto");
        } else if (username.length() <  5) {
            throw new BadRequestException("Il nome utente deve essere di almeno 5 caratteri");
        }
        userSv.updateUsername(id, username);
        return new ConfirmRes(
                "Username "+username+" è stato modificato con successo ",
                HttpStatus.CREATED
        );
    }


    @PatchMapping("/update/{username}/manager")
    @Operation(
            description = "Update a user's role to manager by their username.",
            summary = "Update user's role to manager by username"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public UpdateRoleRes updateRoleToManager(@PathVariable String username)throws BadRequestException{
       Role role =  userSv.updateRoleManagerByUsername(username);
        return new UpdateRoleRes(
                "Il ruolo di "+username+" è stato modificato con successo a Organizzatore",
                HttpStatus.CREATED,
                "Il ruolo ora è "+ role
        );
    }

    @PatchMapping("/update/{username}/captain")
    @Operation(
            description = "Update a user's role to captain by their username.",
            summary = "Update user's role to captain by username"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public UpdateRoleRes updateRoleToCaptain(@PathVariable String username)throws BadRequestException{
        Role role = userSv.updateRoleCaptainByUsername(username);
        return new UpdateRoleRes(
                "Il ruolo di "+username+" è stato modificato con successo a Capitano",
                HttpStatus.CREATED,
                "Il ruolo ora è "+ role
        );
    }
    @PatchMapping("/update/{username}/user")
    @Operation(
            description = "Update a user's role to user by their username.",
            summary = "Update user's role to user by username"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public UpdateRoleRes updateRoleToUser(@PathVariable String username)throws BadRequestException{
        Role role = userSv.updateRoleUserByUsername(username);
        return new UpdateRoleRes(
                "Il ruolo di"+username+" è stato modificato con successo a User",
                HttpStatus.CREATED,
                "Il ruolo adesso è "+ role
        );
    }

    @DeleteMapping("/delete/byId/{id}")
    @Operation(
            description = "Delete a user by their unique identifier.",
            summary = "Delete user by ID"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
        userSv.deleteById(id);
        return new DeleteRes(
                "User: "+id+" è stato eliminato correttamente"
        );
    }

    @DeleteMapping("/delete/byUsername/{username}")
    @Operation(
            description = "Delete a user by their username.",
            summary = "Delete user by username"
    )
    @PreAuthorize("hasAuthority('MANAGER')")
    public DeleteRes deleteByUsername(@PathVariable String username)throws BadRequestException{
        userSv.deleteByUsername(username);
        return new DeleteRes(
                "User: "+username+" è stato eliminato correttamente"
        );
    }


    private void checkUserAuthorization(String targetUsername) throws UnauthorizedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authenticatedUsername = authentication.getName();

        if (!authenticatedUsername.equals(targetUsername) && !authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ADMIN"))) {
            throw new UnauthorizedException("Non sei autorizzato!");
        }
    }
}

