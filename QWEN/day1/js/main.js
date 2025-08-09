// Basic interactivity for the website

document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Simple animation for feature cards on hover
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Simple animation for service cards on hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Simple animation for pricing cards on hover
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or respect OS setting
    const savedTheme = localStorage.getItem('theme');
    const osDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply saved theme or OS preference
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    } else if (osDarkMode) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
    });
});