let firstButton = document.getElementById("1");
let secondButton = document.getElementById("2");
let thirdButton = document.getElementById("3");
let fourthButton = document.getElementById("4");
let fifthButton = document.getElementById("5");

function createImgChangeFunction(whatImageToUse) {
    let functionToReturn = function () {
        document.getElementById("imgs").src = whatImageToUse;
    }
    return functionToReturn;
}

// ff = 16 * 15 + 15 = 255
// cb = 16 * 12 + 11 = 203

firstButton.addEventListener("click", createImgChangeFunction("cat1.jpg"));
secondButton.addEventListener("click", createImgChangeFunction("cat2.jpg"));
thirdButton.addEventListener("click", createImgChangeFunction("cat3.jpg"));
fourthButton.addEventListener("click", createImgChangeFunction("cat4.jpg"));
fifthButton.addEventListener("click", createImgChangeFunction("cat5.jpg"));