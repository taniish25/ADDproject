document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Initialize cart count from local storage
    updateCartCount();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productDetails = button.closest('.product-details');
            const product = {
                id: productDetails.dataset.productId,
                name: productDetails.dataset.productName,
                price: parseFloat(productDetails.dataset.productPrice),
                image: productDetails.querySelector('.product-image').src,
            };

            console.log('Adding product to cart:', product); // Debugging log
            addProductToCart(product);
            updateCartCount();
        });
    });

    function addProductToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart after adding product:', cart); // Debugging log
    }

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
        console.log('Updated cart count:', cart.length); // Debugging log
    }

    // Function to reset the cart
    function resetCart() {
        localStorage.removeItem('cart');
        updateCartCount();
        console.log('Cart has been reset'); // Debugging log
    }

    // Example: Reset cart button event listener
    document.getElementById('reset-cart-btn').addEventListener('click', resetCart);
});
