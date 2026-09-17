let count = 0;

function addToCart(itemName) {
    count = count + 1;
    document.getElementById('cart-count').innerText = count;
    alert(itemName + " added to your cart!");
}
