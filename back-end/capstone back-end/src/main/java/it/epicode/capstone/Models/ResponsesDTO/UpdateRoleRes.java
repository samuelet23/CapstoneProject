package it.epicode.capstone.Models.ResponsesDTO;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.sql.Timestamp;

public class UpdateRoleRes extends ConfirmRes{

    public UpdateRoleRes(String message, HttpStatus httpStatus, String role) {
        super(message, httpStatus);
    }
}
