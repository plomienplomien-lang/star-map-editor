// --- KONFIGURACJA MAPY ---
const config = {
  width: 600,
  projection: "airy",
  background: { fill: "#000" },
  stars: { show: true, limit: 6, size: 4 },
  dsos: { show: false },
  constellations: { show: true, stroke: "#444", names: false },
  lines: { graticule: { show: false } }
};

Celestial.display(config);

// --- ELEMENTY ---
const titleInput = document.getElementById("title");
const posterTitle = document.getElementById("poster-title");
const previewTitle = document.getElementById("preview-title");
const dateInput = document.getElementById("date");
const fontSelect = document.getElementById("font");
const fontsizeInput = document.getElementById("fontsize");
const styleSelect = document.getElementById("style");
const cityInput = document.getElementById("city");

// --- PODGLĄD NA ŻYWO ---
function updateTitle() {
  posterTitle.innerText = titleInput.value;
  previewTitle.innerText = titleInput.value;
  posterTitle.style.fontFamily = fontSelect.value;
  posterTitle.style.fontSize = fontsizeInput.value + "px";
}

titleInput.addEventListener("input", updateTitle);
fontSelect.addEventListener("change", updateTitle);
fontsizeInput.addEventListener("input", updateTitle);

// --- ZMIANA STYLU MAPY ---
styleSelect.addEventListener("change", () => {
  const style = styleSelect.value;
  switch(style) {
    case "dark":
      Celestial.config.background.fill = "#000";
      break;
    case "light":
      Celestial.config.background.fill = "#eee";
      break;
    case "pastel":
      Celestial.config.background.fill = "#a3c4f3";
      break;
  }
  Celestial.redraw();
});

// --- GENERUJ MAPĘ ---
document.getElementById("generate").addEventListener("click", () => {
  if (dateInput.value) {
    const d = new Date(dateInput.value);
    Celestial.date(d);
    Celestial.redraw();
  }
  // lokalizacja – jeśli wpisano jako lat,lon np. "52.23,21.01"
  if (cityInput.value.includes(",")) {
    const parts = cityInput.value.split(",");
    const lat = parseFloat(parts[0].trim());
    const lon = parseFloat(parts[1].trim());
    if (!isNaN(lat) && !isNaN(lon)) {
      Celestial.location([lon, lat]);
      Celestial.redraw();
    }
  }
});

// --- POBIERZ PNG ---
document.getElementById("download").addEventListener("click", () => {
  Celestial.exportPNG("star-map.png");
});

// --- INITIAL UPDATE ---
updateTitle();
