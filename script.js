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
let cart = [];

// Add item to cart
function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateCart();
    toggleCart(true); // Open cart automatically when item added
}

// Toggle Cart Visibility
function toggleCart(open) {
    const drawer = document.getElementById('cart-drawer');
    if (open === true) {
        drawer.classList.add('open');
    } else {
        drawer.classList.toggle('open');
    }
}

// Update Cart Display & Total
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('cart-total-price');
    
    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your bag is currently empty.</p>';
        totalPriceElement.innerText = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>$${item.price.toFixed(2)}</small>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none;border:none;color:red;cursor:pointer;">Remove</button>
            </div>
        `;
    });

    totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Checkout Modal Functions
function openCheckout() {
    if (cart.length === 0) {
        alert("Your bag is empty!");
        return;
    }
    document.getElementById('checkout-modal').classList.add('open');
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('open');
}

function handleCheckout(event) {
    event.preventDefault();
    alert("Thank you for your order! Your cozy items are on their way.");
    cart = [];
    updateCart();
    closeCheckout();
    toggleCart(false);
}
