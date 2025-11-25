document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video-background');
  const videoBtn = document.getElementById('toggle-video');
  const audio = document.getElementById('sample-audio');
  const audioBtn = document.getElementById('toggle-audio');
  const canvas = document.getElementById('drawing-canvas');
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let color = '#000000';
  let cardCount = 7;

  // Video Toggle
  videoBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      videoBtn.textContent = 'Pause Video';
    } else {
      video.pause();
      videoBtn.textContent = 'Play Video';
    }
  });

  // Audio Toggle
  audioBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      audioBtn.textContent = 'Pause Audio';
    } else {
      audio.pause();
      audioBtn.textContent = 'Play Audio';
    }
  });

  // Color Picker
  document.querySelectorAll('.color-picker button').forEach(btn => {
    btn.addEventListener('click', () => {
      color = btn.dataset.color;
      ctx.strokeStyle = color;
    });
  });

  // Canvas Drawing
  const startDraw = (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  };

  const draw = (e) => {
    if (!drawing) return;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  const stopDraw = () => drawing = false;

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseout', stopDraw);

  // Clear Canvas
  document.getElementById('clear-canvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Add New Card
  document.getElementById('add-card').addEventListener('click', () => {
    const grid = document.querySelector('.grid-container');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `Card ${cardCount}<br><small>New!</small>`;
    grid.appendChild(card);
    cardCount++;
  });
});
