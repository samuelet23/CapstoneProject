package it.epicode.capstone.Security;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.epicode.capstone.Exceptions.BadRequestException;
import it.epicode.capstone.Exceptions.ErrorResponse;
import it.epicode.capstone.Exceptions.UnauthorizedException;
import it.epicode.capstone.Models.Entities.User;
import it.epicode.capstone.Models.Enums.Role;
import it.epicode.capstone.Services.AuthService;
import it.epicode.capstone.Services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTools jwtTools;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String authorization = request.getHeader("Authorization");
            if (authorization == null) {
                throw new UnauthorizedException("No Access Token");
            } else if (!authorization.startsWith("Bearer ")) {
                throw new UnauthorizedException("Invalid Access Token Bearer");
            }
            String token = authorization.split(" ")[1];
            jwtTools.validationToken(token);

            String username = jwtTools.extractUsernameFromToken(token);

            User u = userService.getByUsername(username);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(u, null,u.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);


        }catch (UnauthorizedException | BadRequestException e){
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
                || new AntPathMatcher().match("/api/open/**", request.getServletPath())
                || new AntPathMatcher().match("/api/user/get/all", request.getServletPath())
                || new AntPathMatcher().match("/v2/api-docs", request.getServletPath())
                || new AntPathMatcher().match("/swagger-ui/**", request.getServletPath())
                || new AntPathMatcher().match("/v3/api-docs", request.getServletPath())
                || new AntPathMatcher().match("/v3/api-docs/**", request.getServletPath())
                || new AntPathMatcher().match("/swagger-resources", request.getServletPath())
                || new AntPathMatcher().match("/swagger-resources/**", request.getServletPath())
                || new AntPathMatcher().match("/configuration/ui", request.getServletPath())
                || new AntPathMatcher().match("/configuration/security", request.getServletPath())
                || new AntPathMatcher().match("/webjars/**", request.getServletPath())
                || new AntPathMatcher().match("/swagger-ui.html", request.getServletPath());
    }
}
