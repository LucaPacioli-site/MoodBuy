let currentSection = '';
let cart = [];

// Sample partner products
const sampleProducts = {
  cravings: [
    { name: "Adobo Rice", brand: "Filipino Delights", price: "₱150", img: "images/adobo.jpg" },
    { name: "Halo-Halo", brand: "Dessert Paradise", price: "₱120", img: "images/halo_halo.jpg" },
    { name: "Cheese Sticks", brand: "SnackLab", price: "₱80", img: "images/cheese_sticks.jpg" }
  ],
  ootd: [
    { name: "Prom Gown", brand: "Glamour Fashion", price: "₱2500", img: "images/prom_gown.jpg" },
    { name: "Sneakers", brand: "Urban Steps", price: "₱1200", img: "images/sneakers.jpg" },
    { name: "Fragrance", brand: "Aroma Luxe", price: "₱950", img: "images/fragrance.jpg" }
  ]
};

// Login
function login() {
  const username = document.getElementById('username').value;
  if(!username.trim()){ alert("Enter username"); return; }
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('userDisplay').textContent = username;
}

// Show mood input
function showMoodInput(section){
  currentSection = section;
  document.getElementById('moodInputSection').style.display = 'flex';
  document.getElementById('aiProducts').style.display = 'none';
  document.getElementById('aiLoading').style.display = 'none';
  document.getElementById('moodText').value = '';
}

// AI suggestion with smooth thinking
function processMood(){
  const mood = document.getElementById('moodText').value.trim().toLowerCase();
  if(!mood){ alert("Enter mood"); return; }

  document.getElementById('aiProducts').style.display = 'none';
  document.getElementById('aiLoading').style.display = 'block';

  setTimeout(() => {
    document.getElementById('aiLoading').style.display = 'none';
    renderProducts(mood);
  }, 1000); // 1 second AI thinking effect
}

// Render products
function renderProducts(mood){
  let products = [];
  if(currentSection === 'cravings'){
    products = sampleProducts.cravings.filter(p => p.name.toLowerCase().includes(mood));
  } else if(currentSection === 'ootd'){
    products = sampleProducts.ootd.filter(p => p.name.toLowerCase().includes(mood));
  }
  if(products.length === 0){
    products = currentSection === 'cravings' ? sampleProducts.cravings : sampleProducts.ootd;
  }

  const aiProductsDiv = document.getElementById('aiProducts');
  aiProductsDiv.innerHTML = '';
  products.forEach(p => {
    aiProductsDiv.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <div class="product-info">
          <h4>${p.name}</h4>
          <p>${p.brand}</p>
          <span>${p.price}</span>
          <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart 🛒</button>
        </div>
      </div>`;
  });
  aiProductsDiv.style.display = 'grid';
}

// Voice input
function startVoiceRecognition(){
  if(!('webkitSpeechRecognition' in window)){ alert("Your browser does not support voice input."); return; }
  const recognition = new webkitSpeechRecognition();
  recognition.lang='en-US';
  recognition.interimResults=false;
  recognition.maxAlternatives=1;
  recognition.start();
  recognition.onresult = function(event){
    const voiceText = event.results[0][0].transcript;
    document.getElementById('moodText').value = voiceText;
    processMood();
  };
  recognition.onerror = function(event){ alert("Voice recognition error: "+event.error); };
}

// Cart functions
function addToCart(product){
  cart.push(product);
  document.getElementById('cartContainer').style.display = 'block';
  renderCart();
}

function renderCart(){
  const cartItemsDiv = document.getElementById('cartItems');
  cartItemsDiv.innerHTML = '';
  cart.forEach((item, index) => {
    cartItemsDiv.innerHTML += `
      <div>
        ${item.name} - ${item.price} 
        <button onclick='removeFromCart(${index})'>❌</button>
      </div>`;
  });
}

function removeFromCart(index){
  cart.splice(index,1);
  renderCart();
  if(cart.length === 0) document.getElementById('cartContainer').style.display = 'none';
}

function checkout(){
  if(cart.length === 0){ alert("Your cart is empty!"); return; }
  let total = cart.reduce((sum,item)=> sum + parseInt(item.price.replace("₱","")),0);
  alert(`Thank you for shopping! Total: ₱${total}`);
  cart = [];
  renderCart();
  document.getElementById('cartContainer').style.display = 'none';
}
