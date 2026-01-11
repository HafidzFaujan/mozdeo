// Mozdeo JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    // CRITICAL: Force blue color for static buttons
    function forceStaticButtonColors() {
        const staticButtons = document.querySelectorAll('.btn-static');
        
        staticButtons.forEach(button => {
            // Force blue color with highest priority
            button.style.setProperty('background', '#2563EB', 'important');
            button.style.setProperty('color', 'white', 'important');
            button.style.setProperty('border-color', '#2563EB', 'important');
            button.style.setProperty('box-shadow', '0 8px 30px rgba(37, 99, 235, 0.25)', 'important');
            button.style.setProperty('transform', 'none', 'important');
            button.style.setProperty('transition', 'none', 'important');
            button.style.setProperty('animation', 'none', 'important');
            
            // Override ALL events to maintain blue color
            ['mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'focus', 'blur', 'hover'].forEach(eventType => {
                button.addEventListener(eventType, function(e) {
                    e.stopPropagation();
                    // Force maintain blue color
                    this.style.setProperty('background', '#2563EB', 'important');
                    this.style.setProperty('color', 'white', 'important');
                    this.style.setProperty('border-color', '#2563EB', 'important');
                    this.style.setProperty('box-shadow', '0 8px 30px rgba(37, 99, 235, 0.25)', 'important');
                    this.style.setProperty('transform', 'none', 'important');
                    this.style.setProperty('transition', 'none', 'important');
                    this.style.setProperty('animation', 'none', 'important');
                }, true);
            });
        });
    }
    
    // Run immediately
    forceStaticButtonColors();
    
    // Force colors every 100ms to override any other scripts
    setInterval(forceStaticButtonColors, 100);
    
    // Re-run after any DOM changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                forceStaticButtonColors();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
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
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            const newsletter = document.getElementById('newsletter').checked;
            
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
            
            // Alternative: Send via WhatsApp
            const whatsappMessage = `Halo Mozdeo!%0A%0ANama: ${firstName} ${lastName}%0AEmail: ${email}%0ATelepon: ${phone}%0ALayanan: ${service}%0A%0APesan:%0A${message}`;
            const whatsappUrl = `https://wa.me/628111900083?text=${whatsappMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            showNotification('Anda akan diarahkan ke WhatsApp untuk mengirim pesan', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }

    // Animated counters for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
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

    // Service card hover effects (but NOT for static buttons)
    const serviceCards = document.querySelectorAll('.service-card:not(.btn-static)');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-static')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-static')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Gallery lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
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
`;
document.head.appendChild(style);

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
                
                // Add highlight effect to the target section
                target.style.transition = 'all 0.3s ease';
                target.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
                setTimeout(() => {
                    target.style.backgroundColor = '';
                }, 2000);
            }
        });
    });

    // Alternative: If smooth scrolling doesn't work, use jQuery-like animation
    function smoothScrollTo(targetId) {
        const target = document.getElementById(targetId.replace('#', ''));
        if (target) {
            const targetPosition = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    // Smart "Pesan Sekarang" button functionality
    function initPesanSekarangButton() {
        // Find the "Pesan Sekarang" button in header
        const pesanButton = document.querySelector('.navbar-nav a[href*="wa.me"]');
        if (!pesanButton) return;

        // Get current page context
        const currentPath = window.location.pathname.toLowerCase();
        let message = "Halo Mozdeo! Saya ingin konsultasi tentang layanan cuci sepatu";
        
        // Customize message based on current page
        if (currentPath.includes('services')) {
            message = "Halo Mozdeo! Saya ingin tahu lebih detail tentang layanan yang tersedia";
        } else if (currentPath.includes('gallery')) {
            message = "Halo Mozdeo! Saya tertarik setelah melihat hasil kerja di galeri";
        } else if (currentPath.includes('about')) {
            message = "Halo Mozdeo! Saya ingin konsultasi setelah membaca tentang perusahaan";
        } else if (currentPath.includes('contact')) {
            message = "Halo Mozdeo! Saya ingin konsultasi tentang layanan cuci sepatu";
        }
        
        // Update WhatsApp URL with contextual message
        const whatsappUrl = `https://wa.me/628111900083?text=${encodeURIComponent(message)}`;
        pesanButton.href = whatsappUrl;
        
        console.log('Pesan Sekarang button updated for page:', currentPath);
        console.log('WhatsApp URL:', whatsappUrl);
    }

    // Initialize on page load
    initPesanSekarangButton();
