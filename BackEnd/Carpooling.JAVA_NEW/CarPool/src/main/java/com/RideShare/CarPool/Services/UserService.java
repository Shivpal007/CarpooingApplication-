

package com.RideShare.CarPool.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.RideShare.CarPool.Entities.User;
import com.RideShare.CarPool.Repositories.UserRepository;

@Service
public class UserService {

    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService; // Inject EmailService

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User findUserByContact(String contactno) {
        return userRepository.findUserByContact(contactno);
    }//find user by contactno

    public User findUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }//find user by id

//    public User userRegister(User user) {
//        User savedUser = userRepository.save(user);
//
//        // Send welcome email
//        String subject = "Welcome to RideShare!";
//        String body = "Hello " + user.getName() + ",\n\nWelcome to Carpool! Your account has been successfully created.\n\nEnjoy your rides!\n\nBest Regards,\nCarpooling Team";
//        emailService.sendEmail(user.getEmail(), subject, body);
//
//        return savedUser;
//    }//user Register
    
    
    
    public User userRegister(User user) {
        User savedUser = userRepository.save(user);

        // Send welcome email
        String subject = "Welcome to Carpooling...!";
        String body = "<html>" +
                      "<head>" +
                      "<style>" +
                      "body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }" +
                      ".container { max-width: 600px; background: #ffffff; padding: 20px; border-radius: 10px; " +
                      "box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); text-align: center; }" +
                      "h2 { color: #333; }" +
                      "p { font-size: 16px; color: #555; }" +
                      ".footer { margin-top: 20px; font-size: 14px; color: #777; text-align: center; }" +
                      ".button { display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; " +
                      "background: #007bff; text-decoration: none; border-radius: 5px; margin-top: 15px; }" +
                      "</style>" +
                      "</head>" +
                      "<body>" +
                      "<div class='container'>" +
                      "<h2>Welcome, " + user.getName() + "!</h2>" +
                      "<p>We're excited to have you at <strong>Carpooling..!</strong> Your account has been successfully created.</p>" +
                      "<p>Start booking or publishing rides now and enjoy seamless travel experiences.</p>" +
                      "" +
                      "<p class='footer'>&copy; 2025 Carpooling. All rights reserved.</p>" +
                      "</div>" +
                      "</body>" +
                      "</html>";

        emailService.sendEmail(user.getEmail(), subject, body);

        return savedUser;
    }




    
    public boolean updateProfile(User profile) {
        Optional<User> userRegistered = userRepository.findById(profile.getUid());

        if (!userRegistered.isPresent()) {
            return false; // User not found
        }

        User old = userRegistered.get();  // Extract the user from Optional

        old.setName(profile.getName());
        old.setEmail(profile.getEmail());
        old.setContactno(profile.getContactno());
        old.setAddress(profile.getAddress());
        old.setDob(profile.getDob());
        old.setPassword(profile.getPassword());
        old.setGender(profile.getGender());

        userRepository.save(old);  // Save updated user
        return true; // Successful update
    }
    
    public ResponseEntity<String> forgetPassword(String email, String contact) {
        User user = userRepository.findUserBYEmail(email, contact);
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        String subject = "Password Recovery - Carpooling";
        String body = "<html>" +
                      "<head>" +
                      "<style>" +
                      "body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }" +
                      ".container { max-width: 600px; background: #ffffff; padding: 20px; border-radius: 10px; " +
                      "box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); text-align: center; }" +
                      "h2 { color: #333; }" +
                      "p { font-size: 16px; color: #555; }" +
                      ".password-box { background: #f8d7da; padding: 10px; border-radius: 5px; " +
                      "color: #721c24; font-weight: bold; display: inline-block; margin-top: 10px; }" +
                      ".footer { margin-top: 20px; font-size: 14px; color: #777; text-align: center; }" +
                      "</style>" +
                      "</head>" +
                      "<body>" +
                      "<div class='container'>" +
                      "<h2>Password Recovery</h2>" +
                      "<p>Hello " + user.getName() + ",</p>" +
                      "<p>You requested a password reset. Here is your password:</p>" +
                      "<div class='password-box'>" + user.getPassword() + "</div>" +
                      "<p>If you did not request this, please change your password immediately.</p>" +
                      "<p class='footer'>&copy; 2025 Carpooling. All rights reserved.</p>" +
                      "</div>" +
                      "</body>" +
                      "</html>";

        emailService.sendEmail(email, subject, body);
        
        return ResponseEntity.ok("Password sent to your email.");
    }

    
}//service class

