
using Microsoft.AspNetCore.Mvc;
using Portfolio.Server.Models;
using Portfolio.Server.Services;

namespace Portfolio.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly EmailService _emailService;

        public ContactController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(ContactFormModel contactForm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _emailService.SendEmailAsync(contactForm);
            await _emailService.SendConfirmationEmailAsync(contactForm);
            return Ok();
        }
    }

}
