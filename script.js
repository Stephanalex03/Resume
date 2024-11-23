// Initialize cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');
let totalPrice = document.getElementById('total-price');
let checkoutButton = document.getElementById('checkout-button');

// Update cart count
function updateCart() {
    cartCount.textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.getAttribute('data-id'),
            name: button.getAttribute('data-name'),
            price: parseFloat(button.getAttribute('data-price'))
        };
        cart.push(product);
        updateCart();
    });
});

// Display cart items
function displayCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        let cartHtml = '';
        let total = 0;
        cart.forEach(item => {
            cartHtml += `<p>${item.name} - $${item.price}</p>`;
            total += item.price;
        });
        cartItems.innerHTML = cartHtml;
        totalPrice.textContent = total.toFixed(2);
        checkoutButton.classList.remove('hidden');
    }
}

// Call displayCart when cart page loads
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}

// Handle checkout form
if (window.location.pathname.includes('checkout.html')) {
    document.getElementById('checkout-form').addEventListener('submit', (event) => {
        event.preventDefault();
        window.location.href = 'thankyou.html';
    });
}

// Update cart on page load
updateCart();
