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

let perroX = 0;
let perroY = 0;
let perroScale = 1;

/* Movimiento con mouse */
document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);

  perroX = x * 18;
  perroY = y * 6;

  actualizarPerrito();
});

/* Respiración */
setInterval(() => {
  perroScale = perroScale === 1 ? 1.04 : 1;
  actualizarPerrito();
}, 2000);

/* Click ❤️ */
perrito.addEventListener("click", () => {
  perroScale = 1.2;
  actualizarPerrito();
  corazonGigante();

  setTimeout(() => {
    perroScale = 1;
    actualizarPerrito();
  }, 600);
});

function actualizarPerrito() {
  perrito.style.transform =
    `translateX(-50%) translate(${perroX}px, ${perroY}px) scale(${perroScale})`;
}


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
