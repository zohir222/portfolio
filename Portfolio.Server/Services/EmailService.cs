using Portfolio.Server.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace Portfolio.Server.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(ContactFormModel contactForm)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Your Name", "your-email@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("Your Name", "your-email@gmail.com"));
            emailMessage.Subject = "New Contact Form Submission";
            emailMessage.Body = new TextPart("plain")
            {
                Text = $"Name: {contactForm.Name}\nEmail: {contactForm.Email}\nMessage: {contactForm.Message}"
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, false);
                await client.AuthenticateAsync("your-email@gmail.com", "your-email-password");
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }
        public async Task SendConfirmationEmailAsync(ContactFormModel contactForm)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Your Website", "your-email@gmail.com"));
            emailMessage.To.Add(new MailboxAddress(contactForm.Name, contactForm.Email));
            emailMessage.Subject = "Thank You for Contacting Us";
            emailMessage.Body = new TextPart("plain")
            {
                Text = $"Hi {contactForm.Name},\n\nThank you for reaching out! We have received your message and will get back to you shortly.\n\nBest regards,\nYour Website Team"
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, false);
                await client.AuthenticateAsync("your-email@gmail.com", "your-email-password");
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }

    }
}





