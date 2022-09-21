let currentIndex = 0; //what slot of the story we are currently at
let currentMusic = null;

let text = document.getElementById("text");
let leftButton = document.getElementById("leftButton");
let rightButton = document.getElementById("rightButton");
let leftImage = document.getElementById("leftImage");
let rightImage = document.getElementById("rightImage");

let story = [
    {
        //0
        text: "Press Start to Play",
        leftChoice: "Start",
        rightChoice: "Quit",
        leftImage: "",
        rightImage: "",
        leftIndex: 1,
        rightIndex: 2,
        backImage: null,
        soundtrack: "titleLoop.wav",
        loop: true
    },
    {
        //1
        text: "You hear an alarm as you slowly wake",
        leftChoice: "Sleep In",
        rightChoice: "Turn Off Alarm",
        leftImage: "",
        rightImage: "",
        leftIndex: 3,
        rightIndex: 4,
        backImage: null,
        soundtrack: "alarm.wav",
        loop: true
    },
    {
        //2
        text: "You Lost. You didn't even try!",
        leftChoice: "Retry",
        rightChoice: "Start Over",
        leftImage: "",
        rightImage: "",
        leftIndex: 0,
        rightIndex: 0,
        backImage: null,
        soundtrack: "gameOver.wav",
        loop: false
    },
    {
        //3
        text: "You sleep in, blissfully dreaming away the day. You don't find a job, you sleepy loser.",
        leftChoice: "Retry",
        rightChoice: "Start Over",
        leftImage: "",
        rightImage: "",
        leftIndex: 1,
        rightIndex: 0,
        backImage: null,
        soundtrack: null,
        loop: false
    },
    {
        //4
        text: "You Lost. You didn't even try!",
        leftChoice: "Retry",
        rightChoice: "",
        leftImage: "",
        rightImage: "",
        leftIndex: 1,
        rightIndex: 2,
        backImage: null,
        soundtrack: null,
        loop: false
    },
];



leftButton.addEventListener("click", function () {
    //change the story to the new index based on the left choice click
    playSound("select.wav");
    currentIndex = story[currentIndex].leftIndex;
    populate(currentIndex);
});

rightButton.addEventListener("click", function () {
    //change the story to the new index based on the left choice click
    playSound("select.wav");
    currentIndex = story[currentIndex].rightIndex;
    populate(currentIndex);
});

// Taken from Lab 1 in Dr. Kow's CS365 class and modified for assignment
function playSound(soundUrl, loop = false) {
    let mySound = new Audio("sounds/" + soundUrl);
    if (loop) {
        mySound.loop = true;
    }
    mySound.play();
    return mySound;
}

function setButtonText(string, element) {
    if (string == "") {
        element.style.visibility = "hidden";
    } else {
        element.style.visibility = "visible";
        element.innerText = string;
    }
}

function populate(index = 0) {
    text.innerText = story[index].text;
    setButtonText(story[index].leftChoice, leftButton);
    setButtonText(story[index].rightChoice, rightButton);
    if (index == 0) {
        leftImage.style.display = "none";
        rightImage.style.display = "none";
    }
    if (story[index].soundtrack != null) {
        if (currentMusic != null) {
            currentMusic.pause();
        }
        currentMusic = playSound(story[index].soundtrack, story[index].loop);
    } else {
        currentMusic.pause();
    }
}