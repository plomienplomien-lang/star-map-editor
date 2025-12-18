// Konfiguracja mapy gwiazd
const config = {
  width: 600,
  projection: "airy",
  background: { fill: "#000" },
  stars: {
    show: true,
    limit: 6,
    size: 4
  },
  dsos: { show: false },
  constellations: {
    show: true,
    stroke: "#444",
    names: false
  },
  lines: {
    graticule: { show: false }
  }
};

// Inicjalizacja
Celestial.display(config);

// Obsługa generowania
document.getElementById("generate").addEventListener("click", () => {
  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value;

  document.getElementById("poster-title").innerText = title;

  if (date) {
    const d = new Date(date);
    Celestial.date(d);
    Celestial.redraw();
  }
});

// Eksport do PNG
document.getElementById("download").addEventListener("click", () => {
  Celestial.exportPNG("star-map.png");
});