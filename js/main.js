/* ============================================
   PORTAFOLIO WEB DIDÁCTICO - JavaScript
   Interactividad y animaciones
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // Smooth Scroll para links de navegación
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            // Cerrar menú mobile al hacer click
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // ============================================
    // Navbar scroll effect
    // ============================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
            navbar.style.padding = '8px 0';
        } else {
            navbar.classList.remove('shadow');
            navbar.style.padding = '12px 0';
        }
    });

    // ============================================
    // Active nav link on scroll
    // ============================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    function revealOnScroll() {
        const cards = document.querySelectorAll('.card-actividad, .card-expo, .card-pastel, .card-profile');
        const windowHeight = window.innerHeight;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    // Initial state for scroll animations
    document.querySelectorAll('.card-actividad, .card-expo').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // trigger on load

    // ============================================
    // Fun cursor trail effect (subtle)
    // ============================================
    const colors = ['#FFB6C1', '#AED8F2', '#FFF3B0', '#B5EAD7', '#D4A5D6'];
    let trailEnabled = window.innerWidth > 768;

    if (trailEnabled) {
        document.addEventListener('mousemove', function (e) {
            if (Math.random() > 0.92) {
                createSparkle(e.clientX, e.clientY);
            }
        });
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            animation: sparkle-fade 1s ease-out forwards;
        `;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }

    // Add sparkle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle-fade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // Typing effect for section titles on hover
    // ============================================
    document.querySelectorAll('.section-title').forEach(title => {
        title.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        title.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // Counter animation for badge numbers
    // ============================================
    const badges = document.querySelectorAll('.badge-number');
    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pop-in 0.5s ease';
            }
        });
    }, observerOptions);

    badges.forEach(badge => observer.observe(badge));

    // Add pop-in animation
    const popStyle = document.createElement('style');
    popStyle.textContent = `
        @keyframes pop-in {
            0% { transform: scale(0); }
            70% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(popStyle);

});
