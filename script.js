let currentSection = '';
const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY'; // Get free key from https://www.pexels.com/api/

function login() {
  const username = document.getElementById('username').value;
  if(!username.trim()){ alert("Enter username"); return; }
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('userDisplay').textContent = username;
}

function showMoodInput(section){
  currentSection = section;
  document.getElementById('moodInputSection').style.display = 'flex';
  document.getElementById('aiProducts').style.display = 'none';
  document.getElementById('moodText').value = '';
}

function processMood(){
  const mood = document.getElementById('moodText').value.trim();
  if(!mood){ alert("Enter mood"); return; }

  let query = currentSection === 'cravings' ? `${mood} food` : `${mood} fashion`;

  fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6`, {
    headers: { Authorization: PEXELS_API_KEY }
  })
  .then(res => res.json())
  .then(data => {
    const aiProductsDiv = document.getElementById('aiProducts');
    aiProductsDiv.innerHTML = '';
    data.photos.forEach(photo => {
      aiProductsDiv.innerHTML += `
        <div class="product-card">
          <img src="${photo.src.medium}" alt="${photo.alt}">
          <div class="product-info">
            <h4>${photo.alt || "Product"}</h4>
            <p>Trending Brand</p>
            <span>₱${Math.floor(Math.random()*3000+50)}</span>
          </div>
        </div>`;
    });
    aiProductsDiv.style.display = 'grid';
  })
  .catch(err => alert("Failed to fetch products. Check API key or network."));
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
