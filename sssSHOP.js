function sortCartByPrice() {
    myCart.products.sort((a, b) => {
        const priceA = toNum(a.price);
        const priceB = toNum(b.price);
        return priceA - priceB;
    });
    localStorage.setItem("cart", JSON.stringify(myCart));
    popupContainerFill();
}

    
    // Функция для обрезки текста
    function truncate(str, maxlength) {
        if (str.length > maxlength) {
          return str.slice(0, maxlength - 1) + "…";
        } else {
          return str;
        }
      }
  
      document.addEventListener("DOMContentLoaded", function () {
        const cardTitleElements = document.querySelectorAll('.card__title');
  
        cardTitleElements.forEach(function (element) {
          element.textContent = truncate(element.textContent, 50);
        });
      });
  
      // Функции для преобразования строки в число и форматирования валюты
      function toNum(str) {
        const num = Number(str.replace(/ /g, ""));
        return num;
      }
  
      function toCurrency(num) {
        const format = new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "RUB",
          minimumFractionDigits: 0,
        }).format(num);
        return format;
      }
  
      const cardAddArr = Array.from(document.querySelectorAll(".card__add"));
      const cartNum = document.querySelector("#cart_num");
      const cart = document.querySelector("#cart");
  
      // Класс для корзины
      class Cart {
        products;
        constructor() {
          this.products = [];
        }
        get count() {
          return this.products.reduce((acc, product) => acc + product.quantity, 0);
        }
        addProduct(product) {
          const existingProduct = this.products.find(p => p.name === product.name);
  
          if (existingProduct) {
            existingProduct.quantity++;
          } else {
            this.products.push(product);
          }
        }
        removeProduct(product) {
          const index = this.products.findIndex(p => p.name === product.name);
          if (index !== -1) {
            this.products.splice(index, 1);
          }
        }
        get cost() {
          return this.products.reduce((acc, product) => acc + (toNum(product.price) * product.quantity), 0);
        }
      }
  
      // Класс для продукта
      class Product {
        imageSrc;
        name;
        price;
        quantity;
  
        constructor(card) {
          this.imageSrc = card.querySelector(".card__image").children[0].src;
          this.name = card.querySelector(".card__title").innerText;
          this.price = card.querySelector(".card__price--common").innerText;
          this.quantity = 1; 
        }
      }
  
      const myCart = new Cart();
  
      if (localStorage.getItem("cart") == null) {
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
  
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      myCart.products = savedCart.products;
      cartNum.textContent = myCart.count;
  
      cardAddArr.forEach((cardAdd) => {
        cardAdd.addEventListener("click", (e) => {
          e.preventDefault();
          const card = e.target.closest(".card");
          const product = new Product(card);
          const savedCart = JSON.parse(localStorage.getItem("cart"));
          myCart.products = savedCart.products;
          myCart.addProduct(product);
  
          localStorage.setItem("cart", JSON.stringify(myCart));
          cartNum.textContent = myCart.count;
        });
      });
  
      // Попап
      const popup = document.querySelector(".popup");
      const popupClose = document.querySelector("#popup_close");
      const body = document.body;
      const popupContainer = document.querySelector("#popup_container");
      const popupProductList = document.querySelector("#popup_product_list");
      const popupCost = document.querySelector("#popup_cost");
  
      cart.addEventListener("click", (e) => {
        e.preventDefault();
        popup.classList.add("popup--open");
        body.classList.add("lock");
        popupContainerFill();
      });
  
      function changeQuantity(action, productName) {
        const index = myCart.products.findIndex(product => product.name === productName);
  
        if (index !== -1) {
          if (action === '+') {
            myCart.products[index].quantity++;
          } else if (action === '-' && myCart.products[index].quantity > 1) {
            myCart.products[index].quantity--;
          }
  
          localStorage.setItem("cart", JSON.stringify(myCart));
          popupContainerFill();
          cartNum.textContent = myCart.count;
        }
      }
  
      function popupContainerFill() {
        popupProductList.innerHTML = null;
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        myCart.products = savedCart.products;
        const productsHTML = myCart.products.map((product) => {
          const productItem = document.createElement("div");
          productItem.classList.add("popup__product");
  
          const productWrap1 = document.createElement("div");
          productWrap1.classList.add("popup__product-wrap");
          const productWrap2 = document.createElement("div");
          productWrap2.classList.add("popup__product-wrap");
  
          const productImage = document.createElement("img");
          productImage.classList.add("popup__product-image");
          productImage.setAttribute("src", product.imageSrc);
  
          const productTitle = document.createElement("h2");
          productTitle.classList.add("popup__product-title");
          productTitle.innerHTML = product.name;
  
          const productPrice = document.createElement("div");
          productPrice.classList.add("popup__product-price");
          productPrice.innerHTML = toCurrency(toNum(product.price));
  
          const productDelete = document.createElement("button");
          productDelete.classList.add("popup__product-delete");
          productDelete.innerHTML = "&#10006;";
  
          const productQuantity = document.createElement("span");
          productQuantity.classList.add("popup__quantity-value");
          productQuantity.innerHTML = product.quantity;
  
          const productQuantityBtnPlus = document.createElement("button");
          productQuantityBtnPlus.classList.add("popup__quantity-btn");
          productQuantityBtnPlus.innerHTML = "+";
          productQuantityBtnPlus.dataset.action = "+";
          productQuantityBtnPlus.dataset.productName = product.name;
  
          const productQuantityBtnMinus = document.createElement("button");
          productQuantityBtnMinus.classList.add("popup__quantity-btn");
          productQuantityBtnMinus.innerHTML = "-";
          productQuantityBtnMinus.dataset.action = "-";
          productQuantityBtnMinus.dataset.productName = product.name;
  
          productQuantityBtnPlus.addEventListener("click", () => {
            changeQuantity('+', product.name);
          });
  
          productQuantityBtnMinus.addEventListener("click", () => {
            changeQuantity('-', product.name);
          });
  
          productDelete.addEventListener("click", () => {
            myCart.removeProduct(product);
            localStorage.setItem("cart", JSON.stringify(myCart));
            popupContainerFill();
            cartNum.textContent = myCart.count;
          });

          const sortButton = document.createElement("button");
          sortButton.textContent = "Сортировать по цене";
          sortButton.classList.add("popup__sort-btn");
          
          sortButton.addEventListener("click", () => {
              sortCartByPrice();
          });
  
          productWrap1.appendChild(productImage);
          productWrap1.appendChild(productTitle);
          productWrap2.appendChild(productPrice);
          productWrap2.appendChild(productQuantityBtnMinus);
          productWrap2.appendChild(productQuantity);
          productWrap2.appendChild(productQuantityBtnPlus);
          productWrap2.appendChild(productDelete);
          productItem.appendChild(productWrap1);
          productItem.appendChild(productWrap2);

          return productItem;
        });
  
        productsHTML.forEach((productHTML) => {
          popupProductList.appendChild(productHTML);
        });
  
        popupCost.textContent = toCurrency(myCart.cost);
      }
  
      popupClose.addEventListener("click", (e) => {
        e.preventDefault();
        popup.classList.remove("popup--open");
        body.classList.remove("lock");
      });
  
      function filterProductsByPrice(minPrice, maxPrice) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const priceElement = card.querySelector('.card__price--common');
            const price = toNum(priceElement.textContent);
            if (price >= minPrice && price <= maxPrice) {
                card.classList.remove('hidden'); 
            } else {
                card.classList.add('hidden'); 
            }
        });
    }
    
    
const filterButton = document.createElement("button");
filterButton.textContent = "Фильтровать по цене";
filterButton.classList.add("filter-btn");

const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");

filterButton.addEventListener("click", () => {
    const minPrice = parseFloat(minPriceInput.value);
    const maxPrice = parseFloat(maxPriceInput.value);

    if (isNaN(minPrice) || isNaN(maxPrice)) {
        alert("Пожалуйста, введите числовые значения.");
        return;
    }

    filterProductsByPrice(minPrice, maxPrice);
});
minPriceInput.addEventListener("input", resetFilter);
maxPriceInput.addEventListener("input", resetFilter);

function resetFilter() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('hidden');
    });
}
    

// Добавляем кнопку фильтрации в каталог товаров
const productInfo = document.querySelector('.product__info .container');
productInfo.appendChild(filterButton);
    