// scripts/prebuild-chromium.js
const chromium = require("@sparticuz/chromium-min");
const fs = require("fs");
const path = require("path");

async function prebuildChromium() {
  // Skip the prebuild step if running on Windows.
  if (process.platform === "win32") {
    console.log("Prebuild skipped on Windows.");
    return;
  }

  // Define the target directory where Chromium will be stored.
  // This folder (chromium-bin) will be included in your deployment.
  const targetDir = path.join(process.cwd(), "chromium-bin");

  // Create the directory if it doesn't exist.
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Define the remote tar URL for Chromium.
  const tarUrl =
    "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";

  try {
    // Download and extract Chromium into targetDir.
    const executablePath = await chromium.executablePath(tarUrl, targetDir);
    console.log("Chromium downloaded and extracted to:", executablePath);

    if (fs.existsSync(executablePath)) {
      console.log("Chromium binary is ready for deployment.");
    } else {
      console.error("Chromium binary was not found at the expected location.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Prebuild error:", error);
    process.exit(1);
  }
}

prebuildChromium();
