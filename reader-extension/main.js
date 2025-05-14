// Confirms if the Reader-mode has loaded
console.log("Reader Mode extension loaded!");

// Dynamically load Readability.js if it's not already available
if (typeof Readability === "undefined") {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/@mozilla/readability@0.4.4/Readability.js";
  script.onload = () => console.log("Readability loaded.");
  document.head.appendChild(script);
}

// UI SETUP: Reader Mode Toggle Button
const toggleWrapper = document.createElement("div");
toggleWrapper.id = "reader-mode-toggle-wrapper";
toggleWrapper.style.position = "fixed";
toggleWrapper.style.top = "250px";
toggleWrapper.style.right = "20px";
toggleWrapper.style.zIndex = "9999";

const toggleButton = document.createElement("button");
toggleButton.textContent = "📰 Reader Mode";
toggleButton.style.padding = "8px 12px";
toggleButton.style.background = "#111";
toggleButton.style.color = "#fff";
toggleButton.style.border = "none";
toggleButton.style.borderRadius = "5px";
toggleButton.style.cursor = "pointer";
toggleButton.style.fontSize = "14px";
toggleButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
toggleWrapper.appendChild(toggleButton);
document.body.appendChild(toggleWrapper);

// STATE VARIABLES
let readerModeEnabled = false;
let originalBodyHTML = document.body.innerHTML;


// FUNCTION: removeAdBlocks
// Description: Removes common ad elements from the DOM
function removeAdBlocks() {
  document.querySelectorAll('[id*="ad-"], [class*="ad-"], [class*="adsninja"], [class*="adzone"]').forEach(el => el.remove());

  document.querySelectorAll('.ad-zone-container, .ad-zone, .ad-loading, .an-zone-tag-top, .an-zone-tag-bottom, .dynamically-injected-refresh-ad-zone').forEach(el => el.remove());

  document.querySelectorAll('iframe, script').forEach(el => {
    const src = el.src || '';
    if (src.includes('ads') || src.includes('doubleclick') || src.includes('googletag')) {
      el.remove();
    }
  });
}

// FUNCTION: enableReaderMode
// Description: Parses readable content using Readability and replaces the page content
function enableReaderMode() {
  if (typeof Readability === "undefined") {
    alert("Readability.js not loaded yet. Please wait a few seconds and try again.");
    return;
  }

  originalBodyHTML = document.body.innerHTML;

  removeAdBlocks();

  const article = new Readability(document.cloneNode(true)).parse();

  if (!article || !article.content) {
    alert("Failed to extract readable content.");
    return;
  }

  const readerHTML = `
    <div id="reader-mode-container" style="padding: 2rem; font-family: Georgia, serif; max-width: 800px; margin: auto; line-height: 1.6; font-size: 1.2rem; color: #222;">
      <h1>${article.title}</h1>
      ${article.content}
    </div>
  `;

  document.body.innerHTML = readerHTML;

  document.body.appendChild(toggleWrapper);
}

// FUNCTION: disableReaderMode
// Description: Restores the original page content

function disableReaderMode() {
  document.body.innerHTML = originalBodyHTML;
  document.body.appendChild(toggleWrapper);
}

// EVENT HANDLER: Toggle Button Click
// Description: Enables/disables reader mode

toggleButton.addEventListener("click", () => {
  if (!readerModeEnabled) {
    enableReaderMode();
    toggleButton.textContent = "❌ Exit Reader Mode";
  } else {
    disableReaderMode();
    toggleButton.textContent = "📰 Reader Mode";
  }
  readerModeEnabled = !readerModeEnabled;
});


  