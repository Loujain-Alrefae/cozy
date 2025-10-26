const searchInput = document.getElementById("search");
const root = document.getElementById("all-products");

function togglePopup() {
    document.querySelector(".overlay").classList.toggle("overlay-active");
}

let cart = [];

function addToCart(id) {
    const product = products.find((p) => p.id === id);
    const alreadyInCart = cart.some((item) => item.id === id);
    if (product && !alreadyInCart) {
        cart.push(product);
        updateCart();
    }
}

function updateCart() {
    const cartItem = document.getElementById("cartItem");
    const total = document.getElementById("total");
    const count = document.getElementById("count");

    if (cart.length === 0) {
        cartItem.innerHTML = "Your cart is empty";
        total.innerText = "$0.00";
        count.innerText = "0";
        return;
    }

    let itemsHTML = "";
    let totalPrice = 0;

    cart.forEach((item) => {
        const discountedPrice = item.discount
            ? item.price - item.price * (item.discount / 100)
            : item.price;
        totalPrice += discountedPrice;

        itemsHTML += `
            <div class="cart-box">
                <img src="${item.image}" width="50" />
                <div>
                    <p>${item.title}</p>
                    <span>$${discountedPrice.toFixed(2)}</span>
                </div>
            </div>
        `;
    });

    cartItem.innerHTML = itemsHTML;
    total.innerText = `$${totalPrice.toFixed(2)}`;
    count.innerText = cart.length;
}

function ShowProducts(productsArray) {
    root.innerHTML = productsArray
        .map(({ image, title, price, id, discount }) => {
        const discountedPrice = discount
            ? (price - price * (discount / 100)).toFixed(2)
            : price.toFixed(2);
        return `
        <div class='box'>
            ${
            discount > 0
                ? `<span class="discount">${discount}% OFF</span>`
                : `<span></span>`
            }
            <div class='img-box'>
            <img class='images' src=${image}></img>
            </div>
            <div class='bottom'>
            <p>${title}</p>
            <div>
                ${
                discount
                    ? `<span>$${discountedPrice}</span> <del>$${price.toFixed(
                        2
                    )}</del>`
                    : `<span>$${price.toFixed(2)}</span>`
                }
            </div>
            <button onclick='addToCart(${id})'>Add to cart</button>
            </div>
        </div>`;
    })
    .join("");
}
ShowProducts(products);

// Event listener for search input
searchInput.addEventListener("input", () => {
    const filteredProducts = products.filter((el) =>
        el.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    ShowProducts(filteredProducts);
});