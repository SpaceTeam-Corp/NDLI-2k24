let currentSlide = 0;
const captions = [
    "Légende de la nuit de l'info (Apparement)",
    "Président du BDE égocentrique",
    "Roux de secours",
    "Semi-HPI (juste un peu teubé)",
    "La madeleine de proust",
    "Droite, Droite, Droite mais pas gauche",
    "Perdue (Quota)",
    "R&T en légende",
];

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-images img');
    const caption = document.querySelector('.caption'); 

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
            caption.textContent = captions[currentSlide]; 
        }
    });
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

showSlide(currentSlide);