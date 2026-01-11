#!/usr/bin/env python3
"""
Script untuk generate PDF dari file teks pricelist
Cara pakai: python generate_pdf.py
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import os

def create_pdf_from_text():
    # Baca file teks
    try:
        with open('assets/files/mozdeo-pricelistt.txt', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("File mozdeo-pricelistt.txt tidak ditemukan!")
        return
    
    # Setup PDF
    pdf_path = 'wwwroot/assets/files/mozdeo-pricelist.pdf'
    doc = SimpleDocTemplate(pdf_path, pagesize=A4, 
                           rightMargin=72, leftMargin=72, 
                           topMargin=72, bottomMargin=18)
    
    # Styles
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=18,
        spaceAfter=30,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#2563EB')
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=12,
        spaceBefore=20,
        textColor=colors.HexColor('#2563EB')
    )
    
    service_style = ParagraphStyle(
        'ServiceStyle',
        parent=styles['Normal'],
        fontSize=12,
        spaceAfter=8,
        leftIndent=20
    )
    
    price_style = ParagraphStyle(
        'PriceStyle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.HexColor('#2563EB'),
        spaceAfter=8
    )
    
    # Parse content
    story = []
    lines = content.split('\n')
    
    for line in lines:
        line = line.strip()
        
        if not line or line.startswith('==='):
            continue
            
        if 'MOZDEO - DAFTAR HARGA' in line:
            story.append(Paragraph(line, title_style))
        elif line.endswith(':') and line.isupper():
            story.append(Paragraph(line, heading_style))
        elif line.startswith('- ') or line.startswith('•'):
            story.append(Paragraph(line, service_style))
        elif 'Rp ' in line and any(char.isdigit() for char in line):
            story.append(Paragraph(line, price_style))
        elif line.startswith('*'):
            story.append(Paragraph(f"<i>{line}</i>", styles['Normal']))
        else:
            story.append(Paragraph(line, styles['Normal']))
        
        story.append(Spacer(1, 6))
    
    # Build PDF
    doc.build(story)
    print(f"PDF berhasil dibuat: {pdf_path}")

if __name__ == "__main__":
    create_pdf_from_text()