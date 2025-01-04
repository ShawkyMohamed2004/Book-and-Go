document.addEventListener('DOMContentLoaded', function() {
    // Initialize phone input
    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        preferredCountries: ["eg", "sa", "ae"],
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        allowDropdown: true,
        autoPlaceholder: "polite",
    });

    // Remove any readonly attribute that might be set
    phoneInputField.removeAttribute('readonly');
    
    // Ensure the input is enabled
    phoneInputField.disabled = false;

    // Add input event listener to format the number
    phoneInputField.addEventListener('input', function() {
        if (phoneInput.isValidNumber()) {
            phoneInputField.classList.remove('is-invalid');
            phoneInputField.classList.add('is-valid');
        } else {
            phoneInputField.classList.remove('is-valid');
            phoneInputField.classList.add('is-invalid');
        }
    });

    // Email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(this.value)) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }
    });

    // Form validation for step 1
    document.getElementById('step1Next').addEventListener('click', function() {
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        let isValid = true;
        let firstError = null;

        // Function to show error notification
        function showErrorNotification() {
            const notification = document.getElementById('errorNotification');
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }

        // Function to add shake animation
        function addShakeAnimation(element) {
            element.classList.add('shake');
            setTimeout(() => {
                element.classList.remove('shake');
            }, 500);
        }

        // Validate First Name
        if (!firstName.value.trim()) {
            firstName.classList.add('is-invalid');
            addShakeAnimation(firstName);
            isValid = false;
            firstError = firstError || firstName;
        } else {
            firstName.classList.remove('is-invalid');
            firstName.classList.add('is-valid');
        }

        // Validate Last Name
        if (!lastName.value.trim()) {
            lastName.classList.add('is-invalid');
            addShakeAnimation(lastName);
            isValid = false;
            firstError = firstError || lastName;
        } else {
            lastName.classList.remove('is-invalid');
            lastName.classList.add('is-valid');
        }

        // Validate Email
        if (!email.value.trim() || !email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            email.classList.add('is-invalid');
            addShakeAnimation(email);
            isValid = false;
            firstError = firstError || email;
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }

        // Validate Phone
        if (!phoneInput.isValidNumber()) {
            phone.classList.add('is-invalid');
            addShakeAnimation(phone);
            isValid = false;
            firstError = firstError || phone;
        } else {
            phone.classList.remove('is-invalid');
            phone.classList.add('is-valid');
        }

        if (!isValid) {
            showErrorNotification();
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        // If all valid, proceed to next step
        currentStep++;
        showStep(currentStep);
    });

    // Clear validation on input
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Payment form validation and handling
    const cardHolder = document.getElementById('cardHolder');
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');

    // Card number input formatting and validation
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        
        for(let i = 0; i < value.length; i++) {
            if(i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
        
        // Update preview
        document.getElementById('cardNumberPreview').textContent = 
            formattedValue || '•••• •••• •••• ••••';

        // Detect card type
        const firstNum = value[0];
        let cardClass = 'fa-cc-visa';
        
        if(firstNum === '4') {
            cardClass = 'fa-cc-visa';
        } else if(['51','52','53','54','55'].includes(value.substring(0,2))) {
            cardClass = 'fa-cc-mastercard';
        } else if(['34','37'].includes(value.substring(0,2))) {
            cardClass = 'fa-cc-amex';
        } else if(['60','65'].includes(value.substring(0,2))) {
            cardClass = 'fa-cc-discover';
        }

        const cardTypeIcon = document.querySelector('.card-type i');
        if (cardTypeIcon) {
            cardTypeIcon.className = `fab ${cardClass}`;
        }
    });

    // Expiry date formatting
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if(value.length >= 2) {
            value = value.substring(0,2) + '/' + value.substring(2);
        }
        
        e.target.value = value.substring(0, 5);
        document.getElementById('cardExpiryPreview').textContent = 
            value || 'MM/YY';
    });

    // Card holder name
    cardHolder.addEventListener('input', function(e) {
        document.getElementById('cardHolderPreview').textContent = 
            e.target.value.toUpperCase() || 'YOUR NAME';
    });

    // CVV validation
    cvv.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').slice(0, 3);
        
        if (this.value.length === 3) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            if (this.value.length > 0) {
                this.classList.add('is-invalid');
            }
        }
    });

    // Payment validation
    function validatePayment() {
        let isValid = true;

        // Validate card holder
        if (!cardHolder.value.trim()) {
            cardHolder.classList.add('is-invalid');
            isValid = false;
        }

        // Validate card number
        const cardNum = cardNumber.value.replace(/\s/g, '');
        if (!cardNum || cardNum.length < 16 || !isValidCreditCard(cardNum)) {
            cardNumber.classList.add('is-invalid');
            isValid = false;
        }

        // Validate expiry date
        const [month, year] = expiryDate.value.split('/');
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;

        if (!month || !year || 
           month < 1 || month > 12 || 
           year < currentYear || 
           (year == currentYear && month < currentMonth)) {
            expiryDate.classList.add('is-invalid');
            isValid = false;
        }

        // Validate CVV
        if (!cvv.value || cvv.value.length < 3) {
            cvv.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    // Form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validatePayment()) {
                showErrorNotification();
                return;
            }

            // Get form data
            const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails') || '{}');
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: phoneInput.getNumber(),
                checkIn: document.getElementById('checkInDate').textContent,
                checkOut: document.getElementById('checkOutDate').textContent,
                adults: document.getElementById('adultCount').textContent,
                children: document.getElementById('childCount').textContent,
                price: parseFloat(document.getElementById('ratePerNight').textContent.replace('$', '')) || 0,
                hotel: bookingDetails.hotel || '',
                roomType: document.querySelector('.room-name')?.textContent || '',
                roomImage: document.querySelector('.room-image')?.src || ''
            };

            // Save booking data
            localStorage.setItem('confirmedBooking', JSON.stringify(formData));

            // Redirect to confirmation page
            window.location.href = 'confirmation.html';
        });
    }

    // Credit card validation using Luhn algorithm
    function isValidCreditCard(number) {
        let sum = 0;
        let isEven = false;
        
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i));

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return (sum % 10) === 0;
    }

    // Show steps
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    let currentStep = 0;

    function showStep(stepIndex) {
        formSteps.forEach(step => step.classList.add('d-none'));
        formSteps[stepIndex].classList.remove('d-none');
        
        steps.forEach((step, index) => {
            if (index <= stepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Previous button handler
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    try {
        // Get booking details from localStorage
        const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails') || '{}');
        
        if (bookingDetails) {
            // Update room image and details
            const roomImage = document.querySelector('.room-image');
            if (roomImage) {
                roomImage.src = bookingDetails.roomImage || '../assets/images/default-room.jpg';
                roomImage.alt = `${bookingDetails.roomType} at ${bookingDetails.hotel}`;
            }

            // Update room name
            const roomName = document.querySelector('.room-name');
            if (roomName) {
                roomName.textContent = bookingDetails.roomType || 'Luxury Suite';
            }

            // Update hotel name in the title
            const pageTitle = document.querySelector('.page-title');
            if (pageTitle) {
                pageTitle.innerHTML = `
                    ${bookingDetails.hotel || 'Luxury Hotel'}
                    <span>Complete Your Booking</span>
                `;
            }

            // Set check-in and check-out dates
            document.getElementById('checkInDate').textContent = bookingDetails.checkIn || '';
            document.getElementById('checkOutDate').textContent = bookingDetails.checkOut || '';

            // Calculate and set duration
            const checkIn = new Date(bookingDetails.checkIn);
            const checkOut = new Date(bookingDetails.checkOut);
            const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            document.getElementById('nightsCount').textContent = `${numberOfNights} Nights`;

            // Set and calculate guest counts
            const adults = parseInt(bookingDetails.adults || 0);
            const children = parseInt(bookingDetails.children || 0);
            document.getElementById('adultCount').textContent = adults;
            document.getElementById('childCount').textContent = children;
            document.getElementById('totalGuests').textContent = adults + children;

            // Update price calculations
            const ratePerNight = parseFloat(bookingDetails.price || 299);
            document.getElementById('ratePerNight').textContent = `$${ratePerNight}`;

            const subtotal = ratePerNight * numberOfNights;
            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;

            const taxRate = 0.15; // 15%
            const taxAmount = subtotal * taxRate;
            document.getElementById('taxes').textContent = `$${taxAmount.toFixed(2)}`;

            const totalAmount = subtotal + taxAmount;
            document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
        }
    } catch (error) {
        console.error('Error loading booking details:', error);
    }
});
