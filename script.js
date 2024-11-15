// Function to add product to cart and redirect to cart page
document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.new-product-cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            
            // Get current cart from local storage or initialize empty array
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Add new product to cart
            cart.push({ name: productName, price: productPrice });
            
            // Save updated cart back to local storage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Redirect to cart page
            window.location.href = 'cart.html';  // Adjust the path as necessary
        });
    });
});

const slides = document.querySelectorAll('.slide');
const contentDisplay = document.getElementById('product-content');

function showCategory(categoryId) {
    // Get all category sections
    const sections = document.querySelectorAll('.category-section');

    // Hide all sections
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(categoryId).style.display = 'block';
}


// Get the button
let mybutton = document.getElementById("backToTopBtn");

// When the user clicks on the button, scroll to the top of the document
mybutton.onclick = function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};


// Login Functionality
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");
  
    if (username === "Noel" && password === "developerNoel") {
      // Set logged-in status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      // Add class to body to hide login overlay and show main content
      document.body.classList.add("logged-in");
      // Hide error message if visible
      errorMessage.style.display = "none";
    } else {
      errorMessage.style.display = "block";
    }
  }
  
  // Check login status on page load
  document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      document.body.classList.add("logged-in");
    } else {
      document.body.classList.remove("logged-in");
    }
  
    // Handle Back to Top Button visibility
    const backToTopBtn = document.getElementById("backToTopBtn");
  
    window.onscroll = function () {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };
  
    // When the user clicks on the button, scroll to the top of the document
    backToTopBtn.onclick = function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  });
  
  // Optional: Prevent accessing main content without login
  window.onload = function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      document.getElementById("mainContent").style.display = "none";
      document.getElementById("loginOverlay").style.display = "flex";
    }
  };
  