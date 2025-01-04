document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.accordion-item');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('.accordion-button').textContent.toLowerCase();
            const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Category filtering
    const categoryPills = document.querySelectorAll('.category-pill');
    const faqCategories = document.querySelectorAll('.faq-category');

    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            categoryPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            this.classList.add('active');

            const category = this.dataset.category;
            
            faqItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 