let chillness = 0; // Initialisation du niveau de chill
let clickTimes = []; // Stocke les timestamps des clics
let angryMode = false; // Indique si le mode "angry" est actif
let angryTimer = null; // Timer pour réinitialiser le mode "angry"

function chillClick(increment) {
  const now = Date.now();
  clickTimes.push(now);

  clickTimes = clickTimes.filter((time) => now - time <= 1000);

  const cps = clickTimes.length;

  if (cps > 4 && !angryMode) {
    activateAngryMode();
  }

  if (angryMode) {
    chillness -= 5;
  } else {
    chillness += increment;
  }

  updateUI();
}

function activateAngryMode() {
  angryMode = true;
  document.getElementById("chillImage").src = "angry_guy.png";
  const warningMessage = document.getElementById("warningMessage");
  warningMessage.style.display = "block";

  if (angryTimer) clearTimeout(angryTimer);
  angryTimer = setTimeout(() => {
    angryMode = false;
    document.getElementById("chillImage").src =
      "./assets/css/images-removebg-preview.png";
    warningMessage.style.display = "none";
  }, 3000);
}

function updateUI() {
  document.getElementById("chillness").textContent = chillness;
}
