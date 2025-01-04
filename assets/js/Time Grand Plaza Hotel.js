
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
            alert('Please select check-in and check-out dates');
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
                case 'Deluxe King Room':
                    maxCapacity = 2;
                    break;
                case 'Executive Luxury Suite':
                    maxCapacity = 4;
                    break;
                case 'Presidential Suite':
                    maxCapacity = 6;
                    break;
                case 'Garden Suite':
                    maxCapacity = 3;
                    break;
                case 'Skyline Suite':
                    maxCapacity = 4;
                    break;
                case 'Penthouse Suite':
                    maxCapacity = 8;
                    break;
            }

            // التحقق من توفر الغرفة (محاكاة عشوائية)
            const isAvailable = Math.random() < 0.7; // 70% احتمال التوفر
            
            if (!isAvailable || totalGuests > maxCapacity) {
                // إضافة تنسيق للغرف غير المتاحة
                card.classList.add('room-unavailable');
                const bookBtn = card.querySelector('.book-btn');
                bookBtn.textContent = 'Not Available';
                bookBtn.disabled = true;
                bookBtn.classList.add('disabled');
                
                // إضافة طبقة عدم التوفر
                if (!card.querySelector('.unavailable-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'unavailable-overlay';
                    overlay.innerHTML = '<span>Not Available</span>';
                    card.querySelector('.room-image').appendChild(overlay);
                }
            } else {
                // إزالة تنسيق عدم التوفر
                card.classList.remove('room-unavailable');
                const bookBtn = card.querySelector('.book-btn');
                bookBtn.textContent = 'Book Now';
                bookBtn.disabled = false;
                bookBtn.classList.remove('disabled');
                
                const overlay = card.querySelector('.unavailable-overlay');
                if (overlay) {
                    overlay.remove();
                }
            }
        });

        // التمرير إلى قسم الغرف
        document.querySelector('.rooms-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // Counter Functionality
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
    const hotelName = 'SpringHill Suites Hotel';
    
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
