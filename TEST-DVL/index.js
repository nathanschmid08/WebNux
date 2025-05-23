let z = 1;

function openApp(title, url, width = 400, height = 300) {
  const win = document.createElement('div');
  win.className = 'window';
  win.style.top = '50px';
  win.style.left = '50px';
  win.style.zIndex = z++;
  win.style.width = `${width}px`;
  win.style.height = `${height}px`;

  win.innerHTML = `
    <div class="window-header">${title}</div>
    <iframe src="${url}" style="width: 100%; height: calc(100% - 30px); border: none;"></iframe>
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