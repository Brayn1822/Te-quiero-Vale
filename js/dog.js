let state = 0;
const dog = document.querySelector(".dog");

document.body.addEventListener("click", () => {
  state = (state + 1) % 3;
  dog.className = "dog";

  if (state === 1) {
    dog.style.transform = "scaleY(0.85)";
  } else if (state === 2) {
    dog.style.transform = "scaleY(0.65)";
  } else {
    dog.style.transform = "scaleY(1)";
  }
});
