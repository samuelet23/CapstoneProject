package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.InternalServerErrorException;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.DTO.ResetPassword;
import it.epicode.capstone.Models.DTO.UserDTO;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Models.ResponsesDTO.AccessTokenRes;
import it.epicode.capstone.Models.ResponsesDTO.ConfirmRes;
import it.epicode.capstone.Repositories.UserRepository;
import it.epicode.capstone.Security.JwtTools;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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
    private UserService userSv;
    @Autowired
    private MailService mailSv;
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
           User u = userSv.create(userDTO);
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


    public ConfirmRes forgotPassword(String email) throws BadRequestException, MessagingException {
       User u = userRep.findByEmail(email).orElseThrow(() -> new BadRequestException("Email: "+email+" inesistente"));
        mailSv.sendSetPasswordEmail(email);
        return new ConfirmRes("Controlla la tua email per reimpostare la password del tuo account.",
                    HttpStatus.OK);
    }

    public ConfirmRes setPassword(String email, ResetPassword resetPassword) throws BadRequestException {
        User u = userRep.findByEmail(email).orElseThrow(() -> new BadRequestException("Email: "+email+" inesistente"));
        u.setPassword(encoder.encode(resetPassword.newPassword()));
        u.setConfirmPassword(encoder.encode(resetPassword.confirmNewPassword()));
        matchPassowrd(u.getPassword(), u.getConfirmPassword());
        userRep.save(u);
        return new ConfirmRes("La nuova password è stata reimpostata correttamente",
                HttpStatus.OK);
    }

    private void matchPassowrd(String password, String confirmPassowrd) throws BadRequestException {
        if (encoder.matches(password, confirmPassowrd)) {
            throw new BadRequestException("Le passowrd non coincidono");
        }
    }
}
