package it.epicode.capstone.Services;

import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.InternalServerErrorException;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.DTO.UpdatePasswordDTO;
import it.epicode.capstone.Models.DTO.UserDTO;
import it.epicode.capstone.Models.DTO.UserUpdateDTO;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRp;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private MailService mailService;

    public List<User> getAll(){
        return userRp.findAll();
    }

    public User getById(UUID id)throws BadRequestException{
        return userRp.findById(id).orElseThrow(
                () -> new BadRequestException("id : "+ id+" non esiste")
        );
    }
    public User getByUsername(String username)throws BadRequestException{
        return userRp.findByUsername(username).orElseThrow(
                () -> new BadRequestException("username: "+ username+"  non esiste")
        );
    }public User getByEmail(String email)throws BadRequestException{
        return userRp.findByEmail(email).orElseThrow(
                () -> new BadRequestException("l'email: "+ email +" non esiste ")
        );
    }

    public User create (UserDTO user) throws BadRequestException, InternalServerErrorException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        User u = new User();
        u.setName(user.name());
        u.setSurname(user.surname());
        u.setDateOfBirth(LocalDate.parse(user.dateOfBirth(), formatter));
        u.setUsername(user.username());
        u.setAge(calculateAge(u.getDateOfBirth()));
        u.setEmail(user.email());
        u.setLogoProfile(user.url());
        u.setRole(Role.USER);
        u.setPassword(encoder.encode(user.password()));
        u.setConfirmPassword(encoder.encode(user.confirmPassword()));
        u.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        matchPassowrd(user.password(), user.confirmPassword());
        try {
            userRp.save(u);
            mailService.sendEmail(
                    u.getEmail(),
                    "ISCRIZIONE EFFETTUATA CON SUCCESSO",
                    "Benvenuto " + u.getName() + ", ti diamo il benvenuto in Easy 3vs3 la piattaforma online, che ti permetterà di guardare, partecipare e scoprire tutti i tornei presenti in italia di 3 vs 3"
            );
        } catch (DataIntegrityViolationException e) {
            if (userRp.getAllEmails().contains(u.getEmail()))
                throw new BadRequestException("Email Already Exists, impossible to create");
            if (userRp.getAllUsernames().contains(u.getUsername()))
                throw new BadRequestException("Username Already Exists, impossible to create");
            throw new InternalServerErrorException("Data integrity violation error: " + e.getMessage());
        }
        return u;
    }

    public void updateById(UserUpdateDTO user, UUID id) throws BadRequestException, InternalServerErrorException {
        User u = getById(id);
        updateUserInformation(u, user);
    }
    public User updateByUsername(UserUpdateDTO user, String username) throws BadRequestException, InternalServerErrorException {
        User u = getByUsername(username);
        updateUserInformation(u, user);
        return u;
    }

    public void updatePasswordByUsername(UpdatePasswordDTO updatePasswordDTO, String username) throws UnauthorizedException, BadRequestException, InternalServerErrorException {

        User user = getByUsername(username);

        if (encoder.matches(updatePasswordDTO.oldPassword(), user.getPassword())) {
            throw new UnauthorizedException("La Vecchia password non è corretta. Impossibile aggiornare");
        }
        user.setPassword(encoder.encode(updatePasswordDTO.newPassword()));
        user.setConfirmPassword(encoder.encode(updatePasswordDTO.newConfirmPassword()));

        matchPassowrd(user.getPassword(), user.getConfirmPassword());
        emailManagement(user);
        userRp.save(user);

    }

    public void updateUsername(UUID id, String username) throws BadRequestException {
        User u = getById(id);
        u.setUsername(username);
        List<String> usernames = userRp.getAllUsernames();
        if (usernames.contains(username)) {
            throw new BadRequestException("Username already exists, Impossible to update");
        }
        userRp.save(u);
    }

    public Role updateRoleManagerByUsername(String username) throws BadRequestException {
        User u = getByUsername(username);
        if (u.getRole() == Role.MANAGER) {
            throw new BadRequestException("The role is already MANAGER");
        }
        u.setRole(Role.MANAGER);
        userRp.save(u);
        return u.getRole();
    }
    public Role updateRoleCoordinatorByUsername(String username) throws BadRequestException {
        User u = getByUsername(username);
        if (u.getRole() == Role.COORDINATOR) {
            throw new BadRequestException("The role is already COORDINATOR");
        }
        u.setRole(Role.COORDINATOR);
         userRp.save(u);
        return u.getRole();
    }
    public Role updateRoleUserByUsername(String username) throws BadRequestException {
        User u = getByUsername(username);
        if (u.getRole() == Role.USER) {
            throw new BadRequestException("The role is already USER");
        }
        u.setRole(Role.USER);
         userRp.save(u);
        return u.getRole();
    }

    public void uploadProfileImg(String url, String username)throws BadRequestException{
        User u = getByUsername(username);
        u.setLogoProfile(url);
        userRp.save(u);
    }

    public void deleteById(UUID id) throws BadRequestException {
        User u = getById(id);
        userRp.delete(u);
    }
    public void deleteByUsername(String username) throws BadRequestException {
        User u = getByUsername(username);
        userRp.delete(u);
    }





    private void updateUserInformation(User u, UserUpdateDTO user) throws BadRequestException, InternalServerErrorException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

        u.setName(user.name());
        u.setSurname(user.surname());
        u.setEmail(user.email());
        u.setUsername(user.username());
        u.setDateOfBirth(LocalDate.parse(user.dateOfBirth(), formatter));
        userRp.save(u);
        emailManagement(u);
    }

    private void emailManagement(User u) throws BadRequestException, InternalServerErrorException {
        try {
            mailService.sendEmail(
                    u.getEmail(),
                    "MODIFICA EFFETTUATA CON SUCCESSO",
                    "Ciao" + u.getName() + ", hai modificato il tuo account con successo"
            );
        } catch (DataIntegrityViolationException e) {
            if (userRp.getAllUsernames().contains(u.getUsername()) || userRp.getAllEmails().contains(u.getEmail()))
                throw new BadRequestException("Il nome utente e/o la password che hai impostato esistono già. Impossibile aggiornare");
            throw new InternalServerErrorException("Data integrity violation error: " + e.getMessage());
        }
    }


    private void matchPassowrd(String password, String confirmPassowrd) throws BadRequestException {
        if (encoder.matches(password, confirmPassowrd)) {
            throw new BadRequestException("Le password non coincidono");
        }
    }
    private int calculateAge(LocalDate dateOfBirth)  {
        LocalDate now = LocalDate.now();
        if (dateOfBirth == null) {
            throw new IllegalArgumentException("Data di nascita non valida");
        }

        Period period = Period.between(dateOfBirth, now);

        int years = period.getYears();
        int month = period.getMonths();

        if (month < 0) {
            years--;
        }
        if (years < 14) {
            throw new RuntimeException("Sei ancora troppo piccolo per giocare questo torneo");
        }

        return years;
    }


}
