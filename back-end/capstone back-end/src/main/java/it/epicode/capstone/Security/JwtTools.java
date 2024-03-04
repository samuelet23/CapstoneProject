package it.epicode.capstone.Security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("application.properties")
public class JwtTools {

    @Value("${access_token.secret}")
    private String secret;
    @Value(("${access_token.expires}"))
    private String expiration;



}
