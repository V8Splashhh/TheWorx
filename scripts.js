// Modal functions
function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
}

function openReviewModal() {
    document.getElementById('reviewModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Sample reviews data
const sampleReviews = [
    {
        name: "Sarah Johnson",
        rating: 5,
        text: "The Worx has been a game-changer for my startup. The collaborative environment and networking opportunities are unmatched!"
    },
    {
        name: "Michael Chen",
        rating: 5,
        text: "Excellent facilities and a vibrant community. The perfect space for entrepreneurs and freelancers."
    },
    {
        name: "Emily Davis",
        rating: 4,
        text: "Great workspace with all the amenities. The only reason for 4 stars is I wish they had longer hours on weekends."
    }
];

// Function to display reviews
function displayReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    const storedReviews = JSON.parse(localStorage.getItem('worxReviews') || '[]');
    const allReviews = [...sampleReviews, ...storedReviews];
    
    reviewsGrid.innerHTML = allReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <h3>${review.name}</h3>
                <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            </div>
            <p>${review.text}</p>
        </div>
    `).join('');
}

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Simulate form submission
async function submitForm(formData, formType) {
    const data = Object.fromEntries(formData);
    const isBooking = formType === 'booking';
    
    // Prepare email parameters
    const templateParams = {
        to_email: 'josh@zed.io',
        from_name: data.name || data['reviewer-name'],
        from_email: data.email || data['reviewer-email'],
        reply_to: data.email || data['reviewer-email'],
        form_type: formType,
        
        // Booking specific fields
        phone: data.phone || '',
        date: data.date || '',
        time: data.time || '',
        space_type: data['space-type'] || '',
        duration: data.duration || '',
        message: data.message || '',
        
        // Review specific fields
        rating: data.rating || '',
        review_text: data['review-text'] || '',
        
        // HTML email content for notification to Josh
        html_content: isBooking ? `
            <h2>New Booking Request</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.email}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.phone}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Preferred Date:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.date}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Preferred Time:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.time}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Space Type:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data['space-type']}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Duration:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.duration}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Additional Info:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.message || 'None'}</td>
                </tr>
            </table>
        ` : `
            <h2>New Review Submitted</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data['reviewer-name']}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data['reviewer-email']}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Rating:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${'⭐'.repeat(data.rating)}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Review:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data['review-text']}</td>
                </tr>
            </table>
        `
    };

    // Simulate a slight delay for realism
    await new Promise(resolve => setTimeout(resolve, 500));
        
        // Send thank you email to the user
        const thankYouParams = {
            to_email: data.email || data['reviewer-email'],
            to_name: data.name || data['reviewer-name'],
            form_type: formType,
            html_content: isBooking ? `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #d9e021; padding: 20px; text-align: center;">
                        <h1 style="color: #111; margin: 0;">THE WORX</h1>
                    </div>
                    <div style="padding: 30px; background-color: #f8f8f8;">
                        <h2 style="color: #111;">Thank you for your booking request!</h2>
                        <p>Dear ${data.name},</p>
                        <p>We have received your booking request for The Worx coworking space. Our team will review your request and get back to you within 24 hours.</p>
                        
                        <h3>Your Booking Details:</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Date:</strong> ${data.date}</li>
                            <li><strong>Time:</strong> ${data.time}</li>
                            <li><strong>Space Type:</strong> ${data['space-type']}</li>
                            <li><strong>Duration:</strong> ${data.duration}</li>
                        </ul>
                        
                        <p>If you have any questions, please don't hesitate to reach out!</p>
                        
                        <p>Best regards,<br>The Worx Team</p>
                    </div>
                    <div style="background-color: #111; color: #fff; padding: 20px; text-align: center;">
                        <p style="margin: 0;">&copy; 2025 The Worx. All rights reserved.</p>
                    </div>
                </div>
            ` : `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #d9e021; padding: 20px; text-align: center;">
                        <h1 style="color: #111; margin: 0;">THE WORX</h1>
                    </div>
                    <div style="padding: 30px; background-color: #f8f8f8;">
                        <h2 style="color: #111;">Thank you for your review!</h2>
                        <p>Dear ${data['reviewer-name']},</p>
                        <p>Thank you for taking the time to share your experience at The Worx. Your feedback is invaluable to us and helps us improve our services.</p>
                        <p>We truly appreciate your ${data.rating}-star review and are grateful to have you as part of our community.</p>
                        <p>Best regards,<br>The Worx Team</p>
                    </div>
                    <div style="background-color: #111; color: #fff; padding: 20px; text-align: center;">
                        <p style="margin: 0;">&copy; 2025 The Worx. All rights reserved.</p>
                    </div>
                </div>
            `
        };
        
    // For reviews, save to localStorage
    if (formType === 'review') {
        const review = {
            name: data['reviewer-name'],
            rating: parseInt(data.rating),
            text: data['review-text']
        };
        
        const storedReviews = JSON.parse(localStorage.getItem('worxReviews') || '[]');
        storedReviews.push(review);
        localStorage.setItem('worxReviews', JSON.stringify(storedReviews));
    }
    
    // Log form submission (in a real app, this would be sent to a server)
    console.log(`${formType} submission:`, data);
    
    return true;
}

// Handle booking form submission
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    // Submit form
    const success = await submitForm(formData, 'booking');
    
    if (success) {
        this.reset();
        closeModal('bookingModal');
        showToast('🎉 Booking submitted successfully! We\'ll be in touch within 24 hours.', 'success');
    } else {
        showToast('❌ There was an error submitting your booking. Please try again.', 'error');
    }
});

// Handle review form submission
document.getElementById('reviewForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    // Submit form
    const success = await submitForm(formData, 'review');
    
    if (success) {
        this.reset();
        closeModal('reviewModal');
        displayReviews(); // Refresh the reviews display
        showToast('⭐ Thank you for your review! It has been posted.', 'success');
    } else {
        showToast('❌ There was an error submitting your review. Please try again.', 'error');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation for elements
window.addEventListener('scroll', function() {
    const welcomeSection = document.querySelector('.welcome');
    const welcomePosition = welcomeSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (welcomePosition < screenPosition) {
        welcomeSection.style.opacity = '1';
        welcomeSection.style.transform = 'translateY(0)';
    }
    
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const signupContainer = document.querySelector('.signup-container');
    
    if (heroContent && signupContainer) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        signupContainer.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Display reviews on page load
    displayReviews();
    
    const welcomeSection = document.querySelector('.welcome');
    welcomeSection.style.opacity = '0';
    welcomeSection.style.transform = 'translateY(50px)';
    welcomeSection.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
    
    // Animate the X logo
    const xLogo = document.querySelector('.x-logo');
    if (xLogo) {
        setInterval(() => {
            xLogo.style.transform = 'rotate(45deg)';
            
            setTimeout(() => {
                xLogo.style.transform = 'rotate(0deg)';
            }, 2000);
        }, 4000);
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});