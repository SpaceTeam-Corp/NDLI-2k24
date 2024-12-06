let chillness = 0; // Niveau de chill
let clickTimes = []; // Stocke les timestamps des clics
let angryMode = false; // Indique si le mode "angry" est actif
let angryTimer = null; // Timer pour réinitialiser le mode "angry"
let automates = 0; // Nombre d'automates achetés
let automateInterval = null; // Intervalle pour l'effet des automates
let clickMultiplier = 1; // Multiplicateur pour le chill par clic
let upgradeCost = 1000; // Coût initial de l'amélioration du clic
let chillPerSecond = 0; // Chill généré par seconde (via automates)


function chillClick(increment) {
  const now = Date.now(); 
  clickTimes.push(now); 


  clickTimes = clickTimes.filter((time) => now - time <= 1000);

  const cps = clickTimes.length; 
  document.getElementById("cps").textContent = cps; 

  if (cps > 4 && !angryMode) {
    activateAngryMode();
  }

  if (angryMode) {
    chillness -= chillness * 0.5;
  } else {
    chillness += increment * clickMultiplier; 
  }


  if (chillness >= 100) {
    document.getElementById("btnBuyAutomate").style.display = "inline-block";
  }

  if (chillness >= upgradeCost) {
    document.getElementById("btnUpgradeClick").style.display = "inline-block";
  }

  updateUI(); 
}


function activateAngryMode() {
  angryMode = true;


  document.getElementById("chillImage").src = "./assets/img/angry-guy.png";


  const warningMessage = document.getElementById("warningMessage");
  warningMessage.style.display = "block";


  if (angryTimer) clearTimeout(angryTimer);
  angryTimer = setTimeout(() => {
    angryMode = false;
    document.getElementById("chillImage").src = "./assets/img/chill-guy.png";
    warningMessage.style.display = "none";
    cps = 0;
    document.getElementById("cps").textContent = cps; 
  }, 3000);
}

// Acheter un automate de chill
function buyAutomate() {
  if (chillness >= 50) {
    chillness -= 50; 
    automates++;
    chillPerSecond = automates; 
    updateAutomateProduction();

    if (automates >= 50) {
      document.getElementById("btnBuyAutomates10").style.display ="inline-block";
    }

    document.getElementById("automatesCount").textContent = automates;

 
    if (!automateInterval) {
      automateInterval = setInterval(() => {
        chillness += automates; 
        updateUI();
      }, 1000);
    }

    updateUI(); 
  }
}


function buyAutomates10() {
  if (chillness >= 500) {
    chillness -= 500;
    automates += 10; 
    chillPerSecond = automates; 
    updateAutomateProduction();

    document.getElementById("automatesCount").textContent = automates;

 
    if (!automateInterval) {
      automateInterval = setInterval(() => {
        chillness += automates; 
        updateUI();
      }, 1000);
    }

    updateUI(); 
  }
}


function upgradeClick() {
  if (chillness >= upgradeCost) {
    chillness -= upgradeCost; 
    clickMultiplier *= 1.25; 
    upgradeCost = Math.ceil(upgradeCost * 1.5); 
    document.getElementById("clickMultiplier").textContent =
      clickMultiplier.toFixed(2); 
    document.getElementById(
      "btnUpgradeClick"
    ).textContent = `Augmenter la production par clic (+25%) (${upgradeCost} chill)`; // Met à jour le bouton

    updateUI(); 
  }
}


function updateUI() {
  document.getElementById("chillness").textContent = Math.floor(chillness); 
  document.getElementById("chillPerSecond").textContent = chillPerSecond; 
}

let automateEfficiency = 1; 
let automateUpgradeCost = 10000; 

// Améliorer l'efficacité des automates
function upgradeAutomates() {
  if (chillness >= automateUpgradeCost && automates >= 100) {
    chillness -= automateUpgradeCost; 
    automateEfficiency *= 1.5; 
    automateUpgradeCost = Math.ceil(automateUpgradeCost * 2.5); 
    updateAutomateProduction();


    document.getElementById(
      "btnUpgradeAutomates"
    ).textContent = `Améliorer l'efficacité des automates (+50%) (${automateUpgradeCost} chill)`;

    updateUI(); 
  }
}


function updateAutomateProduction() {
  chillPerSecond = automates * automateEfficiency; 

  if (automates >= 100) {
    document.getElementById("btnUpgradeAutomates").style.display =
      "inline-block";
  }
}


function updateUI() {
  document.getElementById("chillness").textContent = Math.floor(chillness); 
  document.getElementById("chillPerSecond").textContent =
  chillPerSecond.toFixed(2); // Chill par seconde
  document.getElementById("automatesCount").textContent = automates; 
  document.getElementById("automateEfficiency").textContent =
  automateEfficiency.toFixed(2); 
}
