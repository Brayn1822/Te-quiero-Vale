/* =========================
   REFERENCIAS
========================= */

const cielo = document.getElementById("cielo");
const pasto = document.getElementById("pasto");
const perrito = document.getElementById("perrito");
const svgEstrellas = document.getElementById("estrellas");

svgEstrellas.setAttribute("viewBox", "0 0 1000 600");

/* =========================
   ESTRELLAS
========================= */

const NUM_ESTRELLAS = 140;
const estrellas = [];

for (let i = 0; i < NUM_ESTRELLAS; i++) {
  const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  const x = Math.random() * 1000;
  const y = Math.random() * 280;
  const r = Math.random() * 1.4 + 0.3;

  star.setAttribute("cx", x);
  star.setAttribute("cy", y);
  star.setAttribute("r", r);
  star.setAttribute("fill", "white");
  star.style.opacity = Math.random();

  svgEstrellas.appendChild(star);

  estrellas.push({
    el: star,
    baseX: x,
    baseY: y,
    speed: Math.random() * 0.015 + 0.008
  });
}

function animarEstrellas() {
  estrellas.forEach(star => {
    let o = parseFloat(star.el.style.opacity);
    o += (Math.random() - 0.5) * star.speed;
    star.el.style.opacity = Math.max(0.3, Math.min(1, o));
  });
  requestAnimationFrame(animarEstrellas);
}
animarEstrellas();

/* =========================
   PARALLAX GENERAL
========================= */

document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);

  cielo.style.transform = `translate(${x * 10}px, ${y * 10}px)`;

  estrellas.forEach(s => {
    s.el.setAttribute("cx", s.baseX + x * 25);
    s.el.setAttribute("cy", s.baseY + y * 12);
  });

  pasto.style.transform = `translate(${x * 4}px, 0)`;

  perrito.style.transform =
    `translateX(-50%) translate(${x * 14}px, ${y * 4}px)`;
});

/* =========================
   TULIPANES EXTRA (CLONADO)
========================= */

function duplicarTulipanes() {
  const svgDoc = pasto.contentDocument;
  if (!svgDoc) return;

  const tulipan = svgDoc.querySelector("svg > g, svg > path");
  if (!tulipan) return;

  for (let i = 0; i < 6; i++) {
    const clone = tulipan.cloneNode(true);
    clone.setAttribute(
      "transform",
      `translate(${Math.random() * 800 + 50}, ${Math.random() * 40}) scale(${0.8 + Math.random() * 0.4})`
    );
    svgDoc.querySelector("svg").appendChild(clone);
  }
}

pasto.addEventListener("load", duplicarTulipanes);

/* =========================
   ANIMACIÓN SUAVE PERRITO
========================= */

let respiracion = 1;
setInterval(() => {
  respiracion = respiracion === 1 ? 1.03 : 1;
  perrito.style.transform += ` scale(${respiracion})`;
}, 2000);

/* =========================
   CORAZÓN GIGANTE ❤️
========================= */

function crearCorazon() {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️<span>Te quiero</span>";
  heart.style.position = "absolute";
  heart.style.left = "50%";
  heart.style.top = "50%";
  heart.style.transform = "translate(-50%, -50%) scale(0)";
  heart.style.fontSize = "160px";
  heart.style.textAlign = "center";
  heart.style.zIndex = "10";
  heart.style.transition = "transform 0.6s ease, opacity 0.6s ease";
  heart.style.pointerEvents = "none";

  heart.querySelector("span").style.display = "block";
  heart.querySelector("span").style.fontSize = "42px";
  heart.querySelector("span").style.color = "white";
  heart.querySelector("span").style.fontFamily = "cursive";

  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = "translate(-50%, -50%) scale(1)";
  });

  setTimeout(() => {
    heart.style.opacity = "0";
    heart.style.transform = "translate(-50%, -50%) scale(1.5)";
  }, 1800);

  setTimeout(() => heart.remove(), 2600);
}

/* =========================
   CLICK PERRITO ❤️
========================= */

perrito.style.cursor = "pointer";

perrito.addEventListener("click", () => {
  perrito.style.transition = "transform 0.4s ease";
  perrito.style.transform += " scale(1.2)";
  crearCorazon();

  setTimeout(() => {
    perrito.style.transform = perrito.style.transform.replace(" scale(1.2)", "");
  }, 600);
});

/* =========================
   ESTRELLA FUGAZ
========================= */

function estrellaFugaz() {
  const star = document.createElementNS("http://www.w3.org/2000/svg", "line");

  const x = Math.random() * 750;
  const y = Math.random() * 200;

  star.setAttribute("x1", x);
  star.setAttribute("y1", y);
  star.setAttribute("x2", x + 120);
  star.setAttribute("y2", y + 35);
  star.setAttribute("stroke", "white");
  star.setAttribute("stroke-width", "1.4");
  star.style.opacity = 1;

  svgEstrellas.appendChild(star);

  let p = 0;
  const anim = setInterval(() => {
    p += 0.05;
    star.style.opacity = 1 - p;
    if (p >= 1) {
      clearInterval(anim);
      star.remove();
    }
  }, 16);
}

setInterval(estrellaFugaz, Math.random() * 4000 + 8000);
