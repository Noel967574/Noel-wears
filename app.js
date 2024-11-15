// Hamburger Menu Toggle for Small Screens
const hamburgerMenu = document.getElementById('hamburger-menu');
const menuList = document.getElementById('menu-list');

hamburgerMenu.addEventListener('click', () => {
  menuList.classList.toggle('show');
});

// Cart Toggle Functionality
let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function() {
  if (cart.style.right === '-100%') {
    cart.style.right = '0';
    container.style.transform = 'translateX(-400px)';
  } else {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
  }
});

close.addEventListener('click', function() {
  cart.style.right = '-100%';
  container.style.transform = 'translateX(0)';
});

// Pagination variables
const productsPerPage = 5; // Define the number of products per page
let currentPage = 1;
let products = null;

// Fetch and Display Product Data
fetch('product.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    addDataToHTML();
    setupPaginationControls();
  });

// Display Products in HTML with Pagination
function addDataToHTML() {
  let listProductHTML = document.querySelector('.listProduct');
  listProductHTML.innerHTML = '';

  if (products !== null) {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {
      let newProduct = document.createElement('div');
      newProduct.classList.add('item');
      newProduct.innerHTML = 
      `<img src="${product.image}" alt="">
      <h2>${product.name}</h2>
      <div class="price">$${product.price}</div>
      <button onclick="addCart(${product.id})">Add To Cart</button>`;

      listProductHTML.appendChild(newProduct);
    });
  }
}

// Pagination Controls
function setupPaginationControls() {
  const paginationControls = document.querySelector('.pagination');
  const totalPages = Math.ceil(products.length / productsPerPage);

  paginationControls.innerHTML = '';

  // Create Previous Button
  const prevButton = document.createElement('button');
  prevButton.innerText = 'Previous';
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    currentPage--;
    addDataToHTML();
    setupPaginationControls();
  };
  paginationControls.appendChild(prevButton);

  // Create Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.classList.toggle('active', i === currentPage);
    pageButton.onclick = () => {
      currentPage = i;
      addDataToHTML();
      setupPaginationControls();
    };
    paginationControls.appendChild(pageButton);
  }

  // Create Next Button
  const nextButton = document.createElement('button');
  nextButton.innerText = 'Next';
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    currentPage++;
    addDataToHTML();
    setupPaginationControls();
  };
  paginationControls.appendChild(nextButton);
}

// Cart Management with Cookies
let listCart = [];

function checkCart() {
  var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
  
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split('=')[1]);
  } else {
    listCart = [];
  }
}
checkCart();

function addCart(idProduct) {
  let productsCopy = JSON.parse(JSON.stringify(products));

  if (!listCart[idProduct]) {
    listCart[idProduct] = productsCopy.find(product => product.id === idProduct);
    listCart[idProduct].quantity = 1;
  } else {
    listCart[idProduct].quantity++;
  }

  document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  addCartToHTML();
}

function addCartToHTML() {
  let listCartHTML = document.querySelector('.listCart');
  listCartHTML.innerHTML = '';

  let totalHTML = document.querySelector('.totalQuantity');
  let totalQuantity = 0;

  if (listCart) {
    listCart.forEach(product => {
      if (product) {
        let newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.innerHTML = 
          `<img src="${product.image}">
          <div class="content">
            <div class="name">${product.name}</div>
            <div class="price">$${product.price} / 1 product</div>
          </div>
          <div class="quantity">
            <button onclick="changeQuantity(${product.id}, '-')">-</button>
            <span class="value">${product.quantity}</span>
            <button onclick="changeQuantity(${product.id}, '+')">+</button>
          </div>`;
        
        listCartHTML.appendChild(newCart);
        totalQuantity += product.quantity;
      }
    });
  }
  totalHTML.innerText = totalQuantity;
}

function changeQuantity(idProduct, type) {
  if (type === '+') {
    listCart[idProduct].quantity++;
  } else if (type === '-') {
    listCart[idProduct].quantity--;

    if (listCart[idProduct].quantity <= 0) {
      delete listCart[idProduct];
    }
  }

  document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  addCartToHTML();
}


