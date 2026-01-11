using Microsoft.AspNetCore.Mvc;

namespace WEBSAMPLE.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Tentang Mozdeo - Jasa cuci sepatu premium dengan pengalaman lebih dari 35 tahun.";
            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Hubungi kami untuk konsultasi gratis dan layanan terbaik.";
            return View();
        }

        public IActionResult Services()
        {
            ViewData["Message"] = "Berbagai layanan profesional untuk perawatan sepatu Anda.";
            return View();
        }

        public IActionResult Gallery()
        {
            ViewData["Message"] = "Lihat hasil kerja profesional kami dalam galeri foto.";
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}