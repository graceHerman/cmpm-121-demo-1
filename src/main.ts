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

// keep track of time between frames 
let start: number | null = null;

// Create a div element to display the current counter value
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = counter.toFixed(2) + " levels completed"; // initial message
// Create the button
const button = document.createElement("button");

// Make button an emoji, let's use the game controller emoji
button.innerHTML = "🎮 Play Now";

// Add event listener for button
button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = counter.toFixed(2) + " levels completed"; // updated message
});

/*// make a counter increment for every second even when the player is not clicking
setInterval(() => {
  counter++;
  counterDisplay.innerHTML = counter + " levels completed";
}, 1000);*/

function updateCounter(timestamp: number) {
    if (start !== null) {
        // Calculate the time difference since the last frame
        const elapsed = (timestamp - start) / 1000; // Time in seconds

        // Increment the counter proportionally to the time elapsed
        counter += elapsed; // Increase by the appropriate fraction

        // Update the display
        counterDisplay.innerHTML = counter.toFixed(2) + " levels completed";
    }

    // Update the start timestamp to the current one for the next frame
    start = timestamp;

    // Request the next animation frame
    requestAnimationFrame(updateCounter);
}

// Start animation loop
requestAnimationFrame(updateCounter);

// Make everything on the webpage centered
document.body.style.display = "grid";
// Center items vertically and horizontally
document.body.style.placeItems = "center";
// Full height of the viewport
document.body.style.height = "100vh";

// Create a container div to center the button and counter display
const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';
container.style.justifyContent = 'center';
container.style.height = '100vh'; // Full height of the viewport

// Append the button to the body of the document
container.appendChild(button);
container.appendChild(counterDisplay);

document.body.appendChild(container);

// file path: '/Users/gracelilanhermangmail.com/Desktop/Fall 2024/121/cmpm-121-demo-1'
