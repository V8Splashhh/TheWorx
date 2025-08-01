// Services page functionality

// Toggle pricing between daily and monthly
function togglePricing() {
    const toggle = document.getElementById('billingToggle');
    const isMonthly = toggle.checked;
    
    document.querySelectorAll('.amount[data-daily]').forEach(element => {
        const daily = element.getAttribute('data-daily');
        const monthly = element.getAttribute('data-monthly');
        element.textContent = isMonthly ? monthly : daily;
    });
    
    document.querySelectorAll('.period').forEach(element => {
        element.textContent = isMonthly ? '/month' : '/day';
    });
}

// Select a plan
function selectPlan(planName) {
    const user = JSON.parse(localStorage.getItem('worxUser'));
    
    if (user) {
        // User is logged in, proceed with plan selection
        showToast(`🎉 ${planName} plan selected! Redirecting to payment...`, 'success');
        // In a real app, this would redirect to payment processing
    } else {
        // User not logged in, show login prompt
        document.getElementById('planName').textContent = planName;
        document.getElementById('planModal').style.display = 'block';
    }
}

// Book a room
function bookRoom(roomName) {
    const user = JSON.parse(localStorage.getItem('worxUser'));
    
    if (user) {
        // User is logged in, show booking form
        document.getElementById('roomName').textContent = roomName;
        document.getElementById('roomBookingModal').style.display = 'block';
    } else {
        // User not logged in, redirect to account page
        showToast('⚠️ Please log in to book a room', 'info');
        setTimeout(() => {
            window.location.href = 'account.html';
        }, 2000);
    }
}

// Handle room booking form submission
document.getElementById('roomBookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const bookingData = {
        room: document.getElementById('roomName').textContent,
        date: formData.get('date'),
        startTime: formData.get('start-time'),
        endTime: formData.get('end-time'),
        attendees: formData.get('attendees'),
        specialRequests: formData.get('special-requests'),
        timestamp: new Date().toISOString()
    };
    
    // Save booking to localStorage (in real app, this would be sent to server)
    const bookings = JSON.parse(localStorage.getItem('worxBookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('worxBookings', JSON.stringify(bookings));
    
    // Reset form and close modal
    this.reset();
    closeModal('roomBookingModal');
    
    showToast('✅ Room booked successfully! Check your email for confirmation.', 'success');
});

// Set minimum date to today for booking
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});