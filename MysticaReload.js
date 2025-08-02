//Mystica: RELOAD
//A text-based choose-your-own-adventure mystery game wrapped in secrets, some too dangerous to tell...

// Include readline for player input
const readline = require("readline-sync");

// Game stats
let playerName = "";
let playerHealth = 100;
let playerCoin = 20; // Starting coins
let currentLocation = "Miragem City";
let gameRunning = true;
let inventory = [];

// Display the game title
console.log("Welcome to Mystica: RELOAD");

// Starting message
console.log("Now entering uncharted territory...");

// Welcome the player
playerName = readline.question("\nWhat is your name, brave adventurer? ");
console.log("\nWelcome, " + playerName + ".");
console.log("\n You start with " + playerCoin + " coins.");
