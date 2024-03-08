package it.epicode.capstone.Config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.core.annotation.Order;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "samuele",
                        email = "samueletoscano@hotmail.com"
                ),
                description = "OpenApi documentation for Easy3vs3 project",
                title = "OpenApi - Easy3vs3",
                version = "1.0",
                termsOfService = "Terms of service"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080"
                ),
                @Server(
                        description = "Prod ENV",
                        url = "http://localhost:8080"
                )
        }
)
@SecurityScheme(
        name = "Easy3vs3Auth",
        description = "Enter the Captain or Manager passwords to attempt all endpoints",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
