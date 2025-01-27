document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const slides = document.querySelectorAll('.slide .item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 1;
    const qrCodeContainer = document.getElementById('qr-code-container');
    const tripGallery = document.getElementById('trip-gallery');
    
    // Sample trip images (replace with your actual image paths)
    const tripImages = [
        './image/mud.jpeg',
        './image/ped.jpeg',
        './image/harry.jpeg',
        './image/temp.jpg',
        './image/travel.jpeg',
        './image/girl.jpeg'
    ];

    // Dynamically load trip images
    tripImages.forEach(imagePath => {
        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = 'Recent Trip';
        
        // Add click event to show enlarged image
        imgElement.addEventListener('click', () => {
            openImageModal(imagePath);
        });

        tripGallery.appendChild(imgElement);
    });

    // Image modal functionality
    function openImageModal(imageSrc) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        
        const modalImage = document.createElement('img');
        modalImage.src = imageSrc;
        
        const closeButton = document.createElement('span');
        closeButton.classList.add('close-modal');
        closeButton.innerHTML = '&times;';
        
        // Append elements
        modalContent.appendChild(modalImage);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal on click
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Add some extra interactivity to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'scale(1)';
        });
    });
            
            // QR Code Animation
            function animateQRCode() {
                qrCodeContainer.style.animation = 'pulse 1s infinite';
            }

            // Stop Animation
            function stopQRCodeAnimation() {
                qrCodeContainer.style.animation = 'none';
            }

            qrCodeContainer.addEventListener('mouseenter', animateQRCode);
            qrCodeContainer.addEventListener('mouseleave', stopQRCodeAnimation);

            // App Store Redirection
            window.openAppStore = function(platform) {
                const appStoreLinks = {
                    apple: 'https://apps.apple.com/us/app/expedia-hotels-flights-car/id427916203',
                    google: 'https://play.google.com/store/apps/details?id=com.expedia.bookings'
                };

                window.open(appStoreLinks[platform], '_blank');
            }

            // Dynamic QR Code Generation
            function generateQRCode(url) {
                const qrCodeImg = qrCodeContainer.querySelector('img');
                qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
            }

            // Example: Generate QR code with dynamic URL
            generateQRCode('https://www.expedia.com/app');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Initial slide
    showSlide(currentSlide);

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Optional: Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Touch support for mobile
    let touchStartX = 0;
    const slider = document.querySelector('.container');

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });
    menuToggle.addEventListener('click', () => {
        // Toggle menu
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInside = menuToggle.contains(event.target) || navLinks.contains(event.target);

        if (!isClickInside) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});