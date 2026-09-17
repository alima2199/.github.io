let cart = [];

// Size Selector Handling
function selectSize(btn) {
    const siblings = btn.parentElement.querySelectorAll('.size-btn');
    siblings.forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
}

// Drawer Visibility Toggle
function toggleCart(open) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
    }
}

// Add Item to Cart
function addToCart(name, price, img, btn) {
    const card = btn.closest('.product-card');
    const selectedSize = card ? card.querySelector('.size-btn.active')?.innerText || 'S' : 'S';

    cart.push({ name, price, img, size: selectedSize });
    updateCart();
    toggleCart(true);
}

// Remove Item
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Cart Calculator & UI Render
function updateCart() {
    const itemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const subtotalVal = document.getElementById('subtotal-val');
    const shippingVal = document.getElementById('shipping-val');
    const totalVal = document.getElementById('total-val');
    
    if (cartCount) cartCount.innerText = cart.length;

    if (!itemsContainer) return;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p style="text-align: center; color: var(--muted-color); margin-top: 3rem; font-weight: 700;">Your bag is empty. Go cop something 💀</p>`;
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
                    <h4 style="font-size: 0.95rem; font-weight: 800;">${item.name}</h4>
                    <span style="font-size: 0.75rem; color: var(--muted-color); font-weight: 700;">Size: ${item.size}</span>
                    <div style="font-weight: 800; font-size: 0.9rem; margin-top: 0.2rem; color: var(--accent-color);">$${item.price.toFixed(2)}</div>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color: #ff4757; cursor:pointer; font-size: 0.8rem; font-weight: 800;">Delete</button>
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

// Free Shipping Tracker
function updateShippingProgress(subtotal) {
    const goal = 100;
    const progress = Math.min((subtotal / goal) * 100, 100);
    const progressBar = document.getElementById('shipping-progress');
    const msg = document.getElementById('shipping-msg');

    if (progressBar) progressBar.style.width = `${progress}%`;
    
    if (msg) {
        if (subtotal >= goal) {
            msg.innerText = "🎉 FREE Shipping Unlocked! Big W.";
        } else {
            msg.innerText = `Add $${(goal - subtotal).toFixed(2)} more for FREE Express Shipping 🚀`;
        }
    }
}

// Checkout Modal Navigation
function openCheckout() {
    if (cart.length === 0) {
        alert("Your bag is empty! Go cop something first.");
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
    alert("🔥 Order Securing Complete! Fits arriving soon.");
    cart = [];
    updateCart();
    closeCheckout();
    backToShipping();
}

// Image Lightbox Viewer
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

function closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.classList.remove('open');
    }
}

// Scroll Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => observer.observe(el));
});
