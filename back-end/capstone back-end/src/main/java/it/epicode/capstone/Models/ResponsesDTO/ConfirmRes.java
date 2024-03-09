package it.epicode.capstone.Models.ResponsesDTO;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Tag(name = "Confirm Response")
public class ConfirmRes {

    private Timestamp timestamp;
    private int statusCode;
    private String message;

    public ConfirmRes(String message, HttpStatus httpStatus) {
        this.message = message;
        timestamp = Timestamp.valueOf(LocalDateTime.now());
        statusCode = httpStatus.value();
    }

}
