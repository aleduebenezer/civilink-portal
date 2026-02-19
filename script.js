// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Features Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const carouselSlides = document.querySelector('.carousel-slides');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

function showSlide(n) {
    if (n >= totalSlides) currentSlide = 0;
    if (n < 0) currentSlide = totalSlides - 1;
    
    if (carouselSlides) {
        carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
            indicator.style.backgroundColor = '#88F9C1';
        } else {
            indicator.classList.remove('active');
            indicator.style.backgroundColor = '#d1d5db';
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-slide
if (carouselSlides) {
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// Testimonials Carousel
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const totalTestimonials = testimonialSlides.length;
const testimonialCarouselSlides = document.querySelector('.testimonial-carousel-slides');
const testimonialIndicators = document.querySelectorAll('.testimonial-indicator');
const testimonialPrevBtn = document.querySelector('.testimonial-prev');
const testimonialNextBtn = document.querySelector('.testimonial-next');

function showTestimonial(n) {
    if (n >= totalTestimonials) currentTestimonial = 0;
    if (n < 0) currentTestimonial = totalTestimonials - 1;
    
    if (testimonialCarouselSlides) {
        testimonialCarouselSlides.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }
    
    testimonialIndicators.forEach((indicator, index) => {
        if (index === currentTestimonial) {
            indicator.classList.add('active');
            indicator.style.backgroundColor = '#F9D3BF';
        } else {
            indicator.classList.remove('active');
            indicator.style.backgroundColor = '#d1d5db';
        }
    });
}

if (testimonialPrevBtn) {
    testimonialPrevBtn.addEventListener('click', () => {
        currentTestimonial--;
        showTestimonial(currentTestimonial);
    });
}

if (testimonialNextBtn) {
    testimonialNextBtn.addEventListener('click', () => {
        currentTestimonial++;
        showTestimonial(currentTestimonial);
    });
}

testimonialIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-slide testimonials
if (testimonialCarouselSlides) {
    setInterval(() => {
        currentTestimonial++;
        showTestimonial(currentTestimonial);
    }, 6000);
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// API URL configuration
const API_URL = 'http://localhost:3000';

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const token = localStorage.getItem('token');
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Something went wrong');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname.split('/').pop();
    
    const protectedPages = ['dashboard.html', 'my-ids.html', 'track-application.html'];
    const authPages = ['login.html', 'signup.html'];

    if (protectedPages.includes(currentPage) && !token) {
        window.location.href = 'login.html';
    }

    if (authPages.includes(currentPage) && token) {
        window.location.href = 'dashboard.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});