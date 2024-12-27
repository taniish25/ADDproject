document.addEventListener('DOMContentLoaded', () => {
    const cartKey = 'cart';
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.querySelector('.checkout-btn');

    // Load and display cart items from local storage
    function loadCart() {
        let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        displayCartItems(cartItems);
        updateSubtotal(cartItems);
    }

    // Display cart items
    function displayCartItems(cart) {
        cartItemsContainer.innerHTML = ''; // Clear the cart display first
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((product, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h3>${product.name}</h3>
                        <p>Price: ₹${product.price.toFixed(2)}</p>
                        <button class="remove-from-cart" data-index="${index}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            // Add event listeners for the remove buttons
            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const index = button.dataset.index;
                    removeProductFromCart(index);
                });
            });
        }
    }

    // Remove a product from the cart
    function removeProductFromCart(index) {
        let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        cartItems.splice(index, 1); // Remove the product at the specified index
        localStorage.setItem(cartKey, JSON.stringify(cartItems)); // Save updated cart to localStorage
        loadCart(); // Reload cart to reflect changes
        updateCartCount(cartItems); // Update cart count in header
    }

    // Update the subtotal and total
    function updateSubtotal(cart) {
        const subtotal = cart.reduce((sum, product) => sum + product.price, 0);
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;

        // Assuming flat shipping rate for simplicity
        const shipping = subtotal > 0 ? 50 : 0;
        shippingElement.textContent = `₹${shipping.toFixed(2)}`;

        const total = subtotal + shipping;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }

    // Event listener for the "Proceed to Checkout" button
    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // Clear the cart from localStorage
        localStorage.removeItem(cartKey);
        loadCart(); // Reload cart to show it's empty
        updateCartCount([]); // Reset cart count in header
    });

    // Update the cart item count in the header or navigation
    function updateCartCount(cart) {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    loadCart();
});

// Assuming this is a function to add an item to the cart
function addToCart() {
    let cartCount = localStorage.getItem("cartCount");  // Get the current cart count
    cartCount = cartCount ? parseInt(cartCount) : 0;    // If not found, set it to 0
    cartCount++; // Increment the cart count
    
    localStorage.setItem("cartCount", cartCount); // Store the updated count in localStorage

    // Update the cart count in the header (on the product page)
    document.getElementById("cart-count").innerText = cartCount;
}
// When the cart page is loaded, update the cart count
window.onload = function() {
    let cartCount = localStorage.getItem("cartCount");  // Get the cart count from localStorage
    cartCount = cartCount ? parseInt(cartCount) : 0;    // If no value found, set it to 0
    document.getElementById("cart-count").innerText = cartCount;  // Update the cart count in the cart page
};
function proceedToCheckout() {
    // Clear the cart count after checkout
    localStorage.removeItem("cartCount");

    // Optionally, you can redirect to a checkout page
    window.location.href = "checkout.html";
}

