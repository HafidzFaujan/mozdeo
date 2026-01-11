using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace WEBSAMPLE.Controllers
{
    public class PriceListController : Controller
    {
        public IActionResult DownloadPdf()
        {
            try
            {
                // Coba baca dari file TXT yang sudah diubah
                var txtPath = Path.Combine(Directory.GetCurrentDirectory(), "assets", "files", "mozdeo-pricelistt.txt");
                
                if (System.IO.File.Exists(txtPath))
                {
                    // Baca file TXT dan generate HTML
                    var txtContent = System.IO.File.ReadAllText(txtPath, Encoding.UTF8);
                    var htmlContent = GeneratePriceListHtmlFromTxt(txtContent);
                    var bytes = Encoding.UTF8.GetBytes(htmlContent);
                    return File(bytes, "text/html", "mozdeo-pricelist.html");
                }
                
                // Fallback ke PDF file jika ada
                var pdfPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets", "files", "mozdeo-pricelist.pdf");
                if (System.IO.File.Exists(pdfPath))
                {
                    var fileBytes = System.IO.File.ReadAllBytes(pdfPath);
                    return File(fileBytes, "application/pdf", "mozdeo-pricelist.pdf");
                }
                
                // Fallback ke HTML default
                var defaultHtml = GeneratePriceListHtml();
                var defaultBytes = Encoding.UTF8.GetBytes(defaultHtml);
                return File(defaultBytes, "text/html", "mozdeo-pricelist.html");
            }
            catch (Exception ex)
            {
                // Jika ada error, return HTML default
                var htmlContent = GeneratePriceListHtml();
                var bytes = Encoding.UTF8.GetBytes(htmlContent);
                return File(bytes, "text/html", "mozdeo-pricelist.html");
            }
        }
        
        public IActionResult ViewPriceList()
        {
            return View();
        }
        
        private string GeneratePriceListHtmlFromTxt(string txtContent)
        {
            var html = new StringBuilder();
            html.Append(@"<!DOCTYPE html>
<html lang='id'>
<head>
    <meta charset='UTF-8'>
    <title>Mozdeo - Daftar Harga</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            line-height: 1.6;
            color: #333;
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
            color: #2563EB;
        }
        .section-title {
            color: #2563EB;
            font-size: 18px;
            font-weight: bold;
            margin-top: 25px;
            margin-bottom: 15px;
            border-bottom: 2px solid #2563EB;
            padding-bottom: 5px;
        }
        .service { 
            margin-bottom: 20px; 
            padding: 15px; 
            border-left: 4px solid #2563EB;
            background: #f8f9fa;
        }
        .price { 
            font-weight: bold; 
            color: #2563EB; 
            float: right; 
        }
        .sub-item {
            margin-left: 20px;
            font-size: 14px;
            color: #666;
            margin: 5px 0;
        }
        .package { 
            background: #e3f2fd; 
            padding: 15px; 
            margin: 10px 0; 
            border-radius: 5px;
        }
        .contact {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            background: #f0f8ff;
            padding: 20px;
            border-radius: 5px;
        }
        .footer {
            font-size: 12px;
            color: #888;
            text-align: center;
            margin-top: 20px;
            font-style: italic;
        }
        @media print { 
            body { margin: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>");

            var lines = txtContent.Split('\n');
            bool inContactSection = false;
            
            foreach (var line in lines)
            {
                var trimmedLine = line.Trim();
                
                if (string.IsNullOrEmpty(trimmedLine) || trimmedLine.StartsWith("==="))
                    continue;
                
                if (trimmedLine.Contains("MOZDEO - DAFTAR HARGA"))
                {
                    html.Append($"<div class='header'><h1>{trimmedLine}</h1></div>");
                }
                else if (trimmedLine.EndsWith(":") && trimmedLine.ToUpper() == trimmedLine)
                {
                    if (trimmedLine.Contains("CONTACT"))
                        inContactSection = true;
                    else
                        inContactSection = false;
                        
                    html.Append($"<div class='section-title'>{trimmedLine}</div>");
                }
                else if (trimmedLine.StartsWith("1.") || trimmedLine.StartsWith("2.") || 
                         trimmedLine.StartsWith("3.") || trimmedLine.StartsWith("4.") ||
                         trimmedLine.StartsWith("5."))
                {
                    // Service items dengan harga
                    if (trimmedLine.Contains("Rp"))
                    {
                        var parts = trimmedLine.Split(new string[] { "Rp" }, StringSplitOptions.None);
                        if (parts.Length >= 2)
                        {
                            var serviceName = parts[0].Trim();
                            var price = "Rp" + parts[1].Trim();
                            html.Append($"<div class='service'><strong>{serviceName}</strong><span class='price'>{price}</span><div style='clear:both;'></div></div>");
                        }
                        else
                        {
                            html.Append($"<div class='service'><strong>{trimmedLine}</strong></div>");
                        }
                    }
                    else
                    {
                        html.Append($"<div class='service'><strong>{trimmedLine}</strong></div>");
                    }
                }
                else if (trimmedLine.StartsWith("- ") || trimmedLine.StartsWith("• "))
                {
                    if (trimmedLine.Contains("Rp"))
                    {
                        html.Append($"<div class='package'><strong>{trimmedLine}</strong></div>");
                    }
                    else
                    {
                        html.Append($"<div class='sub-item'>{trimmedLine}</div>");
                    }
                }
                else if (trimmedLine.StartsWith("*"))
                {
                    html.Append($"<div class='footer'>{trimmedLine}</div>");
                }
                else if (inContactSection || trimmedLine.Contains("Hotline:") || trimmedLine.Contains("Email:") || trimmedLine.Contains("Website:"))
                {
                    html.Append($"<div class='contact'><strong>{trimmedLine}</strong></div>");
                }
                else if (!string.IsNullOrEmpty(trimmedLine))
                {
                    html.Append($"<p>{trimmedLine}</p>");
                }
            }

            html.Append(@"
    <div class='footer' style='margin-top: 40px; text-align: center;'>
        <p>Generated from latest pricelist data</p>
    </div>
</body>
</html>");

            return html.ToString();
        }
        
        private string GeneratePriceListHtml()
        {
            return @"<!DOCTYPE html>
<html lang='id'>
<head>
    <meta charset='UTF-8'>
    <title>Mozdeo - Daftar Harga</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .service { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; }
        .price { font-weight: bold; color: #2563EB; float: right; }
        .package { background: #f8f9fa; padding: 10px; margin: 10px 0; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class='header'>
        <h1>MOZDEO</h1>
        <h2>Daftar Harga Layanan Cuci Sepatu Premium</h2>
    </div>
    
    <h3>LAYANAN UTAMA</h3>
    <div class='service'>
        <h4>Deep Cleaning <span class='price'>Rp 30.000</span></h4>
        <ul>
            <li>Pembersihan mendalam sol dalam & luar</li>
            <li>Penghilangan bau tidak sedap</li>
            <li>Pembersihan tali sepatu</li>
            <li>Waktu pengerjaan: 2-3 hari</li>
        </ul>
    </div>
    
    <div class='service'>
        <h4>Unyellowing <span class='price'>Rp 45.000</span></h4>
        <ul>
            <li>Teknologi UV treatment</li>
            <li>Bahan kimia aman berkualitas</li>
            <li>Hasil tahan lama</li>
            <li>Waktu pengerjaan: 3-5 hari</li>
        </ul>
    </div>
    
    <div class='service'>
        <h4>Repaint <span class='price'>Rp 65.000</span></h4>
        <ul>
            <li>Cat berkualitas tinggi</li>
            <li>Matching warna sempurna</li>
            <li>Finishing halus dan rapi</li>
            <li>Waktu pengerjaan: 5-7 hari</li>
        </ul>
    </div>
    
    <div class='service'>
        <h4>Premium Care <span class='price'>Rp 85.000</span></h4>
        <ul>
            <li>Deep cleaning + unyellowing</li>
            <li>Waterproof coating</li>
            <li>Anti-bacterial treatment</li>
            <li>Garansi 30 hari</li>
        </ul>
    </div>
    
    <h3>LAYANAN TAMBAHAN</h3>
    <div class='package'>
        <p>Pickup & Delivery: <strong>Rp 15.000</strong></p>
        <p>Express Service (24 jam): <strong>+50% dari harga layanan</strong></p>
        <p>Insurance (sepatu >2jt): <strong>Rp 25.000</strong></p>
    </div>
    
    <h3>PAKET HEMAT</h3>
    <div class='package'>
        <p>Paket 3 Sepatu (Deep Cleaning): <strong>Rp 65.000</strong> (hemat 10k)</p>
        <p>Paket 5 Sepatu (Deep Cleaning): <strong>Rp 100.000</strong> (hemat 25k)</p>
        <p>Paket Premium 3 Sepatu: <strong>Rp 225.000</strong> (hemat 30k)</p>
    </div>
    
    <h3>MEMBER BENEFITS</h3>
    <div class='package'>
        <p>• Diskon 10% untuk member</p>
        <p>• Gratis pickup delivery (min. 3 sepatu)</p>
        <p>• Priority service</p>
        <p>• Extended warranty</p>
    </div>
    
    <div style='text-align: center; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;'>
        <h3>HUBUNGI KAMI</h3>
        <p>Hotline: 082-258-719-583 | Email: info@mozdeo.com | Website: www.mozdeo.com</p>
        <small>*Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya</small>
    </div>
</body>
</html>";
        }
    }
}