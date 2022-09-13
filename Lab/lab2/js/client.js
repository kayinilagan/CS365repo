//Important concepts to take away from this:
//  Use of JavaScript arrays
//  document.getElementById()
//  document.body
//  experimenting in-browser
//  Useful DOM node properties/methods:
//	    .innerHTML (and maybe show some alternate way of creating nodes)
//	    .children
//	    .style.backgroundColor
//	    .style.backgroundImage
//	    .addEventListener()

//Setup an array of strings (relative URLs for images).
let myBackgroundImages = [
    "img/penny.png",
    "img/nickel.png",
    "img/dime.png",
    "img/quarter.png",
    "img/half-dollar.png"
];

//Put <img> elements right into the body of the page.
for (let theImage of myBackgroundImages) {
    addImageToPanel(theImage);
}

//Add a paragraph
let a = document.createElement("p"); //creates a paragraph element
a.innerText = "Here we are using innerText, so this <em> is not interpreted.";
document.body.append(a); //Adding our paragraph to the body of the document.

//Add another paragraph
let b = document.createElement("p"); //creates a paragraph element
b.innerHTML = "Here we are using innerHTML, so <em> HTML tags are interpreted</em>.";
document.body.append(b); //Adding our paragraph to the body of the document.

//Get a collection of all the image elments in the panel, give each a "mouseover" and "mouseleave" behavior.
let imgElements = document.getElementById("imagePanel").children;
for (let element of imgElements) {
    addListenerToImage(element);
}

document.body.style.backgroundColor = '#fffff'; //white color

document.getElementById("addButton").addEventListener("click", function () {
    let textField = document.getElementById("imageToAdd");
    let newImgElement = addImageToPanel(textField.value);
    addListenerToImage(newImgElement);
});


function addListenerToImage(element) {
    element.addEventListener("mouseover",
        function () {
            let imageSrc = this.src; // 'this' here refers to the DOM element that was hovered over.
            document.body.style.backgroundImage = "url('" + imageSrc + "')"; //setting a CSS property for the element
        });
    element.addEventListener("mouseleave",
        function () {
            document.body.style.backgroundColor = "#fffff"; //white color
            document.body.style.backgroundImage = "none";
        });
}

function addImageToPanel(theImage) {
    let myImage = document.createElement("img");
    myImage.src = theImage;
    myImage.width = 200;
    myImage.alt = "A background image";
    document.getElementById("imagePanel").append(myImage);
}
// Ctrl+Space for options when typing code
// Ctrl+Shift+Space for hints when typing code
// Ctrl+. for refactoring with highlight code
// F2 to rename for every instance
// F5 to debug ON HTML page, but we can create watch expressions( like variables)
// We can pause scripts in execution in the inspect element/debug mode.