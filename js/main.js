// Hero Section Carousel
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
        });
        
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        currentSlide = (index + totalSlides) % totalSlides;
        
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.visibility = 'visible';
        indicators[currentSlide].classList.add('active');
        
        updatePageIndicator();
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto advance slides
    let slideInterval = setInterval(nextSlide, 5000);

    // Reset interval when manually changing slides
    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Add event listeners to carousel navigation buttons
    const nextBtn = document.querySelector('.carousel-nav .next-btn');
    const prevBtn = document.querySelector('.carousel-nav .prev-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSlideInterval();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSlideInterval();
        });
    }

    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetSlideInterval();
        });
    });

    // Update page indicator
    function updatePageIndicator() {
        const indicator = document.querySelector('.page-indicator');
        if (indicator) {
            indicator.textContent = `0${currentSlide + 1}/02`;
        }
    }

    // Initialize the carousel
    showSlide(0);
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbarMenu && navbarMenu.classList.contains('active')) {
        if (!navbarMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navbarMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80; // 考虑固定header的高度
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Service cards hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Handle home link click based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.querySelector('a[href="#home"]');
    const heroSection = document.getElementById('hero');
    
    if (homeLink && heroSection) {
        homeLink.addEventListener('click', function(e) {
            const heroRect = heroSection.getBoundingClientRect();
            // If we're not at the top of the page
            if (window.scrollY > 0) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Email protection
document.addEventListener('DOMContentLoaded', function() {
    const emailElements = document.querySelectorAll('.email-protection');
    emailElements.forEach(function(element) {
        const email = element.dataset.email;
        // 将邮箱地址转换为 HTML 实体
        const encodedEmail = email.split('').map(char => {
            const code = char.charCodeAt(0);
            return `&#${code};`;
        }).join('');
        element.innerHTML = encodedEmail;
        element.addEventListener('click', function() {
            window.location.href = 'mailto:' + email;
        });
    });
});