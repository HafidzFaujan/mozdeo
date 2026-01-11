@echo off
echo ========================================
echo    MOZDEO PDF GENERATOR
echo ========================================
echo.
echo Mengupdate PDF dari file teks...
echo.

cd /d "%~dp0"

REM Cek apakah Python terinstall
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python tidak ditemukan!
    echo Silakan install Python terlebih dahulu.
    pause
    exit /b 1
)

REM Install weasyprint jika belum ada
echo Installing weasyprint...
pip install weasyprint >nul 2>&1

REM Generate PDF
echo Generating PDF...
python generate_simple_pdf.py

if exist "wwwroot\assets\files\mozdeo-pricelist.pdf" (
    echo.
    echo ✅ SUCCESS: PDF berhasil dibuat!
    echo File: wwwroot\assets\files\mozdeo-pricelist.pdf
    echo.
    echo Anda bisa:
    echo 1. Edit file: assets\files\mozdeo-pricelistt.txt
    echo 2. Jalankan script ini lagi untuk update PDF
    echo.
) else (
    echo.
    echo ❌ ERROR: PDF gagal dibuat!
    echo.
)

pause