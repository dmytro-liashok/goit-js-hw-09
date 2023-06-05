const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
let timerId = null;

startBtnEl.addEventListener('click', startTimeChangeColor);
stopBtnEl.addEventListener('click', stopTimeChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function startTimeChangeColor() {
  timerId = setInterval(() => {
    changeColor();
  }, 1000);

  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
}

function stopTimeChangeColor() {
  clearInterval(timerId);

  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
}
