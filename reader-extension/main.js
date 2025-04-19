console.log("Reader Mode extension loaded!");

const toggleWrapper = document.createElement("div");
toggleWrapper.id = "reader-mode-toggle-wrapper";
toggleWrapper.style.position = "fixed";
toggleWrapper.style.top = "80px";
toggleWrapper.style.right = "10px";
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

let readerModeEnabled = false;
let originalBodyHTML = document.body.innerHTML;

function getMainContentElement() {
    const candidates = [
        document.querySelector("article"),
        document.querySelector("main"),
        document.querySelector("[role=main]"),
        document.querySelector(".post, .entry-content, .article-body, .main-content"),
    ];

    for (let el of candidates) {
        if (el && el.innerText.length > 300) return el;
    }

    let largest = null;
    let maxTextLength = 0;
    const allDivs = document.querySelectorAll("div");

    allDivs.forEach(div => {
        const text = div.innerText.trim();
        const visible = div.offsetWidth > 0 && div.offsetHeight > 0;
        if (visible && text.length > maxTextLength) {
            maxTextLength = text.length;
            largest = div;
        }
    });

    return largest;
}

function enableReaderMode() {
    const mainContent = getMainContentElement();

    if (!mainContent) {
        alert("Couldn't find main content.");
        return;
    }

    originalBodyHTML = document.body.innerHTML;

    const readerHTML = `
        <div id="reader-mode-container" style="padding: 2rem; font-family: Georgia, serif; max-width: 800px; margin: auto; line-height: 1.6; font-size: 1.1rem; color: #222;">
            ${mainContent.innerHTML}
        </div>
    `;
    document.body.innerHTML = readerHTML;

    document.body.appendChild(toggleWrapper);
}

function disableReaderMode() {
    document.body.innerHTML = originalBodyHTML;

    document.body.appendChild(toggleWrapper);
}

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



  