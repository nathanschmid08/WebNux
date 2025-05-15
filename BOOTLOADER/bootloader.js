const os = require('os');
const output = document.getElementById("bootloader-output");

const hostname = os.hostname();
const arch = os.arch();
const platform = os.platform();
const cpus = os.cpus();
const cpuModel = cpus[0]?.model || "Unknown CPU";
const totalMemMiB = Math.round(os.totalmem() / 1024 / 1024);
const now = new Date().toISOString().replace("T", " ").split(".")[0];

const staticBootText = [
  `m1n1: Welcome to m1n1!`,
  `Platform: ${platform} (${arch})`,
  `Build: m1n1-custom (Electron Boot Demo)`,
  ``,
  `[PMGR] Initialized power management`,
  `[USB] Initializing USB...`,
  ``,
  `Jumping to U-Boot...`,
  ``,
  `U-Boot 2023.07 (${now})`,
  ``,
  `SoC:   ${cpuModel}`,
  `Model: ${hostname}`,
  `DRAM:  ${totalMemMiB} MiB`,
  `Core:  62 devices, 17 uclasses, devicetree: board`,
  `MMC:   virtual_mmc: 0`,
  `Loading Environment from FAT... OK`,
  `In:    serial`,
  `Out:   serial`,
  `Err:   serial`,
  `Net:   No ethernet found.`
];

const countdownText = "Hit any key to stop autoboot:  ";
const finalBootLines = [
  "", // Leerzeile für Abstand
  "Starting boot script from mmc ...",
  "Loading Image from EFI partition ...",
  "Booting WebNux..."
];

let index = 0;

function colorizeLine(line) {
  if (line.startsWith("U-Boot>")) {
    return `<span class="uboot-prompt">U-Boot></span>${line.slice(7)}`;
  }
  return line;
}

function writeLine() {
  if (index < staticBootText.length) {
    const coloredLine = colorizeLine(staticBootText[index]);
    output.innerHTML += coloredLine + "\n";
    index++;
    setTimeout(writeLine, 60);
  } else {
    startCountdown(2);
  }
}

function startCountdown(count) {
  const lineId = "countdown-line";
  if (count >= 0) {
    const existing = document.getElementById(lineId);
    if (existing) {
      existing.textContent = countdownText + count;
    } else {
      const line = document.createElement("div");
      line.id = lineId;
      line.textContent = countdownText + count;
      output.appendChild(line);
    }
    setTimeout(() => startCountdown(count - 1), 1000);
  } else {
    document.getElementById(lineId).textContent = countdownText + "0";
    setTimeout(() => showFinalBootLines(0), 500);
  }
}

function showFinalBootLines(i) {
  if (i < finalBootLines.length) {
    output.innerHTML += finalBootLines[i] + "\n";
    setTimeout(() => showFinalBootLines(i + 1), 80);
  }
}

writeLine();