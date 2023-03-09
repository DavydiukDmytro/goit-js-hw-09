const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop'),
}

const COLOR_CHANGE_DELAY = 1000;
let timerId = null;

refs.btnStart.addEventListener('click', onClickStart);
refs.btnStop.addEventListener('click', onClickStop);

function onClickStart() {
    refs.btnStart.disabled = true;
    timerId = setInterval(colorChange, COLOR_CHANGE_DELAY);
};

function onClickStop() {
    refs.btnStart.disabled = false;
    clearInterval(timerId);
}

function colorChange() {
    refs.body.style.backgroundColor = getRandomHexColor();
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

