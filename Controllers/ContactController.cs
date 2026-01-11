using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

namespace WEBSAMPLE.Controllers
{
    public class ContactController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ContactMessage message)
        {
            try
            {
                // Konfigurasi email (sesuaikan dengan provider email Anda)
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("your-email@gmail.com", "your-app-password"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("your-email@gmail.com"),
                    Subject = $"Pesan Baru dari {message.FirstName} - Mozdeo Contact Form",
                    Body = $@"
                        <h3>Pesan Baru dari Website Mozdeo</h3>
                        <p><strong>Nama:</strong> {message.FirstName} {message.LastName}</p>
                        <p><strong>Email:</strong> {message.Email}</p>
                        <p><strong>Telepon:</strong> {message.Phone}</p>
                        <p><strong>Layanan:</strong> {message.Service}</p>
                        <p><strong>Pesan:</strong></p>
                        <p>{message.Message}</p>
                    ",
                    IsBodyHtml = true
                };

                mailMessage.To.Add("info@mozdeo.com"); // Email tujuan

                await smtpClient.SendMailAsync(mailMessage);

                return Json(new { success = true, message = "Pesan berhasil dikirim!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Gagal mengirim pesan. Silakan coba lagi." });
            }
        }
    }

    public class ContactMessage
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Service { get; set; }
        public string Message { get; set; }
        public bool Newsletter { get; set; }
    }
}