package it.epicode.capstone.Services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    public void sendEmail(String email, String testoSubject, String testoEmail){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(testoSubject);
        message.setText(testoEmail);
    }

}
