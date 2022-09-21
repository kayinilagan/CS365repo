let currentIndex = 0; //what slot of the story we are currently at
let currentMusic = null;

let leftButton = document.getElementById("leftButton");
let rightButton = document.getElementById("rightButton");
let text = document.getElementById("text");

let story = [
    {
        text: "Press Start", leftChoice: "Start", rightChoice:
            "Quit", leftIndex: 1, rightIndex: 2, backImage: null
    },
    {
        text: "You are at stairs.  Up or down?", leftChoice: "Up",
        rightChoice: "Down", leftIndex: 3, rightIndex: 4, backImage:
            "img/stairs.png"
    },
    {
        text: "You see a dragon.", leftChoice: "Fight", rightChoice: "Run sinto the castle", leftIndex: 5, rightIndex: 1, backImage:
            "img/dragon.png"
    },
];



leftButton.addEventListener("click", function () {
    //change the story to the new index based on the left choice click
    playSound("sounds/select.wav");
    currentIndex = story[currentIndex].leftIndex;
    populate(currentIndex);
});

rightButton.addEventListener("click", function () {
    //change the story to the new index based on the left choice click
    playSound("sounds/select.wav");
    currentIndex = story[currentIndex].rightIndex;
    populate(currentIndex);
});

// Taken from Lab 1 in Dr. Kow's CS365 class
function playSound(soundUrl) {
    let mySound = new Audio(soundUrl);
    mySound.play();
}

function populate(index = 0) {
    text.innerText = story[index].text;
    leftButton.innerText = story[index].leftChoice;
    rightButton.innerText = story[index].rightChoice;
    if (story[index].backImage != null) {
        document.body.style.backgroundImage = story[index].backImage;
    }
}