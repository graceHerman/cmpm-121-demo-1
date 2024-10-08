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

// Added code from slide instructions
interface Item {
  name: string,
  cost: number,
  rate: number
};

// Purchased avaialble items
const availableItems : Item[] = [
  {name: "Potions", cost: 10, rate: 0.1},
  {name: "Weapons", cost: 100, rate: 2},
  {name: "Armor", cost: 1000, rate: 50},
];

// Purchased Items count 
// Object to track the number of purchases
const purchasesCount: { [key: string]: number } = {
  Potions: 0,
  Weapons: 0,
  Armor: 0
};

// Create a div element to display the current counter value
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = counter.toFixed(2) + " levels completed"; // initial message

// Create the button
const button = document.createElement("button");

// Make button an emoji, let's use the game controller emoji
button.innerHTML = "🎮 Play Now";

// Create display for current growth rate
const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = "Growth rate: " + growthRate.toFixed(2) + " levels/sec";

// Create display for the purchased counts for items
const upgradesDisplay = document.createElement("div");
const updatedUpgradesDisplay = () => {
  upgradesDisplay.innerHTML = `
    Potions purchased: ${purchasesCount.Potions}<br>
    Weapons purchased: ${purchasesCount.Weapons}<br>
    Armor purchased: ${purchasesCount.Armor}
  `;
};
updatedUpgradesDisplay(); 

// Add event listener for button
button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = counter.toFixed(2) + " levels completed"; // updated message
  checkUpgradeAvailability();
});

// Create upgrade buttons dynamically for each item
const upgradeButtons: HTMLButtonElement[] = [];

// Go through each items for upgrades
// Go through each item for upgrades
availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `💡 Buy ${item.name} (+${item.rate} levels/sec)`;
  upgradeButton.disabled = true;

  // Event listener for buying upgrades
  upgradeButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      purchasesCount[item.name]++; // Increment purchase count for the item
      growthRate += item.rate;

      // Increase cost for next purchase
      item.cost *= 1.5; // Increase cost by a factor of 1.15

      counterDisplay.innerHTML = counter.toFixed(2) + " levels completed";
      growthRateDisplay.innerHTML = "Growth rate: " + growthRate.toFixed(2) + " levels/sec";
      updatedUpgradesDisplay(); // Update the display of purchases
      checkUpgradeAvailability(); // Check button availability
    }
  });

  upgradeButtons.push(upgradeButton);
});

// checks if upgraded buttons should be available/enabled
const checkUpgradeAvailability = () => {
  upgradeButtons.forEach((button, index) => {
    button.disabled = counter < availableItems[index].cost;
  });
};

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
