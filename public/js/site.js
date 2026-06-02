// Simple cart UI helpers
function addToCart(productId, quantity = 1) {
  fetch('/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity })
  })
    .then(r => r.json())
    .then(data => {
      alert('Added to cart');
      loadCart();
    })
    .catch(err => console.error(err));
}

function loadCart() {
  fetch('/api/cart')
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById('cart-content');
      if (!container) return;
      container.innerHTML = '';
      if (!data.cart || data.cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
      }
      let total = 0;
      data.cart.forEach(item => {
        const line = document.createElement('div');
        line.textContent = `${item.name} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;
        total += item.price * item.quantity;
        container.appendChild(line);
      });
      const totalEl = document.createElement('strong');
      totalEl.textContent = `Total: $${total.toFixed(2)}`;
      container.appendChild(totalEl);
    })
    .catch(err => console.error(err));
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
});
