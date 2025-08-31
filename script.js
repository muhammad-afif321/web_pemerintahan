// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');
const exportPDFBtn = document.getElementById('exportPDF');
const serviceButtons = document.querySelectorAll('.btn-service');

// Navigation functionality
function initNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Section switching functionality
function showSection(targetId) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetId) {
            section.classList.add('active');
        }
    });
    
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Contact form functionality
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const nama = formData.get('nama');
        const email = formData.get('email');
        const telepon = formData.get('telepon');
        const subjek = formData.get('subjek');
        const pesan = formData.get('pesan');
        
        // Validate form
        if (!validateForm(nama, email, subjek, pesan)) {
            return;
        }
        
        // Simulate form submission
        submitForm(nama, email, telepon, subjek, pesan);
    });
}

// Form validation
function validateForm(nama, email, subjek, pesan) {
    // Remove existing messages
    removeMessages();
    
    let isValid = true;
    let errors = [];
    
    // Validate nama
    if (!nama || nama.trim().length < 2) {
        errors.push('Nama harus diisi minimal 2 karakter');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Email tidak valid');
        isValid = false;
    }
    
    // Validate subjek
    if (!subjek || subjek.trim().length < 5) {
        errors.push('Subjek harus diisi minimal 5 karakter');
        isValid = false;
    }
    
    // Validate pesan
    if (!pesan || pesan.trim().length < 10) {
        errors.push('Pesan harus diisi minimal 10 karakter');
        isValid = false;
    }
    
    // Show errors if any
    if (!isValid) {
        showErrorMessage(errors.join(', '));
    }
    
    return isValid;
}

// Submit form (simulation)
function submitForm(nama, email, telepon, subjek, pesan) {
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage('Pesan berhasil dikirim! Terima kasih atas partisipasi Anda.');
        
        // Reset form
        contactForm.reset();
        
        // Log form data (for demonstration)
        console.log('Form Data:', {
            nama,
            email,
            telepon,
            subjek,
            pesan,
            timestamp: new Date().toISOString()
        });
    }, 2000);
}

// Show success message
function showSuccessMessage(message) {
    removeMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    contactForm.insertBefore(successDiv, contactForm.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    removeMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    contactForm.insertBefore(errorDiv, contactForm.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Remove existing messages
function removeMessages() {
    const existingMessages = contactForm.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
}

// PDF Export functionality
function initPDFExport() {
    exportPDFBtn.addEventListener('click', () => {
        generatePDF();
    });
}

// Generate PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(74, 144, 226);
    doc.text('PROFIL KELURAHAN CIKETING UDIK', 20, 30);
    
    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Kecamatan Bantargebang, Kota Bekasi', 20, 40);
    
    // Line separator
    doc.setDrawColor(126, 211, 33);
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45);
    
    let yPos = 60;
    
    // Status Administratif
    doc.setFontSize(14);
    doc.setTextColor(74, 144, 226);
    doc.text('STATUS ADMINISTRATIF & SEJARAH', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Status: Kelurahan', 20, yPos);
    yPos += 6;
    doc.text('Dasar Hukum: Perda No. 02 Tahun 2002', 20, yPos);
    yPos += 6;
    doc.text('Asal Nama: "Ci" (air) + "keting" (lele) + "udik" (ujung)', 20, yPos);
    yPos += 15;
    
    // Data Administratif
    doc.setFontSize(14);
    doc.setTextColor(74, 144, 226);
    doc.text('DATA ADMINISTRATIF & GEOGRAFIS', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const adminData = [
        'Kode Pos: 17153',
        'Kode Kemendagri: 32.75.07.1007',
        'Luas Wilayah: ±4,36 km²',
        'Koordinat: 6°20\'54.681"S, 106°59\'13.928"E',
        'Elevasi: ±55 mdpl',
        'Populasi: ±25.393 jiwa (2023)',
        'Kepadatan: ±5.824 jiwa/km²'
    ];
    
    adminData.forEach(item => {
        doc.text(item, 20, yPos);
        yPos += 6;
    });
    
    yPos += 10;
    
    // Fasilitas Pendidikan
    doc.setFontSize(14);
    doc.setTextColor(74, 144, 226);
    doc.text('FASILITAS PENDIDIKAN', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const pendidikanData = [
        'SDN Ciketing Udik 1 & 2',
        'RA Nurul Iman',
        '4 SD Negeri, 23 SD Swasta',
        '1 SLTP Negeri, 3 SLTP Swasta',
        '1 SLTA Negeri'
    ];
    
    pendidikanData.forEach(item => {
        doc.text('• ' + item, 20, yPos);
        yPos += 6;
    });
    
    yPos += 10;
    
    // Fasilitas Kesehatan
    doc.setFontSize(14);
    doc.setTextColor(74, 144, 226);
    doc.text('FASILITAS KESEHATAN', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const kesehatanData = [
        '9 Puskesmas',
        '9 Posyandu',
        '1 Dokter Umum',
        '1 Bidan',
        'Total 10 Tenaga Kesehatan'
    ];
    
    kesehatanData.forEach(item => {
        doc.text('• ' + item, 20, yPos);
        yPos += 6;
    });
    
    yPos += 10;
    
    // Tempat Ibadah
    doc.setFontSize(14);
    doc.setTextColor(74, 144, 226);
    doc.text('TEMPAT IBADAH', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('• 13 Masjid', 20, yPos);
    yPos += 6;
    doc.text('• 31 Langgar', 20, yPos);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Dokumen ini digenerate pada: ' + new Date().toLocaleDateString('id-ID'), 20, 280);
    doc.text('© 2025 Kelurahan Ciketing Udik', 20, 285);
    
    // Save PDF
    doc.save('Profil-Kelurahan-Ciketing-Udik.pdf');
    
    // Show success message
    alert('PDF berhasil diunduh!');
}

// Service button functionality
function initServiceButtons() {
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceName = e.target.closest('.service-card').querySelector('h3').textContent;
            alert(`Layanan "${serviceName}" akan segera tersedia. Silakan datang langsung ke kantor kelurahan untuk sementara waktu.`);
        });
    });
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
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
}

// Initialize animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.hero-stats .stat-item, .vm-item, .news-card, .service-card, .facility-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Handle window resize
function handleResize() {
    window.addEventListener('resize', () => {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Initialize all functionality
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    initNavigation();
    initContactForm();
    initPDFExport();
    initServiceButtons();
    initSmoothScrolling();
    initScrollAnimations();
    handleResize();
    
    console.log('Website Kelurahan Ciketing Udik initialized successfully!');
}

// Start the application
init();

// Additional utility functions
const utils = {
    // Format phone number
    formatPhone: (phone) => {
        return phone.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    },
    
    // Format date to Indonesian format
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Validate Indonesian phone number
    validatePhone: (phone) => {
        const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
        return phoneRegex.test(phone.replace(/\s|-/g, ''));
    },
    
    // Show loading spinner
    showLoading: (element) => {
        element.innerHTML = '<div class="loading"></div>';
    },
    
    // Hide loading spinner
    hideLoading: (element, originalContent) => {
        element.innerHTML = originalContent;
    }
};

// Export utils for global access
window.KelurahankUtils = utils;
