document.addEventListener('DOMContentLoaded', function() {
    // Generate random booking ID
    const bookingId = 'BK' + Date.now().toString().slice(-8);
    document.getElementById('bookingId').textContent = bookingId;

    // Get booking data from localStorage
    const bookingData = JSON.parse(localStorage.getItem('confirmedBooking'));
    if (bookingData) {
        // Fill guest information
        document.getElementById('guestName').textContent = `${bookingData.firstName} ${bookingData.lastName}`;
        document.getElementById('guestEmail').textContent = bookingData.email;
        document.getElementById('guestPhone').textContent = bookingData.phone;

        // Fill hotel and room details
        document.getElementById('hotelName').textContent = bookingData.hotel;
        document.getElementById('roomType').textContent = bookingData.roomType;

        // Fill dates
        document.getElementById('checkInDate').textContent = bookingData.checkIn;
        document.getElementById('checkOutDate').textContent = bookingData.checkOut;

        // Calculate number of nights
        const checkIn = new Date(bookingData.checkIn);
        const checkOut = new Date(bookingData.checkOut);
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((checkOut - checkIn) / oneDay));
        document.getElementById('numberOfNights').textContent = `${diffDays} night(s)`;

        // Fill guest count
        document.getElementById('guestCount').textContent = 
            `${bookingData.adults} Adult(s)${bookingData.children > 0 ? `, ${bookingData.children} Child(ren)` : ''}`;

        // Fill price details
        const ratePerNight = bookingData.price;
        const subtotal = ratePerNight * diffDays;
        const taxes = subtotal * 0.15;
        const total = subtotal + taxes;

        document.getElementById('ratePerNight').textContent = `$${ratePerNight.toFixed(2)}`;
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
        document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
    } else {
        console.error('No booking data found in localStorage');
    }
});

function printConfirmation() {
    window.print();
}
