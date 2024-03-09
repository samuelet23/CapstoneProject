package it.epicode.capstone.Controllers;

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
@Tag(name = "User API")
public class UserController {

    @Autowired
    private UserService userSv;

    @GetMapping("/get/all")
    @PreAuthorize("hasAuthority('MANAGER')")
    public Page<User> getAll(Pageable pageable){
        return userSv.getAll(pageable);
    }
    @GetMapping("/get/{id}")
    public User getUserById(@PathVariable UUID id)throws BadRequestException {
        return userSv.getById(id);
    }
    @GetMapping("/get/username")
    public User getByUsername(@PathVariable String username)throws BadRequestException {
        return userSv.getByUsername(username);
    }
    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('USER,ADMIN')")
    public User createUser(@RequestBody @Validated UserDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException {
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        return userSv.create(userDTO);
    }

    @PutMapping("update/{id}")
    @PreAuthorize("hasAnyAuthority('USER,ADMIN')")
    public ConfirmRes updateUserById(@PathVariable UUID id,@RequestBody @Validated UserUpdateDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException {
        checkUserAuthorization(userDTO.getUsername());
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        userSv.updateById(userDTO, id);
        return new ConfirmRes(
                "User with id: "+id+ " has been updated successfully.",
                HttpStatus.CREATED
        );
    }

    @PutMapping("update/{username}")
    @PreAuthorize("hasAnyAuthority('USER,ADMIN')")
    public ConfirmRes updateUserByUsername(@PathVariable String username,@RequestBody @Validated UserUpdateDTO userDTO, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException {
        checkUserAuthorization(username);
        HandlerException.internalServerErrorException(bindingResult);
        HandlerException.badRequestException(bindingResult);
        userSv.updateByUsername(userDTO, username);
        return new ConfirmRes(
                "User with username: "+username+ " has been updated successfully.",
                HttpStatus.CREATED
        );
    }

    @PatchMapping("update/password/{username}")
    @PreAuthorize("hasAnyAuthority('USER,ADMIN')")
    public ConfirmRes updatePasswordByUsername(@RequestBody @Validated UpdatePasswordDTO updatePasswordDTO,@PathVariable String username, BindingResult bindingResult) throws BadRequestException, InternalServerErrorException, UnauthorizedException {
        checkUserAuthorization(username);
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
    @PreAuthorize("hasAnyAuthority('USER,ADMIN')")
    public ConfirmRes updateUsername(@PathVariable UUID id,@RequestBody @Validated UserUpdateDTO username, BindingResult bindingResult) throws BadRequestException, UnauthorizedException {
        checkUserAuthorization(username.username());
        HandlerException.badRequestException(bindingResult);
        userSv.updateUsername(id, username.username());
        return new ConfirmRes(
                "Username "+username.username()+" has been updated successfully",
                HttpStatus.CREATED
        );
    }
    @PatchMapping("update/{username}/manager")
    @PreAuthorize("hasAuthority('MANAGER')")
    public Role updateRoleToManager(@PathVariable String username, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return userSv.updateRoleManagerByUsername(username);
    }
    @PatchMapping("update/{username}/captain")
    @PreAuthorize("hasAuthority('MANAGER')")
    public Role updateRoleToCaptain(@PathVariable String username, BindingResult bindingResult)throws BadRequestException{
        HandlerException.badRequestException(bindingResult);
        return userSv.updateRoleCaptainByUsername(username);
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('MANAGER')")
    public DeleteRes deleteById(@PathVariable UUID id)throws BadRequestException{
         userSv.deleteById(id);
        return new DeleteRes(
                "User with id: "+id+" has been deleted successfully"
        );
    }
    @DeleteMapping("/delete/{username}")
    @PreAuthorize("hasAuthority('MANAGER')")
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

