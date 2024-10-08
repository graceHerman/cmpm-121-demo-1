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

// Make a growth rate
let growthRate: number = 0;

// keep track of time between frames
let start: number | null = null;

// Make three purchased items
const upgrades = {
  A: { cost: 10, rate: 0.1, purchased: 0 },
  B: { cost: 100, rate: 2.0, purchased: 0 },
  C: { cost: 1000, rate: 50.0, purchased: 0 },
};

// Create a div element to display the current counter value
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = counter.toFixed(2) + " levels completed"; // initial message

// Create the button
const button = document.createElement("button");

// Make button an emoji, let's use the game controller emoji
button.innerHTML = "🎮 Play Now";

/*//Step 5:
// Create a new button for upgrade purchase
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "💡 Buy Upgrade (+1 growth/sec)"; // Lightbulb emoji for the upgrade
upgradeButton.disabled = true;*/

// Create display for current growth rate
const growthRateDisplay = document.createElement("div");
//growthRateDisplay.innerHTML = "Growth rate: " + growthRate.toFixed(2) + " levels/sec";

// Create display for the purchased counts for items
const upgradesDisplay = document.createElement("div");
const updatedUpgradesDisplay = () => {
  upgradesDisplay.innerHTML = `
    Healing purchased: ${upgrades.A.purchased}<br>
    Weapon purchased: ${upgrades.B.purchased}<br>
    Armor purchased: ${upgrades.C.purchased}
  `;
};
updatedUpgradesDisplay();

// Add event listener for button
button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = counter.toFixed(2) + " levels completed"; // updated message
  checkUpgradeAvailability();
});

/*// Step 3:
// make a counter increment for every second even when the player is not clicking
setInterval(() => {
  counter++;
  counterDisplay.innerHTML = counter + " levels completed";
}, 1000);*/

// Create upgrade buttons dynamically for each item
const upgradeButtons: HTMLButtonElement[] = [];

// Go through each items for upgrades
for (const item in upgrades) {
  const key = item as keyof typeof upgrades;
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `💡 Buy ${item} (+${upgrades[key].rate} levels/sec)`;
  upgradeButton.disabled = true;

  // Make an addEventListener to go through units/sec for each item in upgrades
  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrades[key].cost) {
      counter -= upgrades[key].cost;
      upgrades[key].purchased++;
      growthRate += upgrades[key].rate;
      counterDisplay.innerHTML = counter.toFixed(2) + " levels completed";
      growthRateDisplay.innerHTML = "Growth rate: " + growthRate.toFixed(2) + " levels/sec";
      updatedUpgradesDisplay(); // display items
      checkUpgradeAvailability(); // check button avaialabilty
    }
  });
  upgradeButtons.push(upgradeButton);
}

// checks if upgraded buttons should be avaiable/enabled
const checkUpgradeAvailability = () => {
  upgradeButtons.forEach((button, index) => {
    const items = Object.keys(upgrades)[index];
    const keys = items as keyof typeof upgrades;
    button.disabled = counter < upgrades[keys].cost;
  });
};

/*// Step 5:
// Displays the amount of levels being completed 
// for every 10 clicks on the button, the upgrade button becomes available 
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    counterDisplay.innerHTML = counter.toFixed(2) + " levels completed";
    upgradeButton.disabled = counter < 10;
  }
});*/

function updateCounter(timestamp: number) {
  if (start !== null) {
    // Calculate the time difference since the last frame
    const elapsed = (timestamp - start) / 1000; // Time in seconds

    // Increment the counter proportionally to the time elapsed
    counter += elapsed * growthRate; // Increase by the appropriate fraction

    // Update the display
    counterDisplay.innerHTML = counter.toFixed(2) + " levels completed";
    //upgradeButton.disabled = counter < 10;
    checkUpgradeAvailability();
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
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.height = "100vh"; // Full height of the viewport

// Append the button to the body of the document
container.appendChild(button);
upgradeButtons.forEach((button) => container.appendChild(button));
container.appendChild(counterDisplay);
container.appendChild(growthRateDisplay);
container.appendChild(upgradesDisplay);

document.body.appendChild(container);

// file path: '/Users/gracelilanhermangmail.com/Desktop/Fall 2024/121/cmpm-121-demo-1'
