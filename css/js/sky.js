for (let i = 0; i < 120; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "vw";
  star.style.top = Math.random() * 70 + "vh";
  star.style.animationDelay = Math.random() * 3 + "s";
  document.body.appendChild(star);
}
