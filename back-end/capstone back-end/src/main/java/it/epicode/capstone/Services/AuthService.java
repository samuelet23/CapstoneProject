package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.InternalServerErrorException;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.DTO.UserDTO;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.ResponsesDTO.AccessTokenRes;
import it.epicode.capstone.Repositories.UserRepository;
import it.epicode.capstone.Security.JwtTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRep;

    private PasswordEncoder encoder;
    @Autowired
    private JwtTools jwtTools;

    public Optional<User> findByUserId(UUID userId){
        return userRep.findById(userId);
    }

    public User register(UserDTO userDTO) throws BadRequestException, InternalServerErrorException {
        User u = new User(
                userDTO.name(),
                userDTO.surname(),
                LocalDate.parse(userDTO.dateOfBirth()),
                userDTO.username(),
                userDTO.email(),
                encoder.encode(userDTO.password()),
                encoder.encode(userDTO.confirmPassword())
        );
        try{
            return userRep.save(u);
        }catch (DataIntegrityViolationException e){
            if (userRep.getAllEmail().contains(u.getEmail())) {
                throw new BadRequestException("email already exists, cannot be created an account");
        }
        if (userRep.getAllUsernames().contains(u.getUsername())){
            throw new BadRequestException("username already exists, cannot be created an account");
        }
        throw new InternalServerErrorException("Data Integrity Violation: " + e.getMessage());
        }
    }

    public AccessTokenRes login(String username, String password) throws BadRequestException, UnauthorizedException {
        User u = userRep.findByUsername(username)
                .orElseThrow(
                        () -> new BadRequestException("Incorrect email/password")
                );
        if (!encoder.matches(password, u.getPassword())) {
            throw new UnauthorizedException("Incorrect email/password");
        }
        return new AccessTokenRes(jwtTools.createToken(u));
    }
}