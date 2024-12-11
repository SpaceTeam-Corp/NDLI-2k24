let chillness = 0; // Niveau de chill
let clickTimes = []; // Stocke les timestamps des clics
let angryMode = false; // Indique si le mode "angry" est actif
let angryTimer = null; // Timer pour réinitialiser le mode "angry"
let automates = 0; // Nombre d'automates achetés
let automateInterval = null; // Intervalle pour l'effet des automates
let clickMultiplier = 1; // Multiplicateur pour le chill par clic
let upgradeCost1 = 50 // Coût initial automate x1
let upgradeCost10 = 500 // Coût initial automate x10
let upgradeCost100 = 5000 // Coût initial automate x100
let upgradeCost = 1000; // Coût initial de l'amélioration du clic
let chillPerSecond = 0; // Chill généré par seconde (via automates)
let popup = document.getElementById("popup");

function saveGame() {
  popup.style.display = "flex";
  const gameState = {
    chillness,
    automates,
    clickMultiplier,
    upgradeCost1,
    upgradeCost10,
    upgradeCost100,
    chillPerSecond,
    automateEfficiency,
    automateUpgradeCost,
  };

  console.log("Données sauvegardées :", gameState);
  localStorage.setItem("clickerGameSave", JSON.stringify(gameState));
  console.log("Partie sauvegardée !");
}

function fermer(){
  popup.style.display = "none";
}

function loadGame() {
  const savedGame = JSON.parse(localStorage.getItem("clickerGameSave"));

  if (savedGame) {
    chillness = savedGame.chillness || 0;
    automates = savedGame.automates || 0;
    clickMultiplier = savedGame.clickMultiplier || 1;
    upgradeCost1 = savedGame.upgradeCost1 || 50;
    upgradeCost10 = savedGame.upgradeCost10 || 500;
    upgradeCost100 = savedGame.upgradeCost100 || 5000;
    upgradeCost = savedGame.upgradeCost || 1000;
    chillPerSecond = savedGame.chillPerSecond || 0;
    automateEfficiency = savedGame.automateEfficiency || 1;
    automateUpgradeCost = savedGame.automateUpgradeCost || 10000;

    console.log("Partie chargée !");
    updateUI();

    // Reprendre la production automatique si des automates sont présents
    if (automates > 0 && !automateInterval) {
      automateInterval = setInterval(() => {
        chillness += automates * automateEfficiency;
        updateUI();
      }, 1000);
    }
  } else {
    console.log("Aucune sauvegarde trouvée.");
  }
}


function resetGame() {
  localStorage.removeItem("clickerGameSave");
  location.reload(); // Recharge la page pour réinitialiser le jeu
}

//setInterval(saveGame(), 5000); // Sauvegarde toutes les 5 secondes

function chillClick(increment) {
  const now = Date.now(); 
  clickTimes.push(now); 


  clickTimes = clickTimes.filter((time) => now - time <= 1000);

  const cps = clickTimes.length; 
  document.getElementById("cps").textContent = cps; 

  if (cps > 5 && !angryMode) {
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
  if (chillness >= upgradeCost1) {
    chillness -= upgradeCost1; 
    automates++;
    chillPerSecond = automates; 
    upgradeCost1 = Math.ceil(upgradeCost1 * 1.05) //augmentation de 1.05x le prix par achat
    document.getElementById("btnBuyAutomate").textContent =
      clickMultiplier.toFixed(2); 
    document.getElementById(
      "btnBuyAutomate"
    ).textContent = `Automate de chill (${upgradeCost1} chill)`; // Met à jour le bouton
    updateAutomateProduction();

    if (automates >= 25) {
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
  if (chillness >= upgradeCost10) {
    chillness -= upgradeCost10;
    automates += 10; 
    chillPerSecond = automates; 
    upgradeCost10 = Math.ceil(upgradeCost10 * 1.05) //augmentation de 1.05x le prix par achat
    document.getElementById("btnBuyAutomates10").textContent =
      clickMultiplier.toFixed(2); 
    document.getElementById(
      "btnBuyAutomates10"
    ).textContent = `Automate de chill x10 (${upgradeCost10} chill)`; // Met à jour le bouton
    updateAutomateProduction();

    document.getElementById("automatesCount").textContent = automates;

    if (automates >= 200) {
      document.getElementById("btnBuyAutomates100").style.display ="inline-block";
    }

    if (!automateInterval) {
      automateInterval = setInterval(() => {
        chillness += automates; 
        updateUI();
      }, 1000);
    }
    updateUI(); 
  }
}

function buyAutomates100() {
  if (chillness >= upgradeCost100) {
    chillness -= upgradeCost100;
    automates += 100; 
    chillPerSecond = automates; 
    upgradeCost100 = Math.ceil(upgradeCost100 * 1.05) //augmentation de 1.05x le prix par achat
    document.getElementById("btnBuyAutomates100").textContent =
      clickMultiplier.toFixed(2); 
    document.getElementById(
      "btnBuyAutomates100"
    ).textContent = `Automate de chill x100 (${upgradeCost100} chill)`; // Met à jour le bouton
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
  document.getElementById("btnBuyAutomate").textContent = `Automate de chill (${upgradeCost1} chill)`;
  document.getElementById("btnBuyAutomates10").textContent = `Automate de chill x10 (${upgradeCost10} chill)`;
  document.getElementById("btnBuyAutomates100").textContent = `Automate de chill x100 (${upgradeCost100} chill)`;
}

window.onload = () => {
  loadGame();
};
