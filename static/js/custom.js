// static/js/custom.js - Add this file in static/js/

function getDominantColor(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.height = 1;
  canvas.width = 1;
  ctx.drawImage(img, 0, 0, 1, 1);
  const i = ctx.getImageData(0, 0, 1, 1).data.slice(0,3);
  return `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
}

// Find the cover image and container (adjust selectors based on your theme's HTML)
document.addEventListener('DOMContentLoaded', () => {
  const coverImg = document.querySelector('.post-cover img');  // Or '.cover-image', inspect your site to get the exact class
  if (coverImg) {
    coverImg.crossOrigin = "Anonymous";  // If needed for cross-origin images
    coverImg.onload = () => {
      const dominantColor = getDominantColor(coverImg);
      const container = coverImg.parentElement;  // Or the div with the border
      container.style.borderColor = dominantColor;
    };
  }
});
