//Mystica: RELOAD
//A text-based adventure game where the player will be able
//to make choices that affect the outcome of the game.

const readline = require("readline-sync");

let playerName = "";
let playerHealth = 100;
let playerCoin = 20;
let currentLocation = "City";
let gameRunning = true;
let inventory = [];

// Display the game title
console.log("Welcome to Mystica: RELOAD");

// Add a welcome message
console.log("Now entering uncharted territory...");

playerName = readline.question("\nWhat is your name, brave adventurer? ");
console.log("\nWelcome, " + playerName + "!");
console.log("\n You start with " + playerCoin + " coins.");
