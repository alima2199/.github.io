// Shopping Cart Counter Function
let count = 0;

function addToCart(itemName) {
    count = count + 1;
    document.getElementById('cart-count').innerText = count;
    alert(itemName + " added to your cart!");
}

// Scroll Animation Trigger
document.addEventListener("DOMContentLoaded", function () {
    // Select elements to animate (Hero image, Featured section, Product cards, About section)
    const elementsToAnimate = document.querySelectorAll(
        ".hero-image-wrapper, .featured-section, .product-card, .about-section, .newsletter-section"
    );

    // Add the starting hidden class to all targeted elements
    elementsToAnimate.forEach(element => {
        element.classList.add("animate-on-scroll");
    });

    // Create an observer to check when elements enter the screen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to reveal element when scrolled into view
                entry.target.classList.add("is-visible");
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is visible
    });

    // Observe each element
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
