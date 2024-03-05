package it.epicode.capstone.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.epicode.capstone.Models.Entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@PropertySource("application.properties")
public class JwtTools {

    @Value("${access_token.secret}")
    private String secret;
    @Value(("${access_token.expires}"))
    private String expiration;

    public String createToken(User u){
        long currentTimeMills = System.currentTimeMillis();
        return Jwts.builder()
                .subject(u.getId().toString())
                .issuedAt(new Date(currentTimeMills))
                .expiration(new Date(currentTimeMills + Long.parseLong(expiration)))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    public void validateToken(String token){
        try {

        }catch (Exception e){
            throw new
        }
    }


}
