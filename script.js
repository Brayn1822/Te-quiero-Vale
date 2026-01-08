/* =========================
   CONFIGURACIÓN GENERAL
========================= */

const cielo = document.getElementById("cielo");
const pasto = document.getElementById("pasto");
const perrito = document.getElementById("perrito");
const svgEstrellas = document.getElementById("estrellas");

svgEstrellas.setAttribute("viewBox", "0 0 1000 600");

/* =========================
   ESTRELLAS DINÁMICAS
========================= */

const NUM_ESTRELLAS = 120;
const estrellas = [];

for (let i = 0; i < NUM_ESTRELLAS; i++) {
  const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  const x = Math.random() * 1000;
  const y = Math.random() * 300;
  const r = Math.random() * 1.5 + 0.4;

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
    speed: Math.random() * 0.02 + 0.01
  });
}

// Parpadeo natural
function animarEstrellas() {
  estrellas.forEach(star => {
    let op = parseFloat(star.el.style.opacity);
    op += (Math.random() - 0.5) * star.speed;
    op = Math.max(0.2, Math.min(1, op));
    star.el.style.opacity = op;
  });
  requestAnimationFrame(animarEstrellas);
}

animarEstrellas();

/* =========================
   INTERACCIÓN CON MOUSE
========================= */

document.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);

  // CIELO (más profundo)
  cielo.style.transform = `translate(${x * 12}px, ${y * 12}px)`;

  // ESTRELLAS (parallax suave)
  estrellas.forEach(star => {
    star.el.setAttribute("cx", star.baseX + x * 30);
    star.el.setAttribute("cy", star.baseY + y * 15);
  });

  // PASTO (leve movimiento horizontal)
  pasto.style.transform = `translate(${x * 6}px, 0)`;

  // PERRITO (reacciona al mouse)
  perrito.style.transform =
    `translateX(-50%) translate(${x * 20}px, ${y * 6}px)`;
});

/* =========================
   PERRITO INTERACTIVO
========================= */

perrito.addEventListener("mouseenter", () => {
  perrito.style.transition = "transform 0.3s ease";
  perrito.style.transform += " scale(1.05)";
});

perrito.addEventListener("mouseleave", () => {
  perrito.style.transform =
    perrito.style.transform.replace(" scale(1.05)", "");
});

/* =========================
   ESTRELLA FUGAZ (WOW)
========================= */

function estrellaFugaz() {
  const star = document.createElementNS("http://www.w3.org/2000/svg", "line");

  const x = Math.random() * 800;
  const y = Math.random() * 200;

  star.setAttribute("x1", x);
  star.setAttribute("y1", y);
  star.setAttribute("x2", x + 100);
  star.setAttribute("y2", y + 30);
  star.setAttribute("stroke", "white");
  star.setAttribute("stroke-width", "1.2");
  star.style.opacity = 1;

  svgEstrellas.appendChild(star);

  let progress = 0;

  const anim = setInterval(() => {
    progress += 0.04;
    star.style.opacity = 1 - progress;

    if (progress >= 1) {
      clearInterval(anim);
      star.remove();
    }
  }, 16);
}

// Aparece cada 7–12 segundos
setInterval(estrellaFugaz, Math.random() * 5000 + 7000);
