import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My new amazing game 2.0";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// --------------------------------------------------------
// My edits for the programming assignment

// Make a counter number
let counter: number = 0;

// keep track of time between frames 
// Make a growth rate
let growthRate: number = 0;
// keep track of time between frames
let start: number | null = null;

// Create a div element to display the current counter value
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = counter.toFixed(2) + " levels completed"; // initial message

// Create the play button
const button = document.createElement("button");
button.innerHTML = "🎮 Play Now"; // Game controller emoji for the play button

// Create the upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "💡 Buy Upgrade (+1 growth/sec)"; // Lightbulb emoji for the upgrade
upgradeButton.disabled = true; // Disabled until the counter reaches 10

// Event listener for the play button (manual clicks)
button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = counter.toFixed(2) + " levels completed"; // Update message
  upgradeButton.disabled = counter < 10; // Enable upgrade if counter >= 10
});

// Event listener for the upgrade button
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1; // Increase the growth rate by 1 per second
    counterDisplay.innerHTML = counter.toFixed(2) + " levels completed"; // Update message
    upgradeButton.disabled = counter < 10; // Check if upgrade should be disabled
  }
});

// Function to update the counter automatically
function updateCounter(timestamp: number) {
  if (start !== null) {
    // Calculate the elapsed time since the last frame in seconds
    const elapsed = (timestamp - start) / 1000;

    // Increment the counter based on the growth rate and time elapsed
    counter += elapsed * growthRate;

    // Update the display
    counterDisplay.innerHTML = counter.toFixed(2) + " levels completed";

    // Check if the upgrade button should be enabled/disabled
    upgradeButton.disabled = counter < 10;
  }

  // Update the start timestamp for the next frame
  start = timestamp;

  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

// Set up the layout

// Start animation loop
requestAnimationFrame(updateCounter);

// Make everything on the webpage centered
document.body.style.display = "grid";
// Center items vertically and horizontally
document.body.style.placeItems = "center";
// Full height of the viewport
document.body.style.height = "100vh";

// Create a container div to center the elements
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.height = "100vh"; // Full height of the viewport

// Append the buttons and counter display to the container
container.appendChild(button);
container.appendChild(upgradeButton);
container.appendChild(counterDisplay);

// Add the container to the body
document.body.appendChild(container);

// file path: '/Users/gracelilanhermangmail.com/Desktop/Fall 2024/121/cmpm-121-demo-1'
