let z = 1;

function openApp(title, url) {
  const win = document.createElement('div');
  win.className = 'window';
  win.style.top = '50px';
  win.style.left = '50px';
  win.style.zIndex = z++;

  win.innerHTML = `
    <div class="window-header">${title}</div>
    <iframe src="${url}"></iframe>
  `;

  makeDraggable(win);
  document.body.appendChild(win);
}

function makeDraggable(el) {
  const header = el.querySelector('.window-header');
  let offsetX = 0, offsetY = 0, isDragging = false;

  header.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = z++;
  });

  document.addEventListener('mousemove', e => {
    if (isDragging) {
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}