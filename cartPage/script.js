"use strict";

const cartList = document.getElementById("cartList");
const subtotal = document.getElementById("subtotal");

const fetchedCartItems = JSON.parse(localStorage.getItem("cartItems"));

cartList.innerHTML = "";

const checkCount = () => {
  fetchedCartItems.forEach((item) => {
    if (item.count > 10) {
      item.count = 10;
    }
  });
};

checkCount();

const updateSubtotal = () => {
  let totalPrice = 0;
  fetchedCartItems.forEach((item) => {
    totalPrice += +(item.price * item.count);
    subtotal.textContent = `${totalPrice} AZN`;
  });
};

const updatePrice = (item) => {
  let priceContent = "";

  if (item.count > 1) {
    priceContent = `<span id="itemPrice">${item.count} x ${
      item.price
    } AZN | <span class="font-black">
      ${item.count * item.price} AZN</span></span>`;
  } else {
    priceContent = `<span id="itemPrice">${item.price} AZN</span>`;
  }
  return priceContent;
};
const updateList = () => {
  cartList.innerHTML = "";

  fetchedCartItems.forEach((item) => {
    cartList.innerHTML += ` <div class="flex gap-5 h-96 min-w-fit">
  <div class="border border-neutral-200 rounded-lg">
    <img src="${item.image}" alt="" class="h-full" />
  </div>
  <div class="space-y-5">
    <div>
      <h3 class="text-xl font-bold">${item.name}</h3>
      <h4 class="font-bold text-neutral-500">${item.category}</h4>
    </div>
    <div class="flex gap-5">
      <div
        class="h-8 w-8 border flex items-center justify-center rounded-full cursor-pointer ${
          item.color === "black" ? `bg-${item.color}` : `bg-${item.color}-500`
        }"
      ></div>
      <div
        class="font-bold bg-[#1D1D1D] uppercase text-white w-9 h-9 flex items-center justify-center rounded-lg"
      >
        ${item.size}
      </div>
    </div>
    <div>
      ${updatePrice(item)}
    </div>
    <div>
      <div class="flex items-center gap-6 font-black mb-8">
        <button class="text-3xl minus-btn">-</button
        ><input
          type="number"
          min="1"
          max="10"
          class="border h-14 text-2xl text-center rounded-md counter"
          value="${item.count}"
        /><button class="text-3xl plus-btn">+</button>
      </div>
      <button
        class="flex items-center justify-between rounded-lg font-black uppercase text-white bg-black text-medium px-4 py-3 w-72 remove-btn"
      >
        Remove
        <img src="../assets/icons/remove.svg" alt="" />
      </button>
    </div>
  </div>
</div>`;

    updateSubtotal();
  });
};
updateList();

const decreaseBtn = document.querySelectorAll(".minus-btn");
const increaseBtn = document.querySelectorAll(".plus-btn");
const counterEl = document.querySelectorAll(".counter");
const removeBtn = document.querySelectorAll(".remove-btn");

fetchedCartItems.forEach((item, index) => {
  cartList.addEventListener("click", (event) => {
    // if (event.target.classList.contains("minus-btn")) {}
    // if (event.target.classList.contains("plus-btn")) {}
    // if (event.target.classList.contains("remove-btn")) {}
  });
  decreaseBtn[index].addEventListener("click", () => {
    if (item.count > 1) {
      item.count--;
      counterEl[index].value = item.count;
      localStorage.setItem("cartItems", JSON.stringify(fetchedCartItems));
      updateSubtotal();
      updatePrice(item);
    }
  });

  increaseBtn[index].addEventListener("click", () => {
    if (item.count < 10) {
      item.count++;
      counterEl[index].value = item.count;
      localStorage.setItem("cartItems", JSON.stringify(fetchedCartItems));
      updateSubtotal();
      updatePrice(item);
    }
  });
  removeBtn[index].addEventListener("click", () => {
    const indexOfItem = fetchedCartItems.indexOf(item);
    fetchedCartItems.splice(indexOfItem, 1);
    updateList();
    window.location.reload();
    localStorage.setItem("cartItems", JSON.stringify(fetchedCartItems));
  });
});
