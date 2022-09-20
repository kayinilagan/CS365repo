let currentSound = null;

function getSoundPlayerFor(soundURL) {
    return function () {
        let mySound = new Audio(soundURL);
        currentSound = mySound;
        mySound.play();
        document.getElementById("played").innerText = "Played: " + soundURL;
    };
}

function appendButtonForSound(title, soundURL) {
    let b = document.createElement("button");
    b.addEventListener("click", getSoundPlayerFor(soundURL));
    b.innerText = title;
    document.body.append(b);
}

function updateProgessBar() {
    if (currentSound != null && isFinite(currentSound.duration)) {
        let prog = document.getElementById("prog");
        prog.max = currentSound.duration;
        prog.value = currentSound.currentTime;
    }
}

appendButtonForSound("Sword", "sounds/battle/sword-unsheathe.wav");
appendButtonForSound("Random1", "sounds/misc/random1.wav");
appendButtonForSound("door", "sounds/world/door.wav");

setInterval(updateProgessBar, 15);