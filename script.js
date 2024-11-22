document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to show selected section and hide others
    const showSection = (sectionId, shouldScroll = true) => {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }

        // Update active state of navigation buttons
        navButtons.forEach(button => {
            if (button.dataset.section === sectionId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Only scroll if explicitly requested (for navigation clicks)
        if (shouldScroll) {
            window.scrollTo({
                top: document.querySelector('main').offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    // Handle navigation button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = button.dataset.section;
            window.location.hash = sectionId;
            showSection(sectionId, true); // Scroll on navigation click
        });
    });

    // Handle URL hash changes
    const handleHashChange = () => {
        const hash = window.location.hash.slice(1) || 'home';
        showSection(hash, window.location.hash !== ''); // Only scroll if there's a hash
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Handle initial load
    if (window.location.hash) {
        handleHashChange();
    } else {
        showSection('home', false); // Don't scroll on initial load without hash
    }
});
