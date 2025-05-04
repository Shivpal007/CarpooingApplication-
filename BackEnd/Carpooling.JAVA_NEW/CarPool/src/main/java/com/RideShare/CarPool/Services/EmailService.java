package com.RideShare.CarPool.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendEmail(String to, String subject, String body) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject(subject);
//        message.setText(body);
//        mailSender.send(message);
//    }
	
	
	
	@Autowired
	private JavaMailSender mailSender;

	public void sendEmail(String to, String subject, String body) {
	    try {
	        MimeMessage message = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        
	        helper.setFrom("carpooling1304@gmail.com", "Carpooling");
	        helper.setTo(to);
	        helper.setSubject(subject);
	        helper.setText(body, true); // Enable HTML content

	        mailSender.send(message);
	    } catch (Exception e) {
	        e.printStackTrace(); // Handle exception properly in production
	    }
	}

}
