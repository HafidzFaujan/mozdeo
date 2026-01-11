// Mozdeo JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item-container');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const firstName = document.getElementById('firstName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!firstName || !email || !phone || !message) {
                showNotification('Mohon lengkapi semua field yang wajib diisi', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Animated counters for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });

    // WhatsApp float button animation
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        setInterval(() => {
            whatsappFloat.style.animation = 'pulse 2s infinite';
            setTimeout(() => {
                whatsappFloat.style.animation = '';
            }, 2000);
        }, 5000);
    }

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Gallery lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    // Video testimonial play buttons
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simulate video play (replace with actual video modal)
            showNotification('Video testimonial akan segera dimuat...', 'info');
        });
    });
});

// Utility Functions
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const suffix = element.textContent.replace(/[\d]/g, '');
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            ${message}
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

function openLightbox(src, alt) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}" class="lightbox-image">
            <button class="lightbox-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="lightbox-caption">${alt}</div>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(lightbox);
    
    // Close on overlay click
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.parentElement) {
            lightbox.remove();
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .navbar.scrolled {
        background-color: rgba(44, 44, 44, 0.95) !important;
        backdrop-filter: blur(10px);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
    }
    
    .lightbox-caption {
        text-align: center;
        color: white;
        margin-top: 10px;
        font-size: 14px;
    }
    
    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        background: rgba(220, 53, 69, 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .play-button:hover {
        background: rgba(220, 53, 69, 1);
        transform: translate(-50%, -50%) scale(1.1);
    }
    
    .video-thumbnail {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
    }
`;
document.head.appendChild(style);

// Additional JavaScript Features

// Scroll Progress Indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        indicator.style.width = scrollPercent + '%';
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Auto-hide Navigation on Scroll
let lastScrollTop = 0;
function autoHideNavigation() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Service Card Tilt Effect
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Price Calculator
function initPriceCalculator() {
    const services = {
        'deep-cleaning': 25000,
        'unyellowing': 45000,
        'repaint': 65000,
        'premium-care': 85000
    };
    
    // Create calculator modal (if needed)
    window.calculatePrice = function(serviceType, quantity = 1, isExpress = false, hasPickup = false) {
        let basePrice = services[serviceType] || 0;
        let total = basePrice * quantity;
        
        if (isExpress) total *= 1.5;
        if (hasPickup) total += 15000;
        
        return {
            basePrice,
            quantity,
            isExpress,
            hasPickup,
            total: Math.round(total)
        };
    };
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    if (testimonials.length > 0) {
        setInterval(() => {
            testimonials[currentIndex].style.opacity = '0.7';
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].style.opacity = '1';
            testimonials[currentIndex].style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                testimonials[currentIndex].style.transform = 'scale(1)';
            }, 300);
        }, 5000);
    }
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const searchableElements = document.querySelectorAll('[data-searchable]');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                const parent = element.closest('.service-card, .gallery-item-container');
                
                if (text.includes(query) || query === '') {
                    parent.style.display = 'block';
                } else {
                    parent.style.display = 'none';
                }
            });
        });
    }
}

// Cookie Consent
function initCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const consent = document.createElement('div');
        consent.className = 'cookie-consent';
        consent.innerHTML = `
            <div class="cookie-content">
                <p>Website ini menggunakan cookies untuk meningkatkan pengalaman Anda.</p>
                <button onclick="acceptCookies()" class="btn btn-primary-custom btn-sm">Terima</button>
                <button onclick="declineCookies()" class="btn btn-outline-custom btn-sm">Tolak</button>
            </div>
        `;
        
        consent.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: var(--secondary-dark);
            color: var(--text-light);
            padding: 20px;
            border-radius: 10px;
            z-index: 9998;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(consent);
    }
}

window.acceptCookies = function() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('.cookie-consent').remove();
};

window.declineCookies = function() {
    localStorage.setItem('cookieConsent', 'declined');
    document.querySelector('.cookie-consent').remove();
};

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize new features
    createScrollIndicator();
    initLazyLoading();
    initParallax();
    autoHideNavigation();
    initTiltEffect();
    initPriceCalculator();
    initTestimonialCarousel();
    initSearch();
    initCookieConsent();
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Send to analytics (if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: loadTime,
                event_category: 'Performance'
            });
        }
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    
    // Show user-friendly error message
    showNotification('Terjadi kesalahan. Silakan refresh halaman.', 'error');
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// PDF Generation Functions
function initPDFFeatures() {
    // Add PDF print buttons to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const pdfButton = document.createElement('button');
        pdfButton.className = 'btn btn-outline-blue btn-sm pdf-print-btn';
        pdfButton.innerHTML = '<i class="fas fa-file-pdf me-2"></i>Cetak PDF';
        pdfButton.onclick = () => printServiceToPDF(card);
        
        const cardBody = card.querySelector('.card-body') || card;
        cardBody.appendChild(pdfButton);
    });

    // Add PDF print button to price list
    const priceSection = document.querySelector('#services, .services-section');
    if (priceSection) {
        const pdfPriceButton = document.createElement('button');
        pdfPriceButton.className = 'btn btn-blue mb-4';
        pdfPriceButton.innerHTML = '<i class="fas fa-download me-2"></i>Download Daftar Harga PDF';
        pdfPriceButton.onclick = () => printPriceListToPDF();
        
        const container = priceSection.querySelector('.container');
        if (container) {
            container.insertBefore(pdfPriceButton, container.firstChild);
        }
    }

    // Add PDF print button to contact info
    const contactSection = document.querySelector('#contact, .contact-section');
    if (contactSection) {
        const pdfContactButton = document.createElement('button');
        pdfContactButton.className = 'btn btn-teal mb-3';
        pdfContactButton.innerHTML = '<i class="fas fa-address-card me-2"></i>Cetak Info Kontak';
        pdfContactButton.onclick = () => printContactToPDF();
        
        const container = contactSection.querySelector('.container');
        if (container) {
            const firstRow = container.querySelector('.row');
            if (firstRow) {
                container.insertBefore(pdfContactButton, firstRow);
            }
        }
    }
}

// Print individual service to PDF
function printServiceToPDF(serviceCard) {
    try {
        // Check if jsPDF is available
        if (typeof window.jsPDF === 'undefined') {
            // Fallback to browser print
            printElementToPDF(serviceCard, 'Layanan Mozdeo');
            return;
        }

        const { jsPDF } = window;
        const doc = new jsPDF();

        // Get service details
        const title = serviceCard.querySelector('h3, .card-title')?.textContent || 'Layanan Mozdeo';
        const description = serviceCard.querySelector('p, .card-text')?.textContent || '';
        const price = serviceCard.querySelector('.price, .text-primary')?.textContent || '';

        // PDF Header
        doc.setFontSize(20);
        doc.setTextColor(44, 123, 229); // Blue color
        doc.text('MOZDEO - Jasa Cuci Sepatu Premium', 20, 30);
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(title, 20, 50);
        
        // Service details
        doc.setFontSize(12);
        const splitDescription = doc.splitTextToSize(description, 170);
        doc.text(splitDescription, 20, 70);
        
        if (price) {
            doc.setFontSize(14);
            doc.setTextColor(255, 107, 53); // Orange color
            doc.text(`Harga: ${price}`, 20, 70 + (splitDescription.length * 7) + 10);
        }

        // Contact info
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Hubungi kami:', 20, 250);
        doc.text('WhatsApp: +62 812-3456-7890', 20, 260);
        doc.text('Email: info@mozdeo.com', 20, 270);
        doc.text('Website: www.mozdeo.com', 20, 280);

        // Save PDF
        doc.save(`mozdeo-${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        showNotification('PDF berhasil diunduh!', 'success');

    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Gagal membuat PDF. Menggunakan print browser...', 'warning');
        printElementToPDF(serviceCard, 'Layanan Mozdeo');
    }
}

// Print price list to PDF
function printPriceListToPDF() {
    try {
        if (typeof window.jsPDF === 'undefined') {
            // Server-side PDF generation
            window.open('/Home/DownloadPriceList', '_blank');
            return;
        }

        const { jsPDF } = window;
        const doc = new jsPDF();

        // PDF Header
        doc.setFontSize(20);
        doc.setTextColor(44, 123, 229);
        doc.text('MOZDEO - DAFTAR HARGA LAYANAN', 20, 30);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Jasa Cuci Sepatu Premium - Berpengalaman 35+ Tahun', 20, 45);

        // Services data
        const services = [
            { name: 'Deep Cleaning', price: 'Rp 25.000', desc: 'Pembersihan menyeluruh dengan peralatan khusus' },
            { name: 'Unyellowing', price: 'Rp 45.000', desc: 'Menghilangkan noda kuning pada sole sepatu' },
            { name: 'Repaint', price: 'Rp 65.000', desc: 'Pengecatan ulang untuk sepatu yang pudar' },
            { name: 'Premium Care', price: 'Rp 85.000', desc: 'Perawatan lengkap dengan perlindungan ekstra' }
        ];

        let yPosition = 70;
        
        services.forEach((service, index) => {
            // Service name and price
            doc.setFontSize(14);
            doc.setTextColor(44, 123, 229);
            doc.text(`${index + 1}. ${service.name}`, 20, yPosition);
            
            doc.setTextColor(255, 107, 53);
            doc.text(service.price, 150, yPosition);
            
            // Description
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            const splitDesc = doc.splitTextToSize(service.desc, 170);
            doc.text(splitDesc, 25, yPosition + 8);
            
            yPosition += 25 + (splitDesc.length * 3);
        });

        // Additional info
        yPosition += 20;
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Layanan Tambahan:', 20, yPosition);
        
        doc.setFontSize(10);
        doc.text('• Antar Jemput: +Rp 15.000', 25, yPosition + 15);
        doc.text('• Express (1 hari): +50% dari harga layanan', 25, yPosition + 25);
        doc.text('• Garansi 30 hari untuk semua layanan', 25, yPosition + 35);

        // Contact info
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Hubungi kami untuk konsultasi gratis:', 20, 250);
        doc.text('WhatsApp: +62 812-3456-7890', 20, 260);
        doc.text('Email: info@mozdeo.com', 20, 270);
        doc.text('Alamat: Jl. Menteng Raya, Jakarta Pusat', 20, 280);

        doc.save('mozdeo-daftar-harga.pdf');
        showNotification('Daftar harga PDF berhasil diunduh!', 'success');

    } catch (error) {
        console.error('Error generating price list PDF:', error);
        showNotification('Gagal membuat PDF. Mencoba download dari server...', 'warning');
        window.open('/Home/DownloadPriceList', '_blank');
    }
}

// Print contact info to PDF
function printContactToPDF() {
    try {
        if (typeof window.jsPDF === 'undefined') {
            window.open('/Home/DownloadContactInfo', '_blank');
            return;
        }

        const { jsPDF } = window;
        const doc = new jsPDF();

        // PDF Header
        doc.setFontSize(20);
        doc.setTextColor(44, 123, 229);
        doc.text('MOZDEO - INFORMASI KONTAK', 20, 30);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Jasa Cuci Sepatu Premium', 20, 45);

        // Contact details
        let yPos = 70;
        
        const contactInfo = [
            { label: 'Alamat', value: 'Jl. Menteng Raya, Jakarta Pusat' },
            { label: 'WhatsApp', value: '+62 812-3456-7890' },
            { label: 'Email', value: 'info@mozdeo.com' },
            { label: 'Website', value: 'www.mozdeo.com' },
            { label: 'Jam Operasional', value: 'Senin - Sabtu: 08:00 - 20:00' },
            { label: '', value: 'Minggu: 09:00 - 17:00' }
        ];

        contactInfo.forEach(info => {
            if (info.label) {
                doc.setFontSize(12);
                doc.setTextColor(44, 123, 229);
                doc.text(`${info.label}:`, 20, yPos);
                
                doc.setTextColor(0, 0, 0);
                doc.text(info.value, 60, yPos);
            } else {
                doc.setTextColor(0, 0, 0);
                doc.text(info.value, 60, yPos);
            }
            yPos += 15;
        });

        // Services summary
        yPos += 20;
        doc.setFontSize(14);
        doc.setTextColor(44, 123, 229);
        doc.text('Layanan Kami:', 20, yPos);
        
        yPos += 15;
        const servicesList = [
            'Deep Cleaning - Pembersihan menyeluruh',
            'Unyellowing - Menghilangkan noda kuning',
            'Repaint - Pengecatan ulang sepatu',
            'Premium Care - Perawatan lengkap'
        ];

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        servicesList.forEach(service => {
            doc.text(`• ${service}`, 25, yPos);
            yPos += 12;
        });

        doc.save('mozdeo-kontak-info.pdf');
        showNotification('Info kontak PDF berhasil diunduh!', 'success');

    } catch (error) {
        console.error('Error generating contact PDF:', error);
        showNotification('Gagal membuat PDF. Mencoba download dari server...', 'warning');
        window.open('/Home/DownloadContactInfo', '_blank');
    }
}

// Fallback print function using browser print
function printElementToPDF(element, title = 'Mozdeo') {
    const printWindow = window.open('', '_blank');
    const elementClone = element.cloneNode(true);
    
    // Remove PDF buttons from clone
    const pdfButtons = elementClone.querySelectorAll('.pdf-print-btn');
    pdfButtons.forEach(btn => btn.remove());
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .service-card { border: 1px solid #ddd; padding: 20px; border-radius: 10px; }
                .text-primary { color: #2c7be5 !important; }
                .text-orange { color: #ff6b35 !important; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2c7be5;">MOZDEO</h1>
                <p>Jasa Cuci Sepatu Premium</p>
            </div>
            ${elementClone.outerHTML}
            <div style="margin-top: 30px; font-size: 12px; color: #666;">
                <p>Hubungi kami: WhatsApp +62 812-3456-7890 | Email: info@mozdeo.com</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// Load jsPDF library dynamically
function loadJsPDF() {
    if (typeof window.jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            console.log('jsPDF loaded successfully');
            showNotification('PDF generator siap digunakan!', 'info');
        };
        script.onerror = () => {
            console.warn('Failed to load jsPDF, using fallback print method');
        };
        document.head.appendChild(script);
    }
}

// Initialize PDF features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load jsPDF library
    loadJsPDF();
    
    // Initialize PDF features after a short delay to ensure DOM is ready
    setTimeout(() => {
        initPDFFeatures();
    }, 1000);
});
// Disable animations for static buttons
function disableStaticButtonAnimations() {
    const staticButtons = document.querySelectorAll('.btn-static');
    
    staticButtons.forEach(button => {
        // Remove all event listeners that might cause animations
        button.style.transform = 'none';
        button.style.transition = 'none';
        button.style.animation = 'none';
        
        // Override any hover effects
        button.addEventListener('mouseenter', function(e) {
            e.stopPropagation();
            this.style.transform = 'none';
            this.style.animation = 'none';
        });
        
        button.addEventListener('mouseleave', function(e) {
            e.stopPropagation();
            this.style.transform = 'none';
            this.style.animation = 'none';
        });
        
        button.addEventListener('mousemove', function(e) {
            e.stopPropagation();
            this.style.transform = 'none';
        });
        
        // Disable tilt effects
        button.addEventListener('mousemove', function(e) {
            e.stopImmediatePropagation();
        }, true);
    });
}

// Override tilt effect initialization to exclude static buttons
const originalInitTiltEffect = initTiltEffect;
initTiltEffect = function() {
    const cards = document.querySelectorAll('.service-card:not(.btn-static)');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
};

// Initialize static button protection
document.addEventListener('DOMContentLoaded', function() {
    disableStaticButtonAnimations();
    
    // Re-apply protection after any dynamic content changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                disableStaticButtonAnimations();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});