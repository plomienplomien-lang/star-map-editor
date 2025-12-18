const titleInput = document.getElementById("title");
const posterTitle = document.getElementById("poster-title");
const previewTitle = document.getElementById("preview-title");
const fontSelect = document.getElementById("font");
const fontsizeInput = document.getElementById("fontsize");
const styleSelect = document.getElementById("style");
const poster = document.getElementById("poster");

// Aktualizacja tytułu na plakacie i w podglądzie
function updateTitle() {
  posterTitle.innerText = titleInput.value;
  previewTitle.innerText = titleInput.value;
  posterTitle.style.fontFamily = fontSelect.value;
  posterTitle.style.fontSize = fontsizeInput.value + "px";
}

titleInput.addEventListener("input", updateTitle);
fontSelect.addEventListener("change", updateTitle);
fontsizeInput.addEventListener("input", updateTitle);

// Zmiana stylu plakatu
styleSelect.addEventListener("change", () => {
  const style = styleSelect.value;
  switch(style) {
    case "white":
      poster.style.background = "#fff";
      posterTitle.style.color = "#000";
      break;
    case "dark":
      poster.style.background = "#000";
      posterTitle.style.color = "#fff";
      break;
    case "pastel":
      poster.style.background = "#a3c4f3";
      posterTitle.style.color = "#000";
      break;
  }
});

// Pobierz PNG
document.getElementById("download").addEventListener("click", () => {
  html2canvas(poster).then(canvas => {
    const link = document.createElement('a');
    link.download = 'poster.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

// inicjalizacja
updateTitle();
