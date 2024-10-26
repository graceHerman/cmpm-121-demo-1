import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My new amazing game 2.0";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// --------------------------------------------------------
// My edits for the programming assignment

// Create a counter number
let clickCounter: number = 0;

// Create a growth rate
let growthRate: number = 0;

// Create a variable to keep track of time between frames
let lastTimeStamp: number | null = null;

// Added code from slide instructions
// included a description
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

// Purchased avaialble items
const availableItems: Item[] = [
  {
    name: "Potions",
    cost: 10,
    rate: 0.1,
    description: "A magical liguid that heals players",
  },
  {
    name: "Weapons",
    cost: 100,
    rate: 2,
    description: "Sharp metal tool for slaying monsters",
  },
  {
    name: "Armor",
    cost: 1000,
    rate: 50,
    description: "Chest plate cloaked in metal to increase defense",
  },
  {
    name: "Spells",
    cost: 5000,
    rate: 100,
    description: "A piece of partchmant for learning a magical ability",
  },
  {
    name: "Dragons",
    cost: 10000,
    rate: 150,
    description: "Small but mighty dragon that can assist in battle",
  },
];

// Purchased items count
// Used to track the number of purchases
const purchasesCount: { [key: string]: number } = {
  Potions: 0,
  Weapons: 0,
  Armor: 0,
  Spells: 0,
  Dragons: 0,
};

// Create div element to display the current counter value
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = clickCounter.toFixed(2) + " levels completed";

// Create the button with the emoji
// Redesign the button
const button = document.createElement("button");
button.innerHTML = "🎮 Enter level";
button.style.fontSize = "2em";
button.style.padding = "20px";
button.style.borderRadius = "15px";

// Create display for current growth rate
const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML =
  "Growth rate: " + growthRate.toFixed(2) + " levels/sec";

const PURCHASED_SUFFIX = " purchased: ";

// Helper Function
const purchaseDisplayText = (item: Item, count: number) => {
    return `${item.name}${PURCHASED_SUFFIX}${count}<br>`;
};

// Create display for purchased counts for items
const upgradesDisplay = document.createElement("div");
const updatedUpgradesDisplay = () => {
  const displayText = availableItems.map(item => 
    purchaseDisplayText(item, purchasesCount[item.name])
    ).join('');

    upgradesDisplay.innerHTML = displayText;
};
updatedUpgradesDisplay();

// Add event listener for emoji button
// Every time the button is clicked, the counter is added by 1
button.addEventListener("click", () => {
  clickCounter++;
  counterDisplay.innerHTML = clickCounter.toFixed(2) + " levels completed"; // updated message
  checkUpgradeAvailability();
});

// Create upgrade buttons dynamically for each item
const upgradeButtons: HTMLButtonElement[] = [];

// Go through each item for upgrades
// Display the upgrade button for each item
availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `💡 Buy ${item.name} (+${item.rate} levels/sec) - ${item.description}`;
  upgradeButton.disabled = true;

  // Function to calculate the new cost of an item
const calculateNewCost = (currentCost: number) => {
  const increaseFactor = 1.5; // Can be easily adjusted or sourced from config
  return currentCost * increaseFactor;
};

  // Create event listener for the event listener for buying upgrades
  // counter has to be less than the cost
  // if it is less than the cost then the cost is subtracted to the counter,
  // and the purchase number and the growth rate increases
  upgradeButton.addEventListener("click", () => {
    if (clickCounter >= item.cost) {
      clickCounter -= item.cost;
      purchasesCount[item.name]++; // Increment purchase count for the item
      growthRate += item.rate;

      // Increase cost for next purchase
      // Increase it by a factor of 1.5
      item.cost = calculateNewCost(item.cost);

      // Display the counter and growth rate display
      counterDisplay.innerHTML = clickCounter.toFixed(2) + " levels completed";
      growthRateDisplay.innerHTML =
      "Growth rate: " + growthRate.toFixed(2) + " levels/sec";

      updatedUpgradesDisplay(); // Update the display of purchases
      checkUpgradeAvailability(); // Check button availability
    }
  });

  upgradeButtons.push(upgradeButton);
});

// checks if upgraded buttons should be available/enabled
const checkUpgradeAvailability = () => {
  upgradeButtons.forEach((button, index) => {
    button.disabled = clickCounter < availableItems[index].cost;
  });
};

// calculates the time in units/secs
function updateCounter(timestamp: number) {
  if (lastTimeStamp !== null) {
    // Calculate the time difference since the last frame
    const elapsed = (timestamp - lastTimeStamp) / 1000; // Time in seconds

    // Increment the counter proportionally to the time elapsed
    clickCounter += elapsed * growthRate; // Increase by the appropriate fraction

    // Update the display
    counterDisplay.innerHTML = clickCounter.toFixed(2) + " levels completed";
    checkUpgradeAvailability();
  }

  // Update the start timestamp to the current one for the next frame
  lastTimeStamp = timestamp;

  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

// Start animation loop
requestAnimationFrame(updateCounter);

// Make everything on the webpage centered
document.body.style.display = "grid";
document.body.style.placeItems = "center";
// Full height of the viewport
document.body.style.height = "100vh";

// Create a container div to center the button and counter display
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.height = "100vh"; 

// Append the buttons and the displays to the body of the document with container
container.appendChild(button);
upgradeButtons.forEach((button) => container.appendChild(button));
container.appendChild(counterDisplay);
container.appendChild(growthRateDisplay);
container.appendChild(upgradesDisplay);

// Append the container
document.body.appendChild(container);

// file path: '/Users/gracelilanhermangmail.com/Desktop/Fall 2024/121/cmpm-121-demo-1'
