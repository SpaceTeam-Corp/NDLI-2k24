// Get the video
var video = document.getElementById("videoBg");

// Get the button
var btn = document.getElementById("btnPlay");

// Pause and play the video, and change the button text
function PausePlay() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}