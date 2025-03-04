$(document).ready(function(){
    let currentIndex = 0;
    const cards = $(".testimonial-card");
    const totalCards = cards.length;

    function showTestimonial(index) {
        cards.hide();
        $(cards[index]).fadeIn();
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % totalCards;
        showTestimonial(currentIndex);
    }

    setInterval(nextTestimonial, 5000);
    showTestimonial(currentIndex);
});