#!/usr/bin/env python3
"""
Script sederhana untuk generate PDF dari file teks
Menggunakan weasyprint (lebih mudah install)
"""

import os
from weasyprint import HTML, CSS

def create_pdf_simple():
    # Baca file teks
    try:
        with open('assets/files/mozdeo-pricelistt.txt', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("File mozdeo-pricelistt.txt tidak ditemukan!")
        return
    
    # Convert teks ke HTML
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Mozdeo Pricelist</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 40px;
                line-height: 1.6;
            }
            .header {
                text-align: center;
                color: #2563EB;
                margin-bottom: 30px;
            }
            .section-title {
                color: #2563EB;
                font-size: 16px;
                font-weight: bold;
                margin-top: 25px;
                margin-bottom: 10px;
                border-bottom: 2px solid #2563EB;
                padding-bottom: 5px;
            }
            .service-item {
                margin: 15px 0;
                padding: 10px;
                border-left: 4px solid #2563EB;
                background: #f8f9fa;
            }
            .price {
                color: #2563EB;
                font-weight: bold;
                float: right;
            }
            .sub-item {
                margin-left: 20px;
                font-size: 14px;
                color: #666;
            }
            .contact {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
            }
            .footer {
                font-size: 12px;
                color: #888;
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
    """
    
    lines = content.split('\n')
    current_section = ""
    
    for line in lines:
        line = line.strip()
        
        if not line or line.startswith('==='):
            continue
            
        if 'MOZDEO - DAFTAR HARGA' in line:
            html_content += f'<div class="header"><h1>{line}</h1></div>'
        elif line.endswith(':') and line.isupper():
            current_section = line
            html_content += f'<div class="section-title">{line}</div>'
        elif line.startswith(('1.', '2.', '3.', '4.')):
            # Service items dengan harga
            if 'Rp' in line:
                parts = line.split('Rp')
                service_name = parts[0].strip()
                price = 'Rp' + parts[1].strip()
                html_content += f'<div class="service-item">{service_name}<span class="price">{price}</span></div>'
            else:
                html_content += f'<div class="service-item">{line}</div>'
        elif line.startswith(('- ', '•')):
            html_content += f'<div class="sub-item">{line}</div>'
        elif line.startswith('*'):
            html_content += f'<div class="footer">{line}</div>'
        elif 'Hotline:' in line or 'Email:' in line:
            html_content += f'<div class="contact"><strong>{line}</strong></div>'
        else:
            html_content += f'<p>{line}</p>'
    
    html_content += """
    </body>
    </html>
    """
    
    # Generate PDF
    try:
        HTML(string=html_content).write_pdf('wwwroot/assets/files/mozdeo-pricelist.pdf')
        print("PDF berhasil dibuat: wwwroot/assets/files/mozdeo-pricelist.pdf")
    except Exception as e:
        print(f"Error: {e}")
        print("Pastikan weasyprint sudah terinstall: pip install weasyprint")

if __name__ == "__main__":
    create_pdf_simple()