"use strict";

const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const productColor = document.getElementById("productColor");
const productSizeList = document.getElementById("productSizeList");

const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");

const counterEl = document.getElementById("counter");
const addToCart = document.getElementById("addToCart");

let count = 1;

const cartItems = [];

const sizeArray = ["xs", "s", "m", "l", "xl"];

const { category, price, name, color, image, sizes } = JSON.parse(
  localStorage.getItem("product")
);

const pName = name
  .split(" ")
  .map((name) => name[0].toUpperCase() + name.slice(1))
  .join(" ");

productCategory.textContent = category;
productName.textContent = pName;
productPrice.textContent = `${price} AZN`;
productImage.src = image;
productColor.classList.add(
  `${color === "black" ? "bg-" + color : "bg-" + color + "-500"}`
);

//Create sizes from local storage
const disabledSizes = [];
let selectedSize = "";

sizeArray.forEach((size) => {
  const sizeListItem = document.createElement("li");
  sizeListItem.className =
    "font-bold bg-gray-200 text-black w-9 h-9 flex items-center justify-center rounded-lg sizeListItem";
  sizeListItem.setAttribute("data-size", size);

  const sizeBtn = document.createElement("button");
  sizeBtn.className = "uppercase w-full h-full";
  sizeBtn.textContent = size;

  sizeListItem.appendChild(sizeBtn);
  productSizeList.appendChild(sizeListItem);

  if (!sizes.includes(size)) {
    disabledSizes.push(size);
    sizeListItem.style.backgroundColor = "rgb(239 68 68)";
  }
});

const sizeItems = document.querySelectorAll("#productSizeList li");

sizeItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    sizeItems.forEach((resetItem) => {
      if (disabledSizes.includes(resetItem.dataset.size)) {
        // event.preventDefault();
        return;
      }
      resetItem.style.backgroundColor = "rgb(229, 231, 235)";
      resetItem.style.color = "black";
    });
    if (disabledSizes.includes(item.dataset.size)) {
      // event.preventDefault();
      return;
    }
    item.style.backgroundColor =
      item.style.backgroundColor === "black" ? "rgb(229, 231, 235)" : "black";
    item.style.color = item.style.color === "white" ? "black" : "white";
    selectedSize = item.dataset.size;
    console.log("selected size: " + selectedSize);
  });
});

counterEl.value = count;

decreaseBtn.addEventListener("click", () => {
  if (count > 1) count--;
  counterEl.value = count;
});

increaseBtn.addEventListener("click", () => {
  if (count < 10) count++;
  counterEl.value = count;
});

addToCart.addEventListener("click", () => {
  if (!selectedSize) {
    alert("Please pick a size before adding to cart!");
    return;
  }
  const fetchedCartItems = JSON.parse(localStorage.getItem("cartItems"));

  const addedProduct = {
    name: pName,
    price: price,
    category: category,
    color: color,
    image: image,
    size: selectedSize,
    count: count,
  };

  //KASHA-Brainrot (finish task :)) C# in zibilleri, nest haven!
  if (!fetchedCartItems) {
    cartItems.push(addedProduct);
  } else if (fetchedCartItems.length !== 0) {
    let existingProductIndex = fetchedCartItems.findIndex(
      (item) =>
        item.name === addedProduct.name && item.size === addedProduct.size
    );
    if (existingProductIndex !== -1) {
      const newCount = fetchedCartItems[existingProductIndex].count + count;
      if (fetchedCartItems[existingProductIndex].count === 10) {
        fetchedCartItems[existingProductIndex].count = 10;
        cartItems.push(...fetchedCartItems);
      } else {
        fetchedCartItems[existingProductIndex].count = newCount;
        cartItems.push(...fetchedCartItems);
      }
    }
  } else {
    cartItems.push(...fetchedCartItems, addedProduct);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
});
