// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Search functionality
window.redirectToHotel = function() {
    const destination = document.getElementById("destination").value.trim();
    
    const destinations = {
        "New York": "pages/New york hotels.html",
        "Paris": "pages/Paris-hotels.html",
        "Dubai": "pages/Dubai-hotels.html",
        "Turkey": "#",
        "Egypt": "#",
        "Maldives": "#"
    };

    if (!destination) {  // If empty search
        const toast = document.createElement('div');
        toast.className = 'search-toast';
        toast.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            Please select a valid destination
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
        return;  // Exit function early
    }

    if (destination in destinations) {
        if (destinations[destination] === "#") {
            const toast = document.createElement('div');
            toast.className = 'search-toast';
            toast.innerHTML = `
                <i class="fas fa-info-circle"></i>
                Coming soon! This destination will be available shortly.
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        } else {
            window.location.href = destinations[destination];
        }
    } else {
        const toast = document.createElement('div');
        toast.className = 'search-toast';
        toast.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            Please select a valid destination
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.hotel-slider');
    const cards = document.querySelectorAll('.country-card');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentIndex = 0;
    const cardsToShow = 4;
    const totalCards = cards.length;

    // نسخ أول 4 كروت وإضافتهم في النهاية
    for (let i = 0; i < cardsToShow; i++) {
        const clone = cards[i].cloneNode(true);
        slider.appendChild(clone);
    }

    function updateSliderPosition() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 20;
        slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }

    function nextSlide() {
        currentIndex++;
        slider.style.transition = 'transform 0.5s ease-in-out';
        updateSliderPosition();

        if (currentIndex === totalCards) {
            setTimeout(() => {
                slider.style.transition = 'none';
                currentIndex = 0;
                updateSliderPosition();
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500);
        }
    }

    function prevSlide() {
        if (currentIndex === 0) {
            currentIndex = totalCards - 1;
            slider.style.transition = 'none';
            updateSliderPosition();
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease-in-out';
                currentIndex--;
                updateSliderPosition();
            }, 50);
        } else {
            currentIndex--;
            updateSliderPosition();
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    //التحرك كل 2000 (2 ثانيه)
    setInterval(nextSlide, 2000);

    // Add click event listeners to all 'coming-soon' buttons
    document.querySelectorAll('.coming-soon').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            
            // Create and show toast message
            const toast = document.createElement('div');
            toast.className = 'search-toast';
            toast.innerHTML = `
                <i class="fas fa-info-circle"></i>
                Coming soon! This destination will be available shortly.
            `;
            document.body.appendChild(toast);
            
            // Remove toast after 3 seconds
            setTimeout(() => {
                toast.remove();
            }, 3000);
        });
    });
});

// Add this CSS for the toast
const style = document.createElement('style');
style.textContent = `
    .search-toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        color: #000;
        padding: 15px 25px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
        z-index: 1000;
    }

    .search-toast i {
        color: #FFA500;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Reviews Slider
document.addEventListener('DOMContentLoaded', function() {
    const reviewsSlider = document.querySelector('.reviews-slider');
    const reviewCards = document.querySelectorAll('.review-card');
    const prevBtn = document.getElementById('reviewPrevBtn');
    const nextBtn = document.getElementById('reviewNextBtn');
    let currentIndex = 0;
    const cardsToShow = 3;
    const totalCards = reviewCards.length;

    // Clone first cards and append to end
    for (let i = 0; i < cardsToShow; i++) {
        const clone = reviewCards[i].cloneNode(true);
        reviewsSlider.appendChild(clone);
    }

    function updateSliderPosition() {
        const cardWidth = reviewCards[0].offsetWidth + 20; // Including margin
        reviewsSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function nextSlide() {
        currentIndex++;
        reviewsSlider.style.transition = 'transform 0.5s ease-in-out';
        updateSliderPosition();

        if (currentIndex === totalCards) {
            setTimeout(() => {
                reviewsSlider.style.transition = 'none';
                currentIndex = 0;
                updateSliderPosition();
                setTimeout(() => {
                    reviewsSlider.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500);
        }
    }

    function prevSlide() {
        if (currentIndex === 0) {
            currentIndex = totalCards - 1;
            reviewsSlider.style.transition = 'none';
            updateSliderPosition();
            setTimeout(() => {
                reviewsSlider.style.transition = 'transform 0.5s ease-in-out';
                currentIndex--;
                updateSliderPosition();
            }, 50);
        } else {
            currentIndex--;
            updateSliderPosition();
        }
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto slide every 4 seconds
    setInterval(nextSlide, 4000);
});
