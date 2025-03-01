// scripts/prebuild-chromium.js
const chromium = require("@sparticuz/chromium-min");
const fs = require("fs");
const path = require("path");

async function prebuildChromium() {
  // Skip prebuild on Windows
  if (process.platform === "win32") {
    console.log("Prebuild skipped on Windows.");
    return;
  }

  // Force the target directory to be inside your project
  const targetDir = path.join(__dirname, "../chromium-bin");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Remote tar URL for Chromium.
  const tarUrl =
    "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";

  try {
    // Download and extract Chromium into targetDir.
    const extractedPath = await chromium.executablePath(tarUrl, targetDir);
    console.log("Chromium downloaded and extracted to:", extractedPath);

    // Ensure the binary is renamed to a known file name, e.g. 'chrome'
    const desiredPath = path.join(targetDir, "chrome");
    if (extractedPath !== desiredPath) {
      fs.copyFileSync(extractedPath, desiredPath);
      console.log("Renamed binary to:", desiredPath);
    } else {
      console.log("Binary path:", extractedPath);
    }

    if (!fs.existsSync(desiredPath)) {
      console.error("Chromium binary was not found at the expected location.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Prebuild error:", error);
    process.exit(1);
  }
}

prebuildChromium();
