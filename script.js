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

    console.log(filteredColors);
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

    console.log(filteredSizes);
  });
});

productsCount.textContent = products.length;

const displayProducts = () => {
  const filterByCategory = products.filter((product) => {
    for (let i = 0; i < filteredCategories.length; ++i) {
      return product.category === filteredCategories[i];
    }
  });
  console.log(filteredCategories);
};
