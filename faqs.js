// FAQs page functionality

// Show FAQ category
function showCategory(category) {
    // Hide all FAQ contents
    document.querySelectorAll('.faq-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected category
    document.getElementById(category).style.display = 'block';
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Toggle FAQ answer
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQs in the same category
    const category = faqItem.parentElement;
    category.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
            item.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    }
}

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Log contact data (in real app, this would be sent to server)
    console.log('Contact form submission:', contactData);
    
    // Reset form
    this.reset();
    
    // Show success message
    showToast('✅ Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
});