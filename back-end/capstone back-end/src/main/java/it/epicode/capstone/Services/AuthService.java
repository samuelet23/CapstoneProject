package it.epicode.capstone.Services;

import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Repositories.UserRepository;
import it.epicode.capstone.Security.JwtTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

}
