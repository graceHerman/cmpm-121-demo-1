import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My new amazing game 2.0";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create the button
const button = document.createElement('button');

// Make button an emoji, let's use the game controller emoji
button.innerHTML = '🎮 Play Now';

// Append the button to the body of the document
document.body.appendChild(button);

// file path: '/Users/gracelilanhermangmail.com/Desktop/Fall 2024/121/cmpm-121-demo-1'
