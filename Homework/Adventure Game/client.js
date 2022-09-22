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
        backImage: "paperBackground.jpg",
        soundtrack: "titleLoop.wav",
        loop: true
    },
    {
        //1
        text: "You hear an alarm as you slowly wake",
        leftChoice: "Sleep In",
        rightChoice: "Turn Off Alarm",
        leftImage: "sleep.jpg",
        rightImage: "alarm.jpg",
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
        backImage: "paperLoseBackground.jpg",
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
        backImage: "paperLoseBackground.jpg",
        soundtrack: "gameOver.wav",
        loop: false
    },
    {
        //4
        text: "You turn off your alarm and wake up. You hear the mail slot close, but you're also feeling hungry, what do you do?",
        leftChoice: "Check Mail",
        rightChoice: "Have Breakfast",
        leftImage: "mail.jpg",
        rightImage: "egg.jpg",
        leftIndex: 5,
        rightIndex: 6,
        backImage: "paperBackground.jpg",
        soundtrack: "close.wav",
        loop: false
    },
    {
        //5
        text: "You check the mail, and you find two letters! One from your lovely mom, and the other of jobs! What a lucky day!",
        leftChoice: "Read Job Postings",
        rightChoice: "Read Mom's Letter",
        leftImage: "jobs.jpg",
        rightImage: "mom.jpg",
        leftIndex: 8,
        rightIndex: 9,
        backImage: "paperBackground.jpg",
        soundtrack: null,
        loop: false
    },
    {
        //6
        text: "You eat a breakfast of champions! What do you do now?",
        leftChoice: "Eat Breakfast (again)",
        rightChoice: "Check the Mail",
        leftImage: "egg.jpg",
        rightImage: "mail.jpg",
        leftIndex: 7,
        rightIndex: 5,
        backImage: "paperBackground.jpg",
        soundtrack: null,
        loop: false
    },
    {
        //7
        text: "You eat another breakfast and it becomes too much! Your stomach hurts, guess you'll have to stay in today. You lose.",
        leftChoice: "Retry",
        rightChoice: "Start Over",
        leftImage: "",
        rightImage: "",
        leftIndex: 6,
        rightIndex: 0,
        backImage: "paperLoseBackground.jpg",
        soundtrack: "gameOver.wav",
        loop: false
    },
    {
        //8
        text: "You read the Job Postings, and what a surprise! There's a position for a Chicken Nugget taste tester that has walk-in interviews today in a half-hour! You quickly put on your red tie and run out the door. You see a Taxi, should you hail it?",
        leftChoice: "Walk to the Interview",
        rightChoice: "Take the Taxi",
        leftImage: "bob.jpg",
        rightImage: "taxi.jpg",
        leftIndex: 10,
        rightIndex: 11,
        backImage: "paperBackground.jpg",
        soundtrack: "open.wav",
        loop: false
    },
    {
        //9
        text: "You read Mom's letter, it's been a while since you've talked with her. She says how proud she is of you and hopes you call sometime, do you call her?",
        leftChoice: "Call her",
        rightChoice: "Ignore and Read Job Postings",
        leftImage: "",
        rightImage: "",
        leftIndex: 12,
        rightIndex: 8,
        backImage: "paperBackground.jpg",
        soundtrack: "ring.wav",
        loop: true
    },
    {
        //10
        text: "You begin walking to the interview, it's in a half hour and it's only a 20 minute walk, so you'll make it not too early. You see two objects on the way there, which do you pick up?",
        leftChoice: "Pick up Fish",
        rightChoice: "Pick up Bone",
        leftImage: "fish.jpg",
        rightImage: "bone.jpg",
        leftIndex: 13,
        rightIndex: 14,
        backImage: "paperBackground.jpg",
        soundtrack: "walk.wav",
        loop: true
    },
    {
        //11
        text: "You take the Taxi, but you get there way too early! How can you deal with awkwardness, you can't possibly interview like this! You lose",
        leftChoice: "Retry",
        rightChoice: "Start Over",
        leftImage: "",
        rightImage: "",
        leftIndex: 1,
        rightIndex: 2,
        backImage: "paperLoseBackground.jpg",
        soundtrack: "gameOver.wav",
        loop: false
    },
    {
        //12
        text: "You lose, but you call your mom and realize there is more to life than a job. You can definitely wait for another interview.",
        leftChoice: "Retry",
        rightChoice: "Start Over",
        leftImage: "",
        rightImage: "",
        leftIndex: 9,
        rightIndex: 0,
        backImage: "paperLoseBackground.jpg",
        soundtrack: "gameOver.wav",
        loop: false
    },
    {
        //13
        text: "You take the fish, on your way to the interview you run into a cat! He meows at you and paws, do you give him the fish?",
        leftChoice: "Give Fish",
        rightChoice: "Don't Give",
        leftImage: "cat.jpg",
        rightImage: "",
        leftIndex: 15,
        rightIndex: 17,
        backImage: "paperBackground.jpg",
        soundtrack: null,
        loop: false
    },
    {
        //14
        text: "You take the bone, on your way to the interview you run into a dog! She barks and sits patiently, do you give her the bone?",
        leftChoice: "Give Bone",
        rightChoice: "Don't Give",
        leftImage: "dog.jpg",
        rightImage: "",
        leftIndex: 16,
        rightIndex: 18,
        backImage: "paperBackground.jpg",
        soundtrack: null,
        loop: false
    },
    {
        //15
        text: "You give the fish to the cat, and it turns out, it was the employer's long lost cat! They rejoiced and offered you the job on the spot, congrats Bob found a job!",
        leftChoice: "Grab the Bone instead",
        rightChoice: "Back to Menu",
        leftImage: "fish.jpg",
        rightImage: "cat.jpg",
        leftIndex: 10,
        rightIndex: 0,
        backImage: "paperBackground.jpg",
        soundtrack: "win.wav",
        loop: false
    },
    {
        //16
        text: "You give the bone to the dog, and it turns out, it was office dog that got out! The employer hired you on the spot, congrats Bob found a job!",
        leftChoice: "Grab the Fish instead",
        rightChoice: "Back to Menu",
        leftImage: "bone.jpg",
        rightImage: "dog.jpg",
        leftIndex: 10,
        rightIndex: 0,
        backImage: "paperBackground.jpg",
        soundtrack: "win.wav",
        loop: false
    },
    {
        //17
        text: "You don't give the cat the fish, you lose. How unhappy are you?",
        leftChoice: "Retry",
        rightChoice: "Start Over",
        leftImage: "",
        rightImage: "",
        leftIndex: 9,
        rightIndex: 0,
        backImage: "paperLoseBackground.jpg",
        soundtrack: "gameOver.wav",
        loop: false
    },
    {
        //18
        text: "You don't give the dog the bone, you lose. Do you even have a heart?",
        leftChoice: "Retry",
        rightChoice: "Start Over",
        leftImage: "",
        rightImage: "",
        leftIndex: 9,
        rightIndex: 0,
        backImage: "paperLoseBackground.jpg",
        soundtrack: "gameOver.wav",
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

function setImageSrc(string, element) {
    if (string != "") {
        element.style.display = "inline";
        element.src = "imgs/" + string;
        element.alt = string;
    } else {
        element.style.display = "none";
    }
}

function populate(index = 0) {
    text.innerText = story[index].text;
    setButtonText(story[index].leftChoice, leftButton);
    setButtonText(story[index].rightChoice, rightButton);
    setImageSrc(story[index].leftImage, leftImage);
    setImageSrc(story[index].rightImage, rightImage);
    if (story[index].soundtrack != null) {
        if (currentMusic != null) {
            currentMusic.pause();
        }
        currentMusic = playSound(story[index].soundtrack, story[index].loop);
    } else {
        currentMusic.pause();
    }
    if (story[index].backImage != null) {
        document.body.style.backgroundImage = "url('imgs/" + story[index].backImage + "')";
        document.body.style.backgroundSize = "cover";
        if (story[index].backImage == "paperLoseBackground.jpg") {
            document.getElementById("title").src = "imgs/titleMainLose.jpg"
            if (index != 12) {
                text.style.color = "red";
            } else {
                text.style.color = "blue";
            }

        } else {
            document.getElementById("title").src = "imgs/titleMain.png"
            text.style.color = "black";
        }
    } else {
        text.style.color = "black";
        document.body.style.backgroundImage = "url('imgs/paperBackground.jpg')";
        document.body.style.backgroundSize = "cover";
    }
}