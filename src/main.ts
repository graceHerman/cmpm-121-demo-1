import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My new amazing game 2.0";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// --------------------------------------------------------
// My edits

// Make a counter number
let counter: number = 0;

// Create a div element to display the current counter value
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = counter + " levels completed";   // initial message

// Create the button
const button = document.createElement("button");

// Make button an emoji, let's use the game controller emoji
button.innerHTML = "🎮 Play Now";

// Add event listener for button
button.addEventListener("click", () => {
    counter++;
    counterDisplay.innerHTML = counter + " levels completed";   // updated message
});

// make a counter for the 
setInterval (() => {
    counter++;
    counterDisplay.innerHTML = counter + " levels completed";
}, 1000);

// Make everything on the webpage centered
document.body.style.display = 'grid';
// Center items vertically and horizontally
document.body.style.placeItems = 'center';
// Full height of the viewport
document.body.style.height = '100vh';

// Append the button to the body of the document
document.body.appendChild(button);
document.body.appendChild(counterDisplay);

// file path: '/Users/gracelilanhermangmail.com/Desktop/Fall 2024/121/cmpm-121-demo-1'
