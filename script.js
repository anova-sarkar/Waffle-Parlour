const cartOpen = document.querySelector("#cart-icon");
const shoppingCart = document.querySelector(".shopping-cart")
const cartClose = document.querySelector("#close-cart");

/*Opening and Closing Cart Tab*/
cartOpen.onclick = () => {
    shoppingCart.classList.add("active");
};

cartClose.onclick = () => {
    shoppingCart.classList.remove("active");
};

/*Adding and Deleting Items from Cart*/
const addButton = document.querySelectorAll(".add-cart");

addButton.forEach(button => {
    button.onclick = buy => {
        const foodListing = buy.target.closest(".food-listing");
        addtoCart(foodListing);
    }
});

const cartContent = document.querySelector(".cart-content");
const addtoCart = foodListing => {
    const foodImage = foodListing.querySelector("img").src;
    const foodName = foodListing.querySelector(".food-name").textContent;
    const foodPrice = foodListing.querySelector(".price").textContent;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <img src="${foodImage}" class="cart-image">
        <div class="cart-details">
            <h2 class="cart-item-name">${foodName}</h2>
            <span class="cart-item-price">${foodPrice}</span>
            <div class="cart-item-quantity">
                <i class="fa-solid fa-minus" id="decrease"></i>
                <span class="count">1</span>
                <i class="fa-solid fa-plus" id="increase"></i>
            </div>
        </div>
        <i class="fa-solid fa-trash" id="cart-remove"></i>
    `;

    cartContent.appendChild(cartItem);

    /* Delete Item from Cart */
    cartItem.querySelector("#cart-remove").onclick = () => {
        cartItem.remove();
        updateTotal();
        updateCount(-1);
    };

    /*Increase Item Count in Cart*/
    cartItem.querySelector("#increase").onclick = () => {
        const itemCount = cartItem.querySelector(".count");
        itemCount.textContent++;
        updateTotal();
        updateCount(1);
    };

    /*Decrease Item Count in Cart*/
    cartItem.querySelector("#decrease").onclick = () => {
        const itemCount = cartItem.querySelector(".count");
        if (itemCount.textContent > 1) {
            itemCount.textContent--;
            updateCount(-1);
        }
        updateTotal();
    };

    updateTotal();
    updateCount(1);
};

/*Updating Total Price*/
const updateTotal = () => {
    const totalPrice = document.querySelector(".total-price");
    const items = cartContent.querySelectorAll(".cart-item");
    let total = 0;

    items.forEach(cartItem => {
        const price = cartItem.querySelector(".cart-item-price");
        const count = cartItem.querySelector(".count");

        total += price.textContent.replace("$", "") * count.textContent;
    });

    totalPrice.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(total);
};

/*Clear All Items from Cart */
const clearButton = document.querySelector(".cart-clear");
clearButton.onclick = () => {
    const items = cartContent.querySelectorAll(".cart-item");
    items.forEach(cartItem => {
        cartItem.remove()
        updateCount(-1);
    });
    updateTotal();
};

/*Buying Items in Cart*/
const buyButton = document.querySelector(".cart-buy");
buyButton.onclick = () => {
    const items = cartContent.querySelectorAll(".cart-item");
    if (items.length > 0) {
        items.forEach(cartItem => {
            cartItem.remove()
            updateCount(-1);
        });
        updateTotal();
        alert("Purchase confirmed!");
    } else {
        alert("Your cart is empty!")
    }
};

/*Updating Total Item Count Notification on Cart Icon*/
let count = 0;
const updateCount = update => {
    const countNotif = document.querySelector(".cart-item-count");
    count += update;

    if (count > 0) {
        countNotif.style.visibility = "visible";
        countNotif.textContent = count;
    } else {
        countNotif.style.visibility = "hidden";
        countNotif.textContent = "";
    }
};
