using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
namespace Carpooling.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string toEmail, string subject, string message)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(emailSettings["SenderName"], emailSettings["SenderEmail"]));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;

            email.Body = new TextPart("html") { Text = message };

            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings["SmtpServer"], int.Parse(emailSettings["Port"]), false);
            smtp.Authenticate(emailSettings["SenderEmail"], emailSettings["Password"]);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }

}