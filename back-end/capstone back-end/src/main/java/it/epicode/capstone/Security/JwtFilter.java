package it.epicode.capstone.Security;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.epicode.capstone.Exceptions.ErrorResponse;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Services.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTools jwtTools;

    @Autowired
    private AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String authorization = request.getHeader("Authorization");
            if (authorization == null) {
                throw new UnauthorizedException("No Access Token");
            } else if (!authorization.startsWith("Bearer ")) {
                throw new UnauthorizedException("Invalid Access Token");
            }
            String token = authorization.split(" ")[1];
            jwtTools.validateToken(token);

            UUID userId = jwtTools.extractUserIdFromToken(token);

            User u = authService.findByUserId(userId).orElseThrow(
                    ()-> new UnauthorizedException("Invalid Access Token")
            );

        }catch (UnauthorizedException e){
            ObjectMapper mapper = new ObjectMapper();
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter()
                    .write(mapper.writeValueAsString(
                            new ErrorResponse(
                                    HttpStatus.UNAUTHORIZED,
                                    "Unathorized",
                                    e.getMessage()
                            )
                    ));
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return new AntPathMatcher().match("/api/auth/**", request.getServletPath())
                | new AntPathMatcher().match("/api/province/**", request.getServletPath())
                || new AntPathMatcher().match("/api/comuni/**", request.getServletPath());
    }
}
