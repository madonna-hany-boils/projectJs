var products=JSON.parse(localStorage.getItem("Products")) 
;

if(products){
    console.log(products);
}
for(let i in products){
   // console.log(products[i]);
   var div = document.createElement("div");
   var trash = document.createElement("div");
   var div_price = document.createElement("div");
var input=document.createElement("input");
input.type="number";
input.min=1;
input.max=products[i].stock;
   var div2 = document.getElementsByClassName("container")[0];
   var title = document.createElement("h3");
   var img = document.createElement("img");
   var price = document.createElement("p");
div_price.append(price);
   trash.innerHTML=`<i class="fa-solid fa-trash"></i> `
   div.classList.add("divProduct");
   img.src = `${products[i].images[0]}`;
   title.innerHTML = products[i].title;
   price.innerHTML = products[i].price + `$`;
   input.onchange=()=>{
    price.innerHTML = products[i].price*input.value + `$`;

    }
   div_price.append(price)
   div.append(img,title,input,div_price,trash)
div2.append(div)

   trash.onclick=()=>{
    products.splice(i, 1);
    localStorage.setItem("Products", JSON.stringify(products));
    div.remove(); // Removes the product div from the UI
    location.reload();
   }
}