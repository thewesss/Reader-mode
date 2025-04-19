# 📰 Reader Mode for Webfuse

This project is a custom **Reader Mode extension** built for the [Webfuse](https://www.surfly.com/webfuse/) platform. It provides a distraction-free reading experience by extracting and displaying only the main article content on any web page. Built using Webfuse's Session Extensions API.

## ✨ Features

- 📄 Extracts main readable content from any webpage
- 🖱 Toggle Reader Mode on/off with a floating button
- 🧠 Smart content detection using semantic tags + heuristics
- 🧹 Removes sidebars, ads, and clutter
- 🔁 Fully reversible — toggle off to return to original layout

## 🚀 Getting Started

### 1. Create a Webfuse Space
Sign up at [webfuse.surfly.com](https://webfuse.surfly.com/) and create a new Space.

### 2. Upload Session Extension
Inside your Space:
- Go to **Session Extensions**
- Click **"Add Extension"**
- Upload your `main.js` file
- Set the Extension Type to **`content_script`**
- Ensure `manifest.json` is included and valid

> ✅ **Tip:** Use `"manifest_version": 2` in your manifest to avoid errors.

### 3. Test the Extension
Start a new session and open the **browser dev console** (inside the Webfuse tab) to verify:
```bash
Reader Mode extension loaded!
