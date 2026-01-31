// static/js/auto-border.js

function getDominantColor(img) {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgb(${r}, ${g}, ${b})`;
}

function updateCoverBorder() {
  // Try several possible selectors used in Terminal/Midnight themes
  const selectors = [
    '.post-cover img',
    '.cover img',
    '.featured-image img',
    '.post-header img',
    'img.cover-image'
  ];

  let coverImg = null;
  for (const sel of selectors) {
    coverImg = document.querySelector(sel);
    if (coverImg) break;
  }

  if (!coverImg) return;

  // Make sure we can read the image data
  coverImg.crossOrigin = "Anonymous";

  // If already loaded, update immediately
  if (coverImg.complete && coverImg.naturalWidth > 0) {
    const color = getDominantColor(coverImg);
    const container = coverImg.closest('figure, .post-cover, .cover, .featured-image, .post-header');
    if (container) {
      container.style.borderColor = color;
      container.style.borderWidth = '4px';      // optional: thicker border
      container.style.borderStyle = 'solid';
    }
  } else {
    // Wait for load
    coverImg.addEventListener('load', () => {
      const color = getDominantColor(coverImg);
      const container = coverImg.closest('figure, .post-cover, .cover, .featured-image, .post-header');
      if (container) {
        container.style.borderColor = color;
        container.style.borderWidth = '4px';
        container.style.borderStyle = 'solid';
      }
    });
  }
}

// Run immediately + watch for dynamic content (Hugo themes sometimes load late)
document.addEventListener('DOMContentLoaded', updateCoverBorder);

// MutationObserver for SPA-like or delayed content
const observer = new MutationObserver(updateCoverBorder);
observer.observe(document.body, { childList: true, subtree: true });
