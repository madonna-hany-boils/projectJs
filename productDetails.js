// Retrieve the product details from localStorage
const productData = localStorage.getItem("selectedProduct");

// Parse the JSON string back into an object
if (productData) {
  const product = JSON.parse(productData);

  // Populate details on the page
  document.getElementById("productName").innerText += product.title;
  document.getElementById("productPrice").innerText += `${product.price}$`;
  document.getElementById("productcategory").innerText += product.category;
  document.getElementById("productQuntatiy").innerText += product.stock;

  document.getElementById("productBrand").innerText += product.brand||"";
  document.querySelector("img").src = product.images[0];
} else {
  console.error("No product data found in localStorage.");
}
