let cart = [];

// Size Button Selection Handling
function selectSize(btn) {
    const siblings = btn.parentElement.querySelectorAll('.size-btn');
    siblings.forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
}

// Open/Close Side Drawer
function toggleCart(open) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
    }
}

// Add Item to Cart with Selected Size & Image
function addToCart(name, price, img, btn) {
    const card = btn.closest('.product-card');
    const selectedSize = card ? card.querySelector('.size-btn.active')?.innerText || 'S' : 'S';

    cart.push({ name, price, img, size: selectedSize });
    updateCart();
    toggleCart(true); // Automatically open drawer upon adding
}

// Remove Item by Index
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Dynamic Cart & Shipping Progress Calculator
function updateCart() {
    const itemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalVal = document.getElementById('subtotal-val');
    const shippingVal = document.getElementById('shipping-val');
    const totalVal = document.getElementById('total-val');
    
    if (cartCount) cartCount.innerText = cart.length;

    if (!itemsContainer) return;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p style="text-align: center; color: var(--muted-color); margin-top: 2rem;">Your bag is empty.</p>`;
        if (subtotalVal) subtotalVal.innerText = "$0.00";
        if (shippingVal) shippingVal.innerText = "$0.00";
        if (totalVal) totalVal.innerText = "$0.00";
        updateShippingProgress(0);
        return;
    }

    let subtotal = 0;
    itemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        subtotal += item.price;
        itemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" class="cart-item-img" alt="${item.name}">
                <div class="cart-item-details">
                    <h4 style="font-size: 0.95rem;">${item.name}</h4>
                    <span style="font-size: 0.75rem; color: var(--muted-color);">Size: ${item.size}</span>
                    <div style="font-weight: bold; font-size: 0.85rem; margin-top: 0.2rem;">$${item.price.toFixed(2)}</div>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color: #cc0000; cursor:pointer; font-size: 0.8rem;">Remove</button>
            </div>
        `;
    });

    const shippingCost = subtotal >= 100 ? 0 : 10;
    const total = subtotal + shippingCost;

    if (subtotalVal) subtotalVal.innerText = `$${subtotal.toFixed(2)}`;
    if (shippingVal) shippingVal.innerText = shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`;
    if (totalVal) totalVal.innerText = `$${total.toFixed(2)}`;

    updateShippingProgress(subtotal);
}

// Free Shipping Threshold Tracker
function updateShippingProgress(subtotal) {
    const goal = 100;
    const progress = Math.min((subtotal / goal) * 100, 100);
    const progressBar = document.getElementById('shipping-progress');
    const msg = document.getElementById('shipping-msg');

    if (progressBar) progressBar.style.width = `${progress}%`;
    
    if (msg) {
        if (subtotal >= goal) {
            msg.innerText = "🎉 You've unlocked FREE Express Shipping!";
        } else {
            msg.innerText = `Add $${(goal - subtotal).toFixed(2)} more for FREE Express Shipping`;
        }
    }
}

// Checkout Modal Step Navigation
function openCheckout() {
    if (cart.length === 0) {
        alert("Please add items to your bag first!");
        return;
    }
    toggleCart(false);
    
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = subtotal >= 100 ? 0 : 10;
    
    const countEl = document.getElementById('modal-item-count');
    const totalEl = document.getElementById('modal-total-val');
    const modalEl = document.getElementById('checkout-modal');

    if (countEl) countEl.innerText = cart.length;
    if (totalEl) totalEl.innerText = `$${(subtotal + shipping).toFixed(2)}`;
    if (modalEl) modalEl.classList.add('open');
}

function closeCheckout() {
    const modalEl = document.getElementById('checkout-modal');
    if (modalEl) modalEl.classList.remove('open');
}

function goToPayment() {
    document.getElementById('step-shipping').style.display = 'none';
    document.getElementById('step-payment').style.display = 'block';
    document.getElementById('tab-1').classList.remove('active');
    document.getElementById('tab-2').classList.add('active');
}

function backToShipping() {
    document.getElementById('step-payment').style.display = 'none';
    document.getElementById('step-shipping').style.display = 'block';
    document.getElementById('tab-2').classList.remove('active');
    document.getElementById('tab-1').classList.add('active');
}

function setPayMethod(el) {
    document.querySelectorAll('.pay-option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
}

function processOrder(e) {
    e.preventDefault();
    alert("✨ Order placed successfully! Thank you for shopping with CozyMarketz.");
    cart = [];
    updateCart();
    closeCheckout();
    backToShipping();
}

// Intersection Observer for Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => observer.observe(el));
});
// Open Lightbox with Large Image and Caption
function openLightbox(imgSrc, title) {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.innerText = title || '';
        lightbox.classList.add('open');
    }
}

// Close Lightbox Modal
function closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.classList.remove('open');
    }
}
