package it.epicode.capstone.Models.ResponsesDTO;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
public class UploadConfirm {

    private Timestamp timestamp;
    private HttpStatus httpStatus;
    private String message;
    private String url;

    public UploadConfirm(String message, String url) {
        this.message = message;
        timestamp = Timestamp.valueOf(LocalDateTime.now());
        httpStatus = HttpStatus.CREATED;
        this.url = url;
    }
}
