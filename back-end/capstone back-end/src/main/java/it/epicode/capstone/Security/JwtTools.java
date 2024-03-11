package it.epicode.capstone.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.Entities.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
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
    @Getter
    private String expiration;


    public String createToken(User user) {
        long currentTimeMillis = System.currentTimeMillis();
        return Jwts.builder()
                .subject(user.getUsername())
                .issuedAt(new Date(currentTimeMillis))
                .expiration(new Date(currentTimeMillis + Long.parseLong(expiration)))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    public void validationToken(String token) throws UnauthorizedException {
        try {
            Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parse(token);
        } catch (Exception e) {
            throw new UnauthorizedException(e.getMessage());
        }
    }

    public String extractUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();

    }



//    public String createToken(User u) {
//        return Jwts.builder().subject(u.getId().toString()).issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + Long.parseLong(expiration)))
//                .signWith(Keys.hmacShaKeyFor(secret.getBytes())).compact();
//    }
//
//    public void validateToken(String token) throws UnauthorizedException {
//        try {
//            Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
//                    .build().parse(token);
//        } catch (Exception e) {
//            throw new UnauthorizedException("Access token non valido");
//        }
//    }
//
//    public UUID extractUserIdFromToken(String token) throws UnauthorizedException {
//        try{
//            return UUID.fromString(Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build()
//                    .parseSignedClaims(token).getPayload().getSubject());
//        } catch (IllegalArgumentException e) {
//            throw new UnauthorizedException("Access token non valido");
//        }
//    }
//
//    public boolean matchTokenSub(UUID userId) throws UnauthorizedException {
//        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
//        HttpServletRequest req;
//        if (requestAttributes instanceof ServletRequestAttributes) {
//            req = ((ServletRequestAttributes)requestAttributes).getRequest();
//        } else {
//            return false;
//        }
//        String token = req.getHeader("Authorization").split(" ")[1];
//        UUID tokenUserId = extractUserIdFromToken(token);
//        return tokenUserId.equals(userId);
//    }
//
//    public UUID extractUserIdFromReq() throws UnauthorizedException {
//        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
//        HttpServletRequest req;
//        if (requestAttributes instanceof ServletRequestAttributes) {
//            req = ((ServletRequestAttributes)requestAttributes).getRequest();
//        } else
//            throw new UnauthorizedException("Access token non valido");
//        String token = req.getHeader("Authorization").split(" ")[1];
//        return extractUserIdFromToken(token);
//    }
}
