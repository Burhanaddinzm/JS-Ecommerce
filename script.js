"use strict";

import { products } from "./data.js";

const filterBtns = document.querySelectorAll(".filterBtn");
const filterLists = document.querySelectorAll(".filterList");
const chevronIcons = document.querySelectorAll(".chevronIcon");

const categoryItems = document.querySelectorAll("#categoryList li");
const colorItems = document.querySelectorAll("#colorList li");
const sizeItems = document.querySelectorAll("#sizeList li");

const colorItemsDots = document.querySelectorAll("#colorList span");

const productsCount = document.getElementById("products-count");

const productsEl = document.getElementById("products");

const filteredCategories = [];
const filteredColors = [];
const filteredSizes = [];

filterBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    filterLists[index].classList.toggle("hidden");
    chevronIcons[index].classList.toggle("-rotate-180");
  });
});

categoryItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("font-black");

    const { category } = item.dataset;

    if (filteredCategories.includes(category)) {
      const indexOfCategory = filteredCategories.indexOf(category);
      filteredCategories.splice(indexOfCategory, 1);
    } else filteredCategories.push(category);
    displayProducts();
  });
});

colorItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const { color } = item.dataset;

    colorItemsDots[index].classList.toggle("hidden");

    if (filteredColors.includes(color)) {
      const indexOfColor = filteredColors.indexOf(color);
      filteredColors.splice(indexOfColor, 1);
    } else filteredColors.push(color);
    displayProducts();
  });
});

sizeItems.forEach((item) => {
  item.addEventListener("click", () => {
    const { size } = item.dataset;

    item.style.backgroundColor === "black"
      ? (item.style.backgroundColor = "rgb(229 231 235)")
      : (item.style.backgroundColor = "black");

    item.style.color === "white"
      ? (item.style.color = "black")
      : (item.style.color = "white");

    if (filteredSizes.includes(size)) {
      const indexOfSize = filteredSizes.indexOf(size);
      filteredSizes.splice(indexOfSize, 1);
    } else filteredSizes.push(size);
    displayProducts();
  });
});

const displayProducts = () => {
  const filteredProducts = products.filter((product) => {
    if (
      filteredCategories.length === 0 &&
      filteredColors.length === 0 &&
      filteredSizes.length === 0
    )
      return true;

    const categoryCondition =
      filteredCategories.includes(product.category) ||
      filteredCategories.length === 0;

    const colorCondition =
      filteredColors.includes(product.color) || filteredColors.length === 0;

    const sizeCondition =
      filteredSizes.length === 0 ||
      filteredSizes.some((size) => product.sizes.includes(size));

    return categoryCondition && colorCondition && sizeCondition;
  });

  // console.log(filteredProducts);

  productsEl.innerHTML = ``;

  filteredProducts.forEach((product) => {
    const pName = product.name
      .split(" ")
      .map((name) => name[0].toUpperCase() + name.slice(1))
      .join(" ");

    productsEl.innerHTML += `<div class="col-span-4 cursor-pointer">
    <a href="./productPage/product.html">
    <div class="mb-4 border border-neutral-200 rounded-lg">
    <img
    src="${product.image}"
    alt=""
    class="w-full h-[500px]"
    />
    </div>
    <div class="flex justify-between font-bold">
    <div>
    <h1 class="text-xl">${pName}</h1>
    <p class="text-neutral-500">${product.category}</p>
    </div>
    <h1 class="text-2xl">
    <span>${product.price}</span>
    AZN
    </h1>
    </div>
    </a>
    </div>`;
  });
  productsCount.textContent = filteredProducts.length;
};

displayProducts();
