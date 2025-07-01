
// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate skill bars when skills section comes into view
            if (entry.target.classList.contains('skills')) {
                setTimeout(animateSkillBars, 500);
            }
            
            // Counter animation for stats
            if (entry.target.classList.contains('hero')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + (target > 100 ? '+' : target === 98 ? '%' : '+');
        }, 16);
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                border-left: 4px solid var(--success-color);
            }
            
            .notification.error {
                border-left-color: var(--error-color);
            }
            
            .notification i:first-child {
                color: var(--success-color);
                font-size: 1.2rem;
            }
            
            .notification.error i:first-child {
                color: var(--error-color);
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                color: var(--text-light);
                margin-left: auto;
            }
            
            .notification-close:hover {
                color: var(--text-dark);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// CV Download function
function downloadCV() {
    // In a real implementation, this would download an actual CV file
    showNotification('CV download will be available soon. Please contact me directly for now.', 'info');
}

// Project view buttons
document.querySelectorAll('.btn-view-project').forEach(button => {
    button.addEventListener('click', function() {
        const projectCard = this.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        
        // Create modal for project details
        showProjectModal(projectTitle);
    });
});

// Project modal
function showProjectModal(projectTitle) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${projectTitle}</h2>
                <button class="modal-close" onclick="this.closest('.project-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>Detailed project information would be displayed here, including:</p>
                <ul>
                    <li>Complete project overview and objectives</li>
                    <li>Detailed methodology and approach</li>
                    <li>Data sources and collection methods</li>
                    <li>Analysis techniques and tools used</li>
                    <li>Visual representations and dashboards</li>
                    <li>Key findings and recommendations</li>
                    <li>Business impact and outcomes</li>
                </ul>
                <p>For the complete case study and live dashboard access, please contact me directly.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="this.closest('.project-modal').remove()">Close</button>
            </div>
        </div>
    `;
    
    // Add modal styles if not already added
    if (!document.querySelector('.modal-styles')) {
        const styles = document.createElement('style');
        styles.className = 'modal-styles';
        styles.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-header h2 {
                margin: 0;
                color: var(--text-dark);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-light);
                padding: 0.5rem;
            }
            
            .modal-close:hover {
                color: var(--text-dark);
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .modal-body ul {
                margin: 1rem 0;
                padding-left: 1.5rem;
            }
            
            .modal-body li {
                margin-bottom: 0.5rem;
                color: var(--text-light);
            }
            
            .modal-footer {
                padding: 1rem 2rem 2rem;
                text-align: right;
            }
            
            @keyframes slideUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loading');
    
    // Initialize skill bar animations
    setTimeout(() => {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection && isElementInViewport(skillsSection)) {
            animateSkillBars();
        }
    }, 1000);
});

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes modals and mobile menu
    if (e.key === 'Escape') {
        const modal = document.querySelector('.project-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
        
        if (navMenu && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Console welcome message
console.log(`
🚀 Welcome to Ahmadraza Danmole's Portfolio!
📊 Data Analyst | Power BI Expert
📧 Contact: danmoleomomayowa@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/ahmadraza-danmole-62202122a/
`);
