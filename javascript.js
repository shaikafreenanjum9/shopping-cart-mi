// PRODUCT DETAILS

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1999,
        emoji: "⌚"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1299,
        emoji: "👟"
    },
    {
        id: 4,
        name: "Backpack",
        price: 899,
        emoji: "🎒"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 599,
        emoji: "🕶️"
    },
    {
        id: 6,
        name: "Camera",
        price: 2499,
        emoji: "📷"
    }
];

// SHOPPING CART

let cart = [];

// DISPLAY PRODUCTS

function displayProducts() {
    const productList = document.getElementById("product-list");

    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.emoji}
            </div>

            <h3>${product.name}</h3>

            <p>₹${product.price.toLocaleString("en-IN")}</p>

            <button class="add-btn"
                onclick="addToCart(${product.id})">
                + Add to Cart
            </button>
        </div>
    `).join("");
}

// ADD PRODUCT

function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

}

// CHANGE QUANTITY

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

// REMOVE PRODUCT

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// UPDATE CART DISPLAY

function updateCart() {
    const cartItems = document.getElementById("cart-items");

    let totalItems = 0;
    let subtotal = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty. Start shopping!
            </p>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => {
            totalItems += item.quantity;
            subtotal += item.price * item.quantity;

            return `
                <div class="cart-item">

                    <div class="cart-product">
                        <span class="cart-emoji">
                            ${item.emoji}
                        </span>

                        <div>
                            <h4>${item.name}</h4>
                            <p>₹${item.price.toLocaleString("en-IN")}</p>
                        </div>
                    </div>

                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${item.id}, -1)">−</button>

                        <strong>${item.quantity}</strong>

                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>

                    <strong>
                        ₹${(item.price * item.quantity).toLocaleString("en-IN")}
                    </strong>

                    <button class="remove-btn"
                        onclick="removeItem(${item.id})">
                        Remove
                    </button>

                </div>
            `;
        }).join("");
    }

    // DELIVERY CALCULATION

    const delivery = subtotal === 0 || subtotal >= 2000 ? 0 : 50;

    const grandTotal = subtotal + delivery;

    // UPDATE SUMMARY

    document.getElementById("cart-count").textContent = totalItems;

    document.getElementById("total-items").textContent = totalItems;

    document.getElementById("subtotal").textContent =
        "₹" + subtotal.toLocaleString("en-IN");

    document.getElementById("delivery").textContent =
        delivery === 0 ? "FREE" : "₹" + delivery;

    document.getElementById("total-price").textContent =
        "₹" + grandTotal.toLocaleString("en-IN");
}

// CHECKOUT

function checkout() {
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const delivery = total >= 2000 ? 0 : 50;

    alert(
        "Thank you for shopping with ShopEase! 🛍️\n\n" +
        "Total Items: " +
        cart.reduce((sum, item) => sum + item.quantity, 0) +
        "\nGrand Total: ₹" + (total + delivery).toLocaleString("en-IN") +
        "\n\nThis is a demo checkout. No payment was made."
    );
}

// INITIALIZE WEBSITE

displayProducts();
updateCart();