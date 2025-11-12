let currentSection = '';

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

  // Replace with your backend API URL
  fetch('https://lucapacioli-site.github.io/MoodBuy/',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({section:currentSection,mood})
  }).then(res=>res.json())
    .then(data=>{
      const aiProductsDiv = document.getElementById('aiProducts');
      aiProductsDiv.innerHTML='';
      data.recommendations.forEach(item=>{
        aiProductsDiv.innerHTML += `
        <div class="product-card">
          <img src="${item.img}" alt="${item.name}">
          <div class="product-info">
            <h4>${item.name}</h4>
            <p>${item.brand}</p>
            <span>${item.price}</span>
          </div>
        </div>`;
      });
      aiProductsDiv.style.display='grid';
    });
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
