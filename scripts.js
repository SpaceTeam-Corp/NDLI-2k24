let h1 = document.querySelector("h1");
let button = document.querySelector("button");
let chillcont = 0;

let clickCount = 0;  
let cps = 0;  
let isCounting = false;  

// Fonction qui démarre le comptage des clics par seconde  
function startCounting() {  
    if (isCounting) return;  
    isCounting = true;  
    clickCount = 0;  
    cps = 0;  

    // Mise à jour du CPS toutes les secondes  
    setInterval(() => {  
        cps = clickCount;  
        console.log("Clics par seconde : " + cps);  
        clickCount = 0;  
    }, 1000);  
}  

// Fonction appelée à chaque clic  
function handleClick() {  
    clickCount++;  
}  

// Exemple d'utilisation  
document.addEventListener("click", handleClick);  
startCounting(); 

h1.innerHTML = "You are "+chillcont+"% of a chill guy";

button.addEventListener('click', function() {
    setTimeout(() => {
        clickCount = 0; 
    }, 1000);


    chillcont += 0.1; 
    clickCount++;
    h1.innerHTML = "You are " + chillcont.toFixed(1) + "% of a chill guy"; 
   
    if (cps > 5) {
        chillcont -= 0.05; 
        h1.innerHTML = "You are " + chillcont.toFixed(1) + "% of a chill guy";
    }

   console.log(clickCount) 
    
});

