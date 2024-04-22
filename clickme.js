const bubbles = document.querySelector('.bubbles');

bubbles.addEventListener('click', (e) => {
  const el = e.target;
  console.log(el);
  if(!el.matches('span')) return;
  el.classList.toggle('selected');
})
