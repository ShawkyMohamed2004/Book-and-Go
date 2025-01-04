
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    setInterval(nextSlide, 5000);
});


document.addEventListener('DOMContentLoaded', function() {
    // تعطيل جميع أزرار الحجز عند تحميل الصفحة
    const bookButtons = document.querySelectorAll('.book-btn');
    bookButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });

    // تفعيل الأزرار عند الضغط على زر البحث
    document.querySelector('.search-rooms-btn').addEventListener('click', function() {
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        
        if (!checkIn || !checkOut) {
            showAlert('Booking Required', 'Please select your check-in and check-out dates.');
            return;
        }

        // الحصول على عدد الضيوف
        const adults = parseInt(document.querySelector('.search-field:nth-child(3) .counter-value').textContent);
        const children = parseInt(document.querySelector('.search-field:nth-child(4) .counter-value').textContent);
        const totalGuests = adults + children;

        // التحقق من جميع الغرف
        const roomCards = document.querySelectorAll('.room-card');
        roomCards.forEach(card => {
            // تحديد السعة القصوى للغرفة
            let maxCapacity;
            const roomType = card.querySelector('h3').textContent;
            
            switch(roomType) {
                case 'Deluxe Room': maxCapacity = 2; break;
                case 'Standard Room': maxCapacity = 3; break;
                case 'Presidential Suite': maxCapacity = 6; break;
                case 'Ocean View Suite': maxCapacity = 3; break;
                case 'Family Suite': maxCapacity = 4; break;
                case 'Royal Penthouse': maxCapacity = 8; break;
            }

            // التحقق من توفر الغرفة
            const isAvailable = Math.random() < 0.7;
            
            if (!isAvailable || totalGuests > maxCapacity) {
                card.classList.add('room-unavailable');
                const bookBtn = card.querySelector('.book-btn');
                bookBtn.textContent = 'Not Available';
                bookBtn.disabled = true;
                bookBtn.classList.add('disabled');
                
                if (!card.querySelector('.unavailable-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'unavailable-overlay';
                    overlay.innerHTML = '<span>Not Available</span>';
                    card.querySelector('.room-image').appendChild(overlay);
                }
            } else {
                card.classList.remove('room-unavailable');
                const bookBtn = card.querySelector('.book-btn');
                bookBtn.textContent = 'Book Now';
                bookBtn.disabled = false;
                bookBtn.classList.remove('disabled');
                
                const overlay = card.querySelector('.unavailable-overlay');
                if (overlay) overlay.remove();
            }
        });

        document.querySelector('.rooms-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // وظائف العداد
    const counters = document.querySelectorAll('.counter-input');
    counters.forEach(counter => {
        const minusBtn = counter.querySelector('.minus');
        const plusBtn = counter.querySelector('.plus');
        const valueSpan = counter.querySelector('.counter-value');
        
        const isAdults = counter.closest('.search-field').querySelector('label').textContent.includes('Adults');
        const minValue = isAdults ? 1 : 0;
        const maxValue = 10;
        
        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(valueSpan.textContent);
            if (currentValue > minValue) {
                valueSpan.textContent = currentValue - 1;
            }
            updateButtonStates();
        });
        
        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(valueSpan.textContent);
            if (currentValue < maxValue) {
                valueSpan.textContent = currentValue + 1;
            }
            updateButtonStates();
        });
        
        function updateButtonStates() {
            const currentValue = parseInt(valueSpan.textContent);
            minusBtn.disabled = currentValue <= minValue;
            plusBtn.disabled = currentValue >= maxValue;
            minusBtn.classList.toggle('disabled', currentValue <= minValue);
            plusBtn.classList.toggle('disabled', currentValue >= maxValue);
        }
        
        updateButtonStates();
    });
});

// وظيفة الحجز
function bookRoom(roomCard) {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const adults = parseInt(document.querySelector('.search-field:nth-child(3) .counter-value').textContent);
    const children = parseInt(document.querySelector('.search-field:nth-child(4) .counter-value').textContent);
    
    const roomImage = roomCard.querySelector('.room-image img').src;
    const roomType = roomCard.querySelector('h3').textContent;
    const price = parseFloat(roomCard.querySelector('.price').textContent.replace('$', ''));
    const hotelName = 'Millennium Hotel';
    
    const bookingDetails = {
        hotel: hotelName,
        roomType: roomType,
        roomImage: roomImage,
        checkIn: checkIn,
        checkOut: checkOut,
        adults: adults,
        children: children,
        price: price
    };
    
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    window.location.href = 'booking.html';
}

window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

function showAlert(title, message) {
    const alertTitle = document.querySelector('.alert-title');
    const alertMessage = document.querySelector('.alert-message');
    
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    
    document.querySelector('.overlay').classList.add('show');
    document.querySelector('.custom-alert').classList.add('show');
}

function closeAlert() {
    document.querySelector('.overlay').classList.remove('show');
    document.querySelector('.custom-alert').classList.remove('show');
}

// تحديث معالج حدث زر البحث
document.querySelector('.search-rooms-btn').addEventListener('click', function() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    
    if (!checkIn || !checkOut) {
        showAlert('Select Dates', 'Please select your check-in and check-out dates first.');
        return;
    }
    
    // باقي كود البحث الأصلي...
});

// Special Offers Functions
function bookOffer(offerName, basePrice) {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    
    if (!checkIn || !checkOut) {
        showAlert('Booking Required', 'Please select your check-in and check-out dates before booking this special offer.');
        return;
    }

    const offerDetails = {
        hotel: 'Millennium Hotel',
        offerName: offerName,
        basePrice: basePrice,
        checkIn: checkIn,
        checkOut: checkOut,
        finalPrice: calculateOfferPrice(offerName, basePrice),
        features: getOfferFeatures(offerName)
    };

    // Show confirmation modal
    showOfferConfirmation(offerDetails);
}

function calculateOfferPrice(offerName, basePrice) {
    const checkIn = new Date(document.getElementById('checkIn').value);
    const checkOut = new Date(document.getElementById('checkOut').value);
    const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    
    let finalPrice = basePrice;
    
    switch(offerName) {
        case 'Weekend Escape':
            finalPrice = basePrice * 0.8; // 20% discount
            break;
        case 'Honeymoon Package':
            finalPrice = basePrice + 100; // Additional services
            break;
        case 'Business Special':
            finalPrice = basePrice + 50; // Business services
            break;
    }
    
    return finalPrice * nights;
}

function showOfferConfirmation(details) {
    const modalContent = `
        <div class="offer-confirmation">
            <h4>${details.offerName}</h4>
            <p>Check-in: ${details.checkIn}</p>
            <p>Check-out: ${details.checkOut}</p>
            <p>Total Price: $${details.finalPrice}</p>
            <div class="offer-features">
                ${details.features.map(feature => 
                    `<span><i class="fas fa-check"></i> ${feature}</span>`
                ).join('')}
            </div>
            <button class="confirm-btn" onclick="confirmBooking(${JSON.stringify(details)})">
                Confirm Booking
            </button>
        </div>
    `;
    
    document.querySelector('.modal-body').innerHTML = modalContent;
    new bootstrap.Modal(document.getElementById('offerDetailsModal')).show();
}

function confirmBooking(details) {
    localStorage.setItem('bookingDetails', JSON.stringify(details));
    window.location.href = 'booking.html';
}
