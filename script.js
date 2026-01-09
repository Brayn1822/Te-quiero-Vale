/* =====================
   REFERENCIAS
===================== */

const cielo = document.getElementById("cielo");
const pasto = document.getElementById("pasto");
const perrito = document.getElementById("perrito");
const svgEstrellas = document.getElementById("estrellas");

svgEstrellas.setAttribute("viewBox", "0 0 1000 600");

/* =====================
   ESTRELLAS
===================== */

const estrellas = [];
const TOTAL = 150;

for (let i = 0; i < TOTAL; i++) {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  const x = Math.random() * 1000;
  const y = Math.random() * 280;
  const r = Math.random() * 1.4 + 0.3;

  s.setAttribute("cx", x);
  s.setAttribute("cy", y);
  s.setAttribute("r", r);
  s.setAttribute("fill", "white");
  s.style.opacity = Math.random();

  svgEstrellas.appendChild(s);

  estrellas.push({ el: s, x, y, speed: Math.random() * 0.015 + 0.01 });
}

function animarEstrellas() {
  estrellas.forEach(e => {
    let o = parseFloat(e.el.style.opacity);
    o += (Math.random() - 0.5) * e.speed;
    e.el.style.opacity = Math.max(0.3, Math.min(1, o));
  });
  requestAnimationFrame(animarEstrellas);
}
animarEstrellas();

/* =====================
   PARALLAX
===================== */
pasto.addEventListener("load", () => {
  const doc = pasto.contentDocument;
  if (!doc) return;

  const svg = doc.querySelector("svg");
  const tulipanBase = svg.querySelector("g, path");
  if (!tulipanBase) return;

  for (let i = 0; i < 10; i++) {
    const clone = tulipanBase.cloneNode(true);

    const x = Math.random() * 900;
    const scale = 0.4 + Math.random() * 0.2; // 🔽 más pequeños

    clone.setAttribute(
      "transform",
      `translate(${x}, 0) scale(${scale})`
    );

    svg.appendChild(clone);
  }
});


/* =====================
   TULIPANES EXTRA
===================== */

pasto.addEventListener("load", () => {
  const doc = pasto.contentDocument;
  if (!doc) return;

  const base = doc.querySelector("svg > g, svg > path");
  if (!base) return;

  for (let i = 0; i < 8; i++) {
    const c = base.cloneNode(true);
    c.setAttribute(
      "transform",
      `translate(${Math.random() * 900}, ${Math.random() * 40})
       scale(${0.7 + Math.random() * 0.4})`
    );
    doc.querySelector("svg").appendChild(c);
  }
});

/* =====================
   PERRITO VIVO
===================== */

setInterval(() => {
  perrito.style.transform += " scale(1.03)";
  setTimeout(() => {
    perrito.style.transform =
      perrito.style.transform.replace(" scale(1.03)", "");
  }, 800);
}, 2200);

/* =====================
   CORAZÓN ❤️
===================== */

function corazonGigante() {
  const c = document.createElement("div");
  c.innerHTML = "❤️<div>Te quiero</div>";

  Object.assign(c.style, {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%) scale(0)",
    fontSize: "160px",
    color: "white",
    textAlign: "center",
    zIndex: 10,
    transition: "transform 0.6s ease, opacity 0.6s ease",
    pointerEvents: "none"
  });

  c.querySelector("div").style.fontSize = "42px";
  c.querySelector("div").style.fontFamily = "cursive";

  document.body.appendChild(c);

  requestAnimationFrame(() => {
    c.style.transform = "translate(-50%, -50%) scale(1)";
  });

  setTimeout(() => {
    c.style.opacity = "0";
    c.style.transform = "translate(-50%, -50%) scale(1.4)";
  }, 1800);

  setTimeout(() => c.remove(), 2600);
}

perrito.addEventListener("click", () => {
  perrito.style.transform += " scale(1.2)";
  corazonGigante();

  setTimeout(() => {
    perrito.style.transform =
      perrito.style.transform.replace(" scale(1.2)", "");
  }, 600);
});

/* =====================
   ESTRELLA FUGAZ
===================== */

setInterval(() => {
  const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
  const x = Math.random() * 800;
  const y = Math.random() * 200;

  l.setAttribute("x1", x);
  l.setAttribute("y1", y);
  l.setAttribute("x2", x + 120);
  l.setAttribute("y2", y + 30);
  l.setAttribute("stroke", "white");
  l.setAttribute("stroke-width", "1.4");

  svgEstrellas.appendChild(l);

  let p = 0;
  const a = setInterval(() => {
    p += 0.05;
    l.style.opacity = 1 - p;
    if (p >= 1) {
      clearInterval(a);
      l.remove();
    }
  }, 16);
}, 9000);
