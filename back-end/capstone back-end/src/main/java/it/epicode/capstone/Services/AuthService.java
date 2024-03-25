package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.InternalServerErrorException;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.DTO.UserDTO;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Models.ResponsesDTO.AccessTokenRes;
import it.epicode.capstone.Repositories.UserRepository;
import it.epicode.capstone.Security.JwtTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRep;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private JwtTools jwtTools;

    public Optional<User> findByUserId(UUID userId){
        return userRep.findById(userId);
    }
    public Optional<User> findByUsername(String username){
        return userRep.findByUsername(username);
    }

    public User register(UserDTO userDTO) throws BadRequestException, InternalServerErrorException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        User u = new User(
                userDTO.name(),
                userDTO.surname(),
                LocalDate.parse(userDTO.dateOfBirth(), formatter),
                Role.valueOf(userDTO.role()),
                userDTO.username(),
                userDTO.email(),
                encoder.encode(userDTO.password()),
                encoder.encode(userDTO.confirmPassword())
        );

        if (encoder.matches(userDTO.password(), userDTO.confirmPassword())) {
            throw new BadRequestException("Le password non coincidono");
        }
        try{
            return userRep.save(u);
        }catch (DataIntegrityViolationException e){
            if (userRep.getAllEmails().contains(u.getEmail())) {
                throw new BadRequestException("email già esistente, non si può creare un accounnt. Riprova");
        }
        if (userRep.getAllUsernames().contains(u.getUsername())){
            throw new BadRequestException("username già esistente, non si può creare un account. Riprova");
        }
        throw new InternalServerErrorException("Data Integrity Violation: " + e.getMessage());
        }
    }
    public void registerUser(UserDTO userDTO) throws BadRequestException, InternalServerErrorException {
        User u =register(userDTO);
        u.setRole(Role.USER);
    }
    public void registerCoordinator(UserDTO userDTO) throws BadRequestException, InternalServerErrorException {
        User u =register(userDTO);
        u.setRole(Role.COORDINATOR);
    }
    public void registerManager(UserDTO userDTO) throws BadRequestException, InternalServerErrorException {
        User u =register(userDTO);
        u.setRole(Role.MANAGER);
    }




    public AccessTokenRes login(String username, String password) throws BadRequestException, UnauthorizedException {
        User u = userRep.findByUsername(username)
                .orElseThrow(
                        () -> new BadRequestException("passowrd o username errati")
                );
        if (!encoder.matches(password, u.getPassword())) {
            throw new UnauthorizedException("passowrd o username errati");
        }
        return new AccessTokenRes(jwtTools.createToken(u), String.valueOf(u.getDateOfBirth()),u.getName(), String.valueOf(u.getRole()), u.getSurname(), u.getUsername());
    }




}
