const secondsSpan = document.querySelector('.seconds');
const  msSpan = document.querySelector('.ms');
const SECONDS_START = 30000;
let ms = SECONDS_START;

const DECREMENT_MS = 52;
// Count down
setInterval(() => {

  const seconds = Math.floor(ms / 1000);
  const msLeft = ms % 1000;
  secondsSpan.textContent = seconds;
  msSpan.textContent = (msLeft / 1000) * 1000;
  ms-= DECREMENT_MS;
  if(ms < 0) {
    ms = SECONDS_START;
  }
  console.log(ms);
}, DECREMENT_MS);
