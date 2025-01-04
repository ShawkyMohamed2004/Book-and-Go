// Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Initialize slider when page loads
document.addEventListener('DOMContentLoaded', initSlider);

// في بداية الملف، قبل event listeners
function validateDates() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const searchButton = document.querySelector('.search-rooms-btn');
    const bookButtons = document.querySelectorAll('.book-btn');

    if (checkIn && checkOut) {
        // تحويل التواريخ إلى كائنات Date
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkInDate >= today && checkOutDate > checkInDate) {
            // التواريخ صحيحة
            searchButton.disabled = false;
            searchButton.style.opacity = '1';
            searchButton.style.cursor = 'pointer';

            bookButtons.forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            });
        } else {
            // التواريخ غير صحيحة
            searchButton.disabled = true;
            searchButton.style.opacity = '0.5';
            searchButton.style.cursor = 'not-allowed';

            bookButtons.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // التحقق من وجود العناصر قبل إضافة المستمعين
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const counterButtons = document.querySelectorAll('.counter-btn');
    
    if (checkInInput && checkOutInput) {
        // إضافة المستمعين لحقول التاريخ
        checkInInput.addEventListener('change', validateDates);
        checkOutInput.addEventListener('change', validateDates);
    }
    
    if (counterButtons.length > 0) {
        // إضافة المستمعين لأزرار العداد
        counterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.classList.contains('plus') ? 'increment' : 'decrement';
                const counterValue = this.parentElement.querySelector('.counter-value');
                updateCounter(counterValue, action);
            });
        });
    }

    // تعريف معدلات التحويل
    const exchangeRates = {
        USD: 1,
        EUR: 22,
        GBP: 50
    };

    let currentCurrency = 'USD';

    // تفعيل قائمة العملات
    const currencyDropdown = document.getElementById('currencyDropdown');
    const currencyLinks = document.querySelectorAll('[data-currency]');

    if (currencyLinks) {
        currencyLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const newCurrency = this.getAttribute('data-currency');
                changeCurrency(newCurrency);
            });
        });
    }

    // دالة تغيير العملة
    function changeCurrency(newCurrency) {
        if (newCurrency === currentCurrency) return;

        const prices = document.querySelectorAll('.price');
        if (prices) {
            prices.forEach(price => {
                const numericValue = parseFloat(price.textContent.replace(/[^0-9.]/g, ''));
                if (!isNaN(numericValue)) {
                    const newPrice = (numericValue / exchangeRates[currentCurrency]) * exchangeRates[newCurrency];
                    price.textContent = `${getCurrencySymbol(newCurrency)}${newPrice.toFixed(2)}`;
                }
            });
        }

        currentCurrency = newCurrency;
        
        // الانتقال إلى قسم الغرف
        const roomsSection = document.querySelector('.rooms-section');
        if (roomsSection) {
            roomsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // دالة الحصول على رمز العملة
    function getCurrencySymbol(currency) {
        switch(currency) {
            case 'USD': return '$';
            case 'EUR': return '€';
            case 'GBP': return '£';
            default: return '$';
        }
    }

    // تعطيل زر البحث وأزرار Book في البداية
    const searchButton = document.querySelector('.search-rooms-btn');
    const bookButtons = document.querySelectorAll('.book-btn');
    
    searchButton.disabled = true;
    searchButton.style.opacity = '0.5';
    searchButton.style.cursor = 'not-allowed';

    bookButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
    });

    // Slider Functionality
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        initSlider();
    }

    // Counter Functionality
    const counterInputs = document.querySelectorAll('.counter-input');
    if (counterInputs) {
        counterInputs.forEach(container => {
            const minusBtn = container.querySelector('.counter-btn.minus');
            const plusBtn = container.querySelector('.counter-btn.plus');
            const valueSpan = container.querySelector('.counter-value');
            
            if (minusBtn && plusBtn && valueSpan) {
                let value = parseInt(valueSpan.textContent);

                minusBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (value > 0) {
                        value--;
                        valueSpan.textContent = value;
                        checkSearchFields();
                    }
                });

                plusBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (value < 10) {
                        value++;
                        valueSpan.textContent = value;
                        checkSearchFields();
                    }
                });
            }
        });
    }

    // تفعيل زر البحث عند إدخال البيانات
    function checkSearchFields() {
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const adults = parseInt(document.querySelector('.search-field:nth-child(3) .counter-value').textContent);

        if (checkIn && checkOut && adults > 0) {
            searchButton.disabled = false;
            searchButton.style.opacity = '1';
            searchButton.style.cursor = 'pointer';
        } else {
            searchButton.disabled = true;
            searchButton.style.opacity = '0.5';
            searchButton.style.cursor = 'not-allowed';
        }
    }

    // إضافة مراقبة التغييرات
    document.getElementById('checkIn').addEventListener('change', checkSearchFields);
    document.getElementById('checkOut').addEventListener('change', checkSearchFields);

    // تعريف السعات للغرف
    const roomCapacities = {
        'Deluxe King Room': { min: 1, max: 2 },
        'Executive Luxury Suite': { min: 1, max: 4 },
        'Presidential Suite': { min: 2, max: 6 },
        'Garden Suite': { min: 1, max: 3 },
        'Skyline Suite': { min: 2, max: 4 },
        'Penthouse Suite': { min: 2, max: 8 }
    };

    // معالجة زر البحث
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const adults = parseInt(document.querySelector('.search-field:nth-child(3) .counter-value').textContent);
        const children = parseInt(document.querySelector('.search-field:nth-child(4) .counter-value').textContent);
        
        if (!checkIn || !checkOut || adults === 0) {
            const toast = document.createElement('div');
            toast.className = 'search-toast';
            toast.innerHTML = `
                <i class="fas fa-exclamation-circle" style="color: #FFA500;"></i>
                Please select dates and number of guests
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
            return;
        }

        const totalGuests = adults + children;
        let availableRooms = 0;

        // فلترة الغرف حسب عدد الضيوف
        const roomCards = document.querySelectorAll('.room-card');
        roomCards.forEach(card => {
            const roomTitle = card.querySelector('h3').textContent.trim();
            const capacity = roomCapacities[roomTitle];
            const bookBtn = card.querySelector('.book-btn');

            if (capacity && totalGuests >= capacity.min && totalGuests <= capacity.max) {
                // الغرفة متاحة
                card.style.opacity = '1';
                card.style.pointerEvents = 'all';
                bookBtn.disabled = false;
                bookBtn.style.opacity = '1';
                bookBtn.style.cursor = 'pointer';
                availableRooms++;
            } else {
                // الغرفة غير متاحة
                card.style.opacity = '0.5';
                card.style.pointerEvents = 'none';
                bookBtn.disabled = true;
                bookBtn.style.opacity = '0.5';
                bookBtn.style.cursor = 'not-allowed';
            }
        });

        // عرض رسالة النتيجة
        const successToast = document.createElement('div');
        successToast.className = 'search-toast';
        
        if (availableRooms > 0) {
            successToast.innerHTML = `
                <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
                Found ${availableRooms} available rooms for ${totalGuests} guests
            `;
            document.querySelector('.rooms-section').scrollIntoView({ behavior: 'smooth' });
        } else {
            successToast.innerHTML = `
                <i class="fas fa-exclamation-circle" style="color: #FFA500;"></i>
                No rooms available for ${totalGuests} guests
            `;
        }

        document.body.appendChild(successToast);
        setTimeout(() => successToast.remove(), 3000);
    });

    // Dining Button Functionality
    const diningBtn = document.getElementById('diningBtn');
    const diningSection = document.getElementById('dining-section');
    
    if (diningBtn && diningSection) {
        diningSection.style.display = 'none';
        
        diningBtn.addEventListener('click', function(e) {
            e.preventDefault();
            diningSection.style.display = 'block';
            diningSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // تفعيل القوائم المنسدلة
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        new bootstrap.Dropdown(dropdown);
    });

    // تفعيل زر العروض الفاخرة
    const luxuryBtn = document.getElementById('luxuryOffersBtn');
    const luxuryOffersSection = document.querySelector('.luxury-offers');
    
    if (luxuryBtn && luxuryOffersSection) {
        // إخفاء القسم في البداية
        luxuryOffersSection.style.display = 'none';
        
        luxuryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (luxuryOffersSection.style.display === 'none') {
                // إظهار القسم
                luxuryOffersSection.style.display = 'block';
                
                // تأثير الظهور التدريجي
                luxuryOffersSection.style.opacity = '0';
                luxuryOffersSection.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    luxuryOffersSection.style.opacity = '1';
                }, 100);
                
                // التمرير إلى القسم
                luxuryOffersSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // إخفاء القسم
                luxuryOffersSection.style.opacity = '0';
                setTimeout(() => {
                    luxuryOffersSection.style.display = 'none';
                }, 500);
            }
        });
    }

    // تفعيل أزرار View Package
    const viewButtons = document.querySelectorAll('.btn-view');
    if (viewButtons) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.offer-card');
                if (card) {
                    const content = card.querySelector('.offer-content');
                    if (content) {
                        // حفظ المحتوى الأصلي
                        const originalContent = content.innerHTML;
                        
                        // عرض نموذج الحجز
                        const bookingForm = `
                            <div class="booking-form">
                                <h3>Book ${card.querySelector('.offer-title').textContent}</h3>
                                <p class="price-display">${card.querySelector('.offer-price').textContent}</p>
                                
                                <div class="form-group">
                                    <label>Check-in Date</label>
                                    <input type="date" class="form-control check-in" required>
                                </div>
                                
                                <div class="form-group">
                                    <label>Check-out Date</label>
                                    <input type="date" class="form-control check-out" required>
                                </div>
                                
                                <div class="form-group">
                                    <label>Number of Guests</label>
                                    <select class="form-control guests" required>
                                        <option value="">Select number of guests</option>
                                        <option value="1">1 Guest</option>
                                        <option value="2">2 Guests</option>
                                        <option value="3">3 Guests</option>
                                        <option value="4">4 Guests</option>
                                    </select>
                                </div>
                                
                                <button class="confirm-booking book-now">Confirm Booking</button>
                                <button class="back-to-offer">Back</button>
                            </div>
                        `;
                        
                        // عرض نموذج الحجز
                        content.innerHTML = bookingForm;
                        
                        // تفعيل زر التأكيد
                        const confirmBtn = content.querySelector('.confirm-booking');
                        confirmBtn.addEventListener('click', () => {
                            const checkIn = content.querySelector('.check-in').value;
                            const checkOut = content.querySelector('.check-out').value;
                            const guests = content.querySelector('.guests').value;
                            
                            if (!checkIn || !checkOut || !guests) {
                                alert('Please select check-in and check-out dates and guests');
                                return;
                            }
                            
                            // جمع بيانات العرض
                            const offerCard = card;
                            const offerTitle = offerCard.querySelector('.offer-title').textContent;
                            const offerPrice = offerCard.querySelector('.offer-price').textContent;
                            const offerImage = offerCard.querySelector('.offer-image img').src;
                            const offerDescription = offerCard.querySelector('.offer-description').textContent;
                            const features = [];
                            offerCard.querySelectorAll('.feature-tag').forEach(tag => {
                                features.push(tag.innerHTML);
                            });

                            // تحويل البيانات إلى URL parameters
                            const bookingData = new URLSearchParams({
                                title: offerTitle,
                                price: offerPrice,
                                checkIn: checkIn,
                                checkOut: checkOut,
                                guests: guests,
                                image: offerImage,
                                description: offerDescription,
                                features: JSON.stringify(features)
                            });

                            // التحويل إلى صفحة الحجز مع البيانات
                            window.location.href = `booking.html?${bookingData.toString()}`;
                        });
                        
                        // تفعيل زر العودة
                        const backBtn = content.querySelector('.back-to-offer');
                        backBtn.addEventListener('click', () => {
                            content.innerHTML = originalContent;
                        });
                    }
                }
            });
        });
    }

    // Room booking function
    function bookRoom(roomId) {
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const adults = document.querySelector('.adults-counter .counter-value').textContent;
        const children = document.querySelector('.children-counter .counter-value').textContent;

        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }

        // Store booking details
        const bookingDetails = {
            roomId: roomId,
            checkIn: checkIn,
            checkOut: checkOut,
            guests: {
                adults: parseInt(adults),
                children: parseInt(children)
            }
        };

        // Store in localStorage
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        // Redirect to booking page
        window.location.href = 'booking.html';
    }

    // Create room cards function
    function createRoomCards() {
        const roomsContainer = document.querySelector('.room-cards');
        if (!roomsContainer) return;

        roomsData.rooms.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.className = 'room-card';
            roomCard.innerHTML = `
                <div class="room-image">
                    <img src="${room.image}" alt="${room.name}">
                    ${room.tag ? `<span class="room-tag ${room.tagClass}">${room.tag}</span>` : ''}
                </div>
                <div class="room-details">
                    <h3>${room.name}</h3>
                    <p>${room.description}</p>
                    <div class="room-features">
                        ${room.features.map(feature => `
                            <span class="feature">
                                <i class="fas ${feature.icon}"></i> ${feature.text}
                            </span>
                        `).join('')}
                    </div>
                    <div class="room-price">
                        <span class="price">$${room.price}</span>
                        <span class="per-night">per night</span>
                    </div>
                    <button class="btn btn-primary book-btn" onclick="bookRoom(${room.id})">
                        Book Now
                    </button>
                </div>
            `;
            roomsContainer.appendChild(roomCard);
        });
    }

    // Currency Menu Toggle
    function toggleCurrencyMenu(event) {
        event.stopPropagation();
        const dropdown = document.getElementById('currencyDropdown');
        dropdown.classList.toggle('show');
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('currencyDropdown');
        const currencySelector = document.querySelector('.currency-selector');
        
        if (currencySelector && dropdown && !currencySelector.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Currency Change and Scroll
    function changeCurrencyAndScroll(currency) {
        changeCurrency(currency);
        document.querySelector('.rooms-section').scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Room Availability Check
    function checkRoomAvailability(roomType, guests) {
        const maxCapacity = {
            'Deluxe King Room': 2,
            'Executive Luxury Suite': 4,
            'Presidential Suite': 6,
            'Garden Suite': 3,
            'Skyline Suite': 4,
            'Penthouse Suite': 8
        };
        
        return guests <= maxCapacity[roomType];
    }

    // Date Validation
    document.getElementById('checkOut').addEventListener('change', function() {
        const checkIn = new Date(document.getElementById('checkIn').value);
        const checkOut = new Date(this.value);
        
        if (checkOut <= checkIn) {
            alert('Check-out date must be after check-in date');
            this.value = '';
        }
    });

  

    // تعيين الحد الأدنى للتاريخ (اليوم)
    const bookingDate = document.getElementById('bookingDate');
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.min = today;
    }

    // معالجة نموذج حجز الطاولة
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من البيانات المطلوبة
            const date = document.getElementById('bookingDate').value;
            const time = document.getElementById('bookingTime').value;
            const guests = document.getElementById('guestCount').value;
            const restaurant = document.getElementById('restaurant').value;

            if (!date || !time || !guests || !restaurant) {
                showToast('error', 'Please fill in all required fields');
                return;
            }

            // حفظ بيانات الحجز
            const reservationData = {
                date: date,
                time: time,
                guests: guests,
                restaurant: restaurant,
                requests: document.getElementById('specialRequests').value,
                id: Date.now()
            };

            // حفظ في localStorage
            const reservations = JSON.parse(localStorage.getItem('diningReservations') || '[]');
            reservations.push(reservationData);
            localStorage.setItem('diningReservations', JSON.stringify(reservations));

            // عرض رسالة النجاح
            showToast('success', 'Your table has been successfully reserved!');
            
            // إعادة تعيين النموذج
            reservationForm.reset();
        });
    }

    // تعديل خيارات المطاعم في نموذج الحجز
    const restaurantOptions = {
        grand: {
            name: "The Grand Restaurant",
            cuisine: "International Cuisine",
            hours: "6:30 AM - 11:00 PM",
            capacity: 220
        },
        manhattan: {
            name: "The Manhattan Grill",
            cuisine: "American Steakhouse",
            hours: "2:00 PM - 5:00 PM",
            capacity: 100
        }
    };

    // بيانات الغرف
    const roomsData = {
        rooms: [
            {
                id: 1,
                name: "Deluxe King Room",
                price: 250,
                image: "../assets/images/room1 spring.jpg",
                maxAdults: 2,
                maxChildren: 1,
                features: ["King Bed", "45m", "City View"],
                amenities: ["Free WiFi", "Luxury Bathroom", "Room Service"],
                rating: 5,
                reviews: 128,
                type: "standard"
            },
            {
                id: 2,
                name: "Executive Luxury Suite",
                price: 450,
                image: "../assets/images/room2 spring.jpg",
                maxAdults: 3,
                maxChildren: 2,
                features: ["King Bed", "65m²", "Ocean View"],
                amenities: ["Free WiFi", "Jacuzzi", "24/7 Service"],
                rating: 5,
                reviews: 96,
                type: "premium"
            },
            {
                id: 3,
                name: "Presidential Suite",
                price: 1200,
                image: "../assets/images/room3 spring.jpg",
                maxAdults: 4,
                maxChildren: 2,
                features: ["2 King Beds", "120m²", "Panoramic View"],
                amenities: ["Private Pool", "Butler Service", "Private Bar"],
                rating: 5,
                reviews: 64,
                type: "luxury"
            },
            {
                id: 4,
                name: "Garden Suite",
                price: 350,
                image: "../assets/images/room4 spring.jpg",
                maxAdults: 2,
                maxChildren: 2,
                features: ["Queen Bed", "55m²", "Garden View"],
                amenities: ["Free WiFi", "Private Garden", "Breakfast Included"],
                rating: 4,
                reviews: 82,
                type: "premium"
            },
            {
                id: 5,
                name: "Skyline Suite",
                price: 550,
                image: "../assets/images/room5 spring.jpg",
                maxAdults: 3,
                maxChildren: 2,
                features: ["King Bed", "75m²", "City Skyline View"],
                amenities: ["Free WiFi", "Private Balcony", "Executive Lounge"],
                rating: 5,
                reviews: 73,
                type: "premium"
            },
            {
                id: 6,
                name: "Penthouse Suite",
                price: 1400,
                image: "../assets/images/room6 spring.jpg",
                maxAdults: 6,
                maxChildren: 3,
                features: ["3 King Beds", "200m²", "360° View"],
                amenities: ["Private Terrace", "Personal Chef", "Helicopter Service"],
                rating: 5,
                reviews: 45,
                type: "luxury"
            }
        ]
    };

    // دالة إنشاء بطاقات الغرف
    function createRoomCards() {
        const roomsContainer = document.querySelector('.room-cards');
        if (!roomsContainer) return;
        
        roomsContainer.innerHTML = ''; // مسح المحتوى السابق
        
        roomsData.rooms.forEach(room => {
            const roomCard = `
                <div class="room-card ${room.type}">
                    <div class="room-image">
                        <img src="${room.image}" alt="${room.name}">
                        <span class="room-tag">${room.type.charAt(0).toUpperCase() + room.type.slice(1)}</span>
                    </div>
                    <div class="room-details">
                        <h3>${room.name}</h3>
                        <div class="room-rating">
                            <div class="stars">
                                ${'<i class="fas fa-star"></i>'.repeat(room.rating)}
                                ${'<i class="far fa-star"></i>'.repeat(5 - room.rating)}
                            </div>
                            <span>(${room.reviews} reviews)</span>
                        </div>
                        <div class="room-capacity">
                            <span><i class="fas fa-user"></i> Max Adults: ${room.maxAdults}</span>
                            <span><i class="fas fa-child"></i> Max Children: ${room.maxChildren}</span>
                        </div>
                        <div class="room-features">
                            ${room.features.map(feature => `
                                <span><i class="fas fa-check"></i> ${feature}</span>
                            `).join('')}
                        </div>
                        <div class="room-amenities">
                            ${room.amenities.map(amenity => `
                                <span><i class="fas fa-concierge-bell"></i> ${amenity}</span>
                            `).join('')}
                        </div>
                        <div class="room-price">
                            <div class="price-details">
                                <span class="price">$${room.price}</span>
                                <span class="per-night">/night</span>
                            </div>
                            <button class="book-btn" onclick="bookRoom(${room.id})">Book Now</button>
                        </div>
                    </div>
                </div>
            `;
            roomsContainer.innerHTML += roomCard;
        });
    }

    // دالة حجز الغرفة
    function bookRoom(roomId) {
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        
        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }
        
        const adults = parseInt(document.querySelector('.adults-count').textContent);
        const children = parseInt(document.querySelector('.children-count').textContent);
        
        const room = roomsData.rooms.find(r => r.id === roomId);
        
        if (adults > room.maxAdults || children > room.maxChildren) {
            alert(`This room can only accommodate up to ${room.maxAdults} adults and ${room.maxChildren} children`);
            return;
        }
        
        const bookingDetails = {
            hotel: "SpringHill Suites Hotel",
            roomId: roomId,
            roomType: room.name,
            roomImage: room.image,
            price: room.price,
            checkIn: checkIn,
            checkOut: checkOut,
            adults: adults,
            children: children,
            features: room.features,
            amenities: room.amenities
        };
        
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        window.location.href = 'booking.html';
    }

    // تحديث الأسعار حسب العملة
    function updatePrices(currency) {
        const rooms = document.querySelectorAll('.room-card');
        const exchangeRates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.73
        };

        rooms.forEach((roomCard, index) => {
            const priceElement = roomCard.querySelector('.price');
            const originalPrice = roomsData.rooms[index].price;
            const newPrice = originalPrice * exchangeRates[currency];
            const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
            priceElement.textContent = `${currencySymbol}${newPrice.toFixed(2)}`;
        });
    }

    // Restaurant Menu Data
    const menuData = {
        grand: {
            title: "The Grand Restaurant",
            subtitle: "International Fine Dining",
            categories: {
                starters: [
                    {
                        name: "Royal Caviar Selection",
                        description: "Premium Osetra caviar served with traditional garnishes and blinis",
                        price: 180,
                        image: "../assets/images/Royal Caviar Selection.jpg"
                    },
                    {
                        name: "Foie Gras Terrine",
                        description: "House-made foie gras with brioche and fig compote",
                        price: 95,
                        image: "../assets/images/foie-gras.jpg"
                    },
                    {
                        name: "Lobster Bisque",
                        description: "Creamy lobster soup with cognac and fresh herbs",
                        price: 65,
                        image: "../assets/images/Lobster Thermidor.jpg"
                    }
                ],
                mains: [
                    {
                        name: "Wagyu Beef Tenderloin",
                        description: "A5 Japanese Wagyu with truffle sauce and seasonal vegetables",
                        price: 250,
                        image: "../assets/images/Wagyu Teppanyaki.jpg"
                    },
                    {
                        name: "Mediterranean Sea Bass",
                        description: "Wild-caught sea bass with artichoke and saffron sauce",
                        price: 120,
                        image: "../assets/images/Mediterranean Sea Bass.jpg"
                    },
                    {
                        name: "Duck à l'Orange",
                        description: "Classic French duck with orange sauce and root vegetables",
                        price: 110,
                        image: "../assets/images/duck.jpg"
                    }
                ],
                desserts: [
                    {
                        name: "Grand Chocolate Soufflé",
                        description: "Valrhona chocolate soufflé with vanilla ice cream",
                        price: 45,
                        image: "../assets/images/Chocolate Foundant .jpg"
                    },
                    {
                        name: "Crème Brûlée",
                        description: "Classic French vanilla custard with caramelized sugar",
                        price: 35,
                        image: "../assets/images/Crème Brûlée.jpg"
                    }
                ]
            }
        },
        manhattan: {
            title: "Manhattan Grill",
            subtitle: "Premium American Steakhouse",
            categories: {
                appetizers: [
                    {
                        name: "Jumbo Shrimp Cocktail",
                        description: "Wild-caught shrimp with house-made cocktail sauce",
                        price: 55,
                        image: "../assets/images/Jumbo Shrimp Cocktail.jpg"
                    },
                    {
                        name: "Classic Caesar Salad",
                        description: "Prepared tableside with aged parmesan and garlic croutons",
                        price: 40,
                        image: "../assets/images/Caesar Salad.jpg"
                    },
                    {
                        name: "Crab Cakes",
                        description: "Maryland style crab cakes with remoulade sauce",
                        price: 65,
                        image: "../assets/images/Crab Cakes.jpg"
                    }
                ],
                steaks: [
                    {
                        name: "Tomahawk Ribeye",
                        description: "45-day dry-aged 32oz bone-in ribeye",
                        price: 195,
                        image: "../assets/images/Tomahawk Ribeye.jpg"
                    },
                    {
                        name: "Filet Mignon",
                        description: "8oz center cut with roasted bone marrow",
                        price: 125,
                        image: "../assets/images/Filet Mignon.jpg"
                    },
                    {
                        name: "New York Strip",
                        description: "16oz prime cut with herb butter",
                        price: 110,
                        image: "../assets/images/New York Strip.jpg"
                    }
                ],
                seafood: [
                    {
                        name: "Maine Lobster",
                        description: "2lb whole lobster with drawn butter",
                        price: 180,
                        image: "../assets/images/Maine Lobster.jpg"
                    },
                    {
                        name: "Alaskan King Crab",
                        description: "1lb of king crab legs with lemon butter",
                        price: 165,
                        image: "../assets/images/Alaskan King Crab.jpg"
                    }
                ]
            }
        }
    };

    // Function to show menu
    function showMenu(restaurantId) {
        const menuModal = document.getElementById('menuModal');
        if (!menuModal) {
            console.error('Menu modal not found');
            return;
        }

        const modalTitle = menuModal.querySelector('.modal-title');
        const modalBody = menuModal.querySelector('.modal-body .menu-content');
        
        if (!modalTitle || !modalBody) {
            console.error('Modal elements not found');
            return;
        }
        
        const restaurant = menuData[restaurantId];
        if (!restaurant) {
            console.error('Restaurant data not found for:', restaurantId);
            return;
        }

        modalTitle.textContent = restaurant.title;
        
        let menuHTML = `
            <h4 class="menu-subtitle">${restaurant.subtitle}</h4>
        `;
        
        for (const [category, items] of Object.entries(restaurant.categories)) {
            menuHTML += `
                <div class="menu-section">
                    <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    <div class="menu-items">
                        ${items.map(item => `
                            <div class="menu-item">
                                <div class="menu-item-image">
                                    <img src="${item.image}" alt="${item.name}">
                                </div>
                                <div class="menu-item-details">
                                    <h4 class="menu-item-title">${item.name}</h4>
                                    <p class="menu-item-description">${item.description}</p>
                                    <span class="menu-item-price">$${item.price}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        modalBody.innerHTML = menuHTML;

        // استخدام Bootstrap Modal
        const bsModal = new bootstrap.Modal(menuModal);
        bsModal.show();
    }

    // تفعيل أزرار القائمة
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM Content Loaded');
        
        // Initialize menu buttons
        const menuButtons = document.querySelectorAll('.btn-menu');
        console.log('Found menu buttons:', menuButtons.length);
        
        menuButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Menu button clicked');
                const restaurantId = this.dataset.restaurant;
                console.log('Restaurant ID:', restaurantId);
                showMenu(restaurantId);
            });
        });
    });

    // تفعيل زر الإغلاق
    const closeBtn = document.querySelector('.gold-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const menuModal = bootstrap.Modal.getInstance(document.getElementById('menuModal'));
            if (menuModal) {
                menuModal.hide();
            }
        });
    }
    
    // إضافة تأثير حركي عند فتح المودال
    const menuModal = document.getElementById('menuModal');
    if (menuModal) {
        menuModal.addEventListener('show.bs.modal', function() {
            const modalContent = this.querySelector('.modal-content');
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 200);
        });
    }

    // Signature Dishes Slider Initialization
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
}); // إغلاق DOMContentLoaded event listener

// Signature Dishes Slider with Auto-sliding
document.addEventListener('DOMContentLoaded', function() {
    const dishesSlider = document.querySelector('.dishes-slider');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const originalCards = document.querySelectorAll('.dish-card');
    let currentPosition = 0;
    let autoSlideInterval;

    // نسخ البطاقات عدة مرات لإنشاء تأثير الحركة المستمرة
    for (let i = 0; i < 3; i++) {
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            dishesSlider.appendChild(clone);
        });
    }

    const cardWidth = 320; // عرض البطاقة + المسافة
    const totalWidth = cardWidth * originalCards.length;

    function updateSlider() {
        dishesSlider.style.transform = `translateX(${currentPosition}px)`;
    }

    function moveSlider(direction) {
        if (direction === 'next') {
            currentPosition -= 2; // سرعة الحركة
        } else {
            currentPosition += 2;
        }

        // إعادة تعيين الموضع عندما نصل لنهاية المجموعة
        if (Math.abs(currentPosition) >= totalWidth) {
            currentPosition = 0;
        }

        updateSlider();
    }

    // تحريك مستمر
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            moveSlider('next');
        }, 16); // ~60fps للحركة السلسة
    }

    // إيقاف الحركة عند التحويم
    dishesSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // استئناف الحركة عند مغادرة التحويم
    dishesSlider.addEventListener('mouseleave', startAutoSlide);

    // تفعيل الأزرار
    if (prevArrow && nextArrow) {
        let manualInterval;
        
        prevArrow.addEventListener('mousedown', () => {
            clearInterval(autoSlideInterval);
            manualInterval = setInterval(() => moveSlider('prev'), 16);
        });
        
        prevArrow.addEventListener('mouseup', () => {
            clearInterval(manualInterval);
            startAutoSlide();
        });
        
        prevArrow.addEventListener('mouseleave', () => {
            clearInterval(manualInterval);
            startAutoSlide();
        });

        nextArrow.addEventListener('mousedown', () => {
            clearInterval(autoSlideInterval);
            manualInterval = setInterval(() => moveSlider('next'), 16);
        });
        
        nextArrow.addEventListener('mouseup', () => {
            clearInterval(manualInterval);
            startAutoSlide();
        });
        
        nextArrow.addEventListener('mouseleave', () => {
            clearInterval(manualInterval);
            startAutoSlide();
        });
    }

    // بدء الحركة التلقائية
    startAutoSlide();
});

// تفعيل أزرار الحجز في قسم العروض الفاخرة
const offerButtons = document.querySelectorAll('.offer-button');
    
offerButtons.forEach(button => {
    button.addEventListener('click', function() {
        const offerCard = this.closest('.offer-card');
        const offerTitle = offerCard.querySelector('.offer-title').textContent;
        const offerPrice = offerCard.querySelector('.offer-price').textContent;
        
        // إنشاء نموذج الحجز
        const bookingForm = `
            <div class="booking-form">
                <h3>Book ${offerTitle}</h3>
                <p class="price-display">${offerPrice}</p>
                
                <div class="form-group">
                    <label>Check-in Date</label>
                    <input type="date" class="form-control check-in" required>
                </div>
                
                <div class="form-group">
                    <label>Check-out Date</label>
                    <input type="date" class="form-control check-out" required>
                </div>
                
                <div class="form-group">
                    <label>Number of Guests</label>
                    <select class="form-control guests" required>
                        <option value="">Select number of guests</option>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                    </select>
                </div>
                
                <button class="confirm-booking">Confirm Booking</button>
                <button class="back-to-offer">Back</button>
            </div>
        `;
        
        // عرض نموذج الحجز
        const offerContent = offerCard.querySelector('.offer-content');
        const originalContent = offerContent.innerHTML;
        offerContent.innerHTML = bookingForm;
        
        // تفعيل زر التأكيد
        const confirmBtn = offerContent.querySelector('.confirm-booking');
        confirmBtn.addEventListener('click', function() {
            const checkIn = offerContent.querySelector('.check-in').value;
            const checkOut = offerContent.querySelector('.check-out').value;
            const guests = offerContent.querySelector('.guests').value;
            
            if (!checkIn || !checkOut || !guests) {
                alert('Please fill in all fields');
                return;
            }
            
            // هنا يمكنك إضافة كود لإرسال بيانات الحجز إلى الخادم
            alert(`Booking confirmed!\n${offerTitle}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}`);
            
            // العودة إلى عرض العرض
            offerContent.innerHTML = originalContent;
        });
        
        // تفعيل زر العودة
        const backBtn = offerContent.querySelector('.back-to-offer');
        backBtn.addEventListener('click', function() {
            offerContent.innerHTML = originalContent;
        });
    });
});
