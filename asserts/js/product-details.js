document.addEventListener('DOMContentLoaded', () => {
    // Function to initialize a carousel
    const initializeCarousel = (carouselElement) => {
        const carouselInner = carouselElement.querySelector('.carousel-inner');
        const prevButton = carouselElement.querySelector('.carousel-control.prev');
        const nextButton = carouselElement.querySelector('.carousel-control.next');
        let index = 0;

        const updateCarousel = () => {
            const totalImages = carouselInner.querySelectorAll('img').length;
            carouselInner.style.transform = `translateX(-${index * 100}%)`;
            carouselInner.querySelectorAll('img').forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        };

        prevButton.addEventListener('click', () => {
            index = (index > 0) ? index - 1 : 0;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            const totalImages = carouselInner.querySelectorAll('img').length;
            index = (index < totalImages - 1) ? index + 1 : totalImages - 1;
            updateCarousel();
        });

        // Initially show the first image
        updateCarousel();
    };

    // Initialize all carousels on the page
    document.querySelectorAll('.carousel').forEach(carouselElement => {
        initializeCarousel(carouselElement);
    });
});
