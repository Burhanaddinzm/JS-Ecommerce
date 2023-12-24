"use strict";

const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage");
const productColor = document.getElementById("productColor");
const productSizeList = document.getElementById("productSizeList");

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
sizes.forEach((size) => {
  const sizeListItem = document.createElement("li");
  sizeListItem.className =
    "font-bold bg-gray-200 text-black w-9 h-9 flex items-center justify-center rounded-lg sizeListItem";
  sizeListItem.setAttribute("data-size", size);

  const sizeBtn = document.createElement("button");
  sizeBtn.className = "uppercase w-full h-full";
  sizeBtn.textContent = size;

  sizeListItem.appendChild(sizeBtn);
  productSizeList.appendChild(sizeListItem);
});

const sizeItems = document.querySelectorAll("#productSizeList li");

sizeItems.forEach((item) => {
  item.addEventListener("click", () => {
    sizeItems.forEach((resetItem) => {
      resetItem.style.backgroundColor = "rgb(229, 231, 235)";
      resetItem.style.color = "black";
    });
    
    item.style.backgroundColor = item.style.backgroundColor === "black" ? "rgb(229, 231, 235)" : "black";
    item.style.color = item.style.color === "white" ? "black" : "white";
  });
});
