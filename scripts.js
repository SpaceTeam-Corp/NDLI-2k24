let h1 = document.querySelector("h1");
let button = document.querySelector("button");
let chillcont = 0;

h1.innerHTML = "You are"+chillcont+"% of a chill guy";

button.addEventListener('click', function() {
    chillcont = chillcont+0.1;
})
