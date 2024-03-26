package it.epicode.capstone.Services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String email, String testoSubject, String testoEmail){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("easy3vs3@gmail.com");
        message.setTo(email);
        message.setSubject(testoSubject);
        message.setText(testoEmail);

        mailSender.send(message);
        System.out.println("Mail sent..");
    }


    public void sendSetPasswordEmail(String email) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("RESET PASSWORD EASY 3vs3");
        mimeMessageHelper.setText("""
                Ehi, amico! Abbiamo una piccola cosa da sistemare per te. Ci piace tenere le tue informazioni sicure, quindi abbiamo pensato di darti una mano con la reimpostazione della password. Qui sotto troverai un link che ti porterà dritto alla pagina dove potrai cambiare la password del tuo account. Sii sicuro di cliccare sul link quando sei pronto e non preoccuparti, siamo qui per aiutarti in ogni passo del processo!
               Grazie mille per la tua collaborazione. Non vediamo l'ora di rivederti in campo!
                <div>
                    <a href="http://localhost:8080/set-password?email=%s"_blank"> Reimposta la Pssword
                </div>
                
                """.formatted(email), true);

        mailSender.send(message);
    }

}
