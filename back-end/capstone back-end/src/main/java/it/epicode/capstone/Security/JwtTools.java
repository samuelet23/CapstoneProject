package it.epicode.capstone.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.Entities.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

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

    public void validateToken(String token) throws UnauthorizedException {
        try {
            Jwts
                .parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parse(token);
        }catch (Exception e){
            throw new UnauthorizedException("Invalid Access Token");
        }
    }

    public UUID extractUserIdFromToken(String token)throws UnauthorizedException{
        try {
            return UUID
                    .fromString(Jwts.parser()
                                    .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                                    .build()
                                    .parseSignedClaims(token)
                                    .getPayload()
                                    .getSubject());
        }catch (IllegalArgumentException e){
            throw new UnauthorizedException("Invalid Access Token");
        }
    }

    public boolean matchTokenSub(UUID userId) throws UnauthorizedException {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        HttpServletRequest req;
        if (requestAttributes instanceof ServletRequestAttributes) {
            req = ((ServletRequestAttributes)requestAttributes).getRequest();
        } else {
            return false;
        }
        String token = req.getHeader("Authorization").split(" ")[1];
        UUID tokenUserId = extractUserIdFromToken(token);
        return tokenUserId.equals(userId);
    }

    public UUID extractUserIdFromReq() throws UnauthorizedException {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        HttpServletRequest req;
        if (requestAttributes instanceof ServletRequestAttributes) {
            req = ((ServletRequestAttributes)requestAttributes).getRequest();
        } else
            throw new UnauthorizedException("Access token non valido");
        String token = req.getHeader("Authorization").split(" ")[1];
        return extractUserIdFromToken(token);
    }
}
