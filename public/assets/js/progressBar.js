function setProgress(percent) {
  const value = document.querySelector('.progress-value');
  const number = document.querySelector('.progress-number');
  const length = value.getTotalLength() || 142;

  const offset = length * (1 - percent / 100);
  value.style.strokeDashoffset = offset;

  number.textContent = `${percent}%`;
}

requestAnimationFrame(() => setProgress(84));
