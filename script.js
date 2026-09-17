// 1. Shopping Bag Counter
let bagCount = 0;

function addToCart(itemName) {
    bagCount += 1;
    const cartCounter = document.getElementById('cart-count');
    if (cartCounter) {
        cartCounter.innerText = bagCount;
    }
    alert(itemName + " added to your bag!");
}

// 2. Interactive Size Buttons (Highlight selected size)
document.addEventListener("DOMContentLoaded", function () {
    const sizeButtons = document.querySelectorAll('.size-btn');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove highlight from other sizes in the same item card
            const parentSelector = this.parentElement;
            parentSelector.querySelectorAll('.size-btn').forEach(btn => {
                btn.style.backgroundColor = 'var(--bg-color)';
                btn.style.color = 'var(--text-color)';
                btn.style.borderColor = 'var(--card-bg)';
            });

            // Highlight the clicked size
            this.style.backgroundColor = 'var(--accent-color)';
            this.style.color = 'var(--white)';
            this.style.borderColor = 'var(--accent-color)';
        });
    });

    // 3. Scroll Animation Engine
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is in view
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
