// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;  // 如果页面没有轮播图则退出

    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let isTransitioning = false;
    
    // 自动轮播 - 调整为6秒
    let autoPlayInterval = setInterval(nextSlide, 6000);
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        if (isTransitioning || currentSlide === index) return;
        isTransitioning = true;
        
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // 动画完成后重置状态
        setTimeout(() => {
            isTransitioning = false;
        }, 800); // 与CSS过渡时间匹配
    }
    
    // 下一张幻灯片
    function nextSlide() {
        if (isTransitioning) return;
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        if (isTransitioning) return;
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }
    
    // 重置自动播放
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 6000);
    }
    
    // 指示器点击事件 - 添加触摸支持
    indicators.forEach((indicator, index) => {
        // 处理点击事件
        indicator.addEventListener('click', handleIndicatorInteraction);
        // 处理触摸事件
        indicator.addEventListener('touchend', handleIndicatorInteraction);

        function handleIndicatorInteraction(e) {
            e.preventDefault(); // 防止触摸事件触发点击
            if (isTransitioning) return;
            clearInterval(autoPlayInterval);
            goToSlide(index);
            resetAutoPlay();
        }
    });
    
    // 触摸事件处理
    let isSwiping = false;
    let touchStartTime;
    let touchEndTime;
    
    carousel.addEventListener('touchstart', (e) => {
        if (isTransitioning) return;
        touchStartX = e.touches[0].clientX;
        touchStartTime = new Date().getTime();
        clearInterval(autoPlayInterval);
        isSwiping = true;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        touchEndX = e.touches[0].clientX;
        // 防止页面滚动
        if (Math.abs(touchEndX - touchStartX) > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        
        touchEndTime = new Date().getTime();
        const swipeTime = touchEndTime - touchStartTime;
        const swipeDistance = touchEndX - touchStartX;
        
        // 快速滑动或滑动距离足够大时触发切换
        if (Math.abs(swipeDistance) > 30 || (Math.abs(swipeDistance) > 10 && swipeTime < 300)) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        isSwiping = false;
        resetAutoPlay();
    });
    
    // 鼠标悬停时暂停自动播放
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (!isTransitioning) {
            resetAutoPlay();
        }
    });
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