// 1. Shopping Cart Counter
let count = 0;

function addToCart(itemName) {
    count = count + 1;
    const cartCounter = document.getElementById('cart-count');
    if (cartCounter) {
        cartCounter.innerText = count;
    }
    alert(itemName + " added to your cart!");
}

// 2. Scroll Animation Trigger
document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is visible on screen
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
