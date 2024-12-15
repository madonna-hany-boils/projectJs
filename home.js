var arr = ["/images/pexels-n-voitkevich-8939806.jpg","/images/pexels-nietjuh-934070 (1).jpg", "images/pexels-pixabay-264636.jpg", "images/pexels-karolina-grabowska-5632371.jpg", "images/pexels-lum3n-44775-322207.jpg"];
//global
var currentIndex = 0;
var image = document.images[0];
//var arr=[];
function Next() {
  currentIndex = (currentIndex + 1) % arr.length;
  image.src = arr[currentIndex];
}
//var currentIndex = 0;
function Previous() {
  currentIndex = (((currentIndex - 1) % arr.length) + arr.length) % arr.length;
  image.src = arr[currentIndex];
}
function Play() {
  count = setInterval(function () {
    currentIndex = (currentIndex + 1) % arr.length;
    image.src = arr[currentIndex];
    // currentIndex++;
  }, 2000);
}
var count = 0;
// window.onload=()=>{
//   Play()
// }

function Stop() {
  clearInterval(count);
}
//end slider

//////////////////////////////////////////////////////////////////////////////////////////////////display priducts
var div_products = document.getElementsByClassName("products")[0];
const categoryButtons = [
  document.getElementById("cat1"),
  document.getElementById("cat2"),
  document.getElementById("cat3"),
  document.getElementById("cat4"),
];

async function getProducts() {
  try {
    var response = await fetch(`https://dummyjson.com/products`);
    let data = await response.json();
    //   console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
}

getProducts().then((result) => {
  result = result.products;
  // console.log(result)
  var categories = [];
  //get categories of products
  for (let i = 0; i < result.length; i++) {
    if (!categories.includes(result[i].category)) {
      categories.push(result[i].category);
    }
  }
  //////////////////////


  //set category name in button text
  categoryButtons.forEach((button, index) => {
    if (categories[index]) {
      // button.innerText = categories[index].toUpperCase();
      button.onclick = () => filterByCategory(categories[index], result);
    }
  });

  // console.log(categories);
  createCard(result);
});

function createCard(products) {
  for (let i = 0; i < products.length; i++) {
    var div = document.createElement("div");
    var div2 = document.createElement("div");

    var title = document.createElement("h3");
    var img = document.createElement("img");
    var price = document.createElement("p");
    var cart = document.createElement("p");
    var detailbtn = document.createElement("button");
    img.src = `${products[i].images[0]}`;
    title.innerHTML = products[i].title;

    
    //price.innerHTML = products[i].price*input.value + `$`;
    cart.innerHTML = ` <i class="fa-solid fa-cart-shopping"></i>`;
    detailbtn.innerHTML = "Details";
    div.classList.add("card");

    div2.classList.add("cartDetailDiv");
    div2.append(detailbtn, cart);
    div.append(img, title, price, div2);

    //####################################### render to product details page
    detailbtn.onclick = () => {
      localStorage.setItem("selectedProduct", JSON.stringify(products[i]));
      // Redirect to the product details page
      location.assign("/productDetails.html");
    };
    cart.onclick = () => {
      // Retrieve existing cart data from localStorage or initialize as an empty array
      let arr = JSON.parse(localStorage.getItem("Products")) || [];
  
      // Add the current product to the cart
      arr.push(products[i]);
  
      // Save the updated cart back to localStorage
      localStorage.setItem("Products", JSON.stringify(arr));
  
      // Redirect to the cart page
      location.assign("/cart.html");
  };
  

    div_products.appendChild(div);
  }
}

function filterByCategory(category, products) {
  //get all product of this category
  var categoryData = products.filter((product) => {
    return product.category == category;
  });
  div_products.innerHTML = "";
  createCard(categoryData);
}
