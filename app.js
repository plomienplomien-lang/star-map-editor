const titleInput = document.getElementById("title");
const posterTitle = document.getElementById("poster-title");
const previewTitle = document.getElementById("preview-title");
const fontSelect = document.getElementById("font");
const fontsizeInput = document.getElementById("fontsize");
const styleSelect = document.getElementById("style");

const canvas = document.getElementById("poster-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

// --- Funkcja do losowych gwiazdek ---
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // tło gradient
  const style = styleSelect.value;
  let gradient;
  if(style === "stars") {
    gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(1, "#1a1a30");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i=0;i<150;i++){
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2,0,Math.PI*2);
      ctx.fill();
    }
  } else if(style === "dark") {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  } else if(style === "white") {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  } else if(style === "pastel") {
    gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    gradient.addColorStop(0, "#ffe0e0");
    gradient.addColorStop(1, "#d0f0ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
}

// --- Podgląd tytułu ---
function updateTitle() {
  posterTitle.innerText = titleInput.value;
  posterTitle.style.fontFamily = fontSelect.value;
  posterTitle.style.fontSize = fontsizeInput.value + "px";
  previewTitle.innerText = titleInput.value;
}

// --- Zmiana stylu plakatu ---
styleSelect.addEventListener("change", drawStars);

// --- Eventy ---
titleInput.addEventListener("input", updateTitle);
fontSelect.addEventListener("change", updateTitle);
fontsizeInput.addEventListener("input", updateTitle);

// --- Eksport PNG ---
document.getElementById("download").addEventListener("click", () => {
  html2canvas(document.getElementById("poster")).then(canvas => {
    const link = document.createElement('a');
    link.download = 'poster.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

// --- Init ---
drawStars();
updateTitle();
