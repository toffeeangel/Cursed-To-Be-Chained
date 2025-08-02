//Mystica: RELOAD
//A text-based choose-your-own-adventure mystery game wrapped in secrets, some too dangerous to tell...

// Include readline for player input
const readline = require('readline-sync');

// Game stats
let playerName = "";
let playerHealth = 100;
let playerCoin = 20; // Starting coins
let currentLocation = "Miragem City";
let gameRunning = true;
let inventory = [];
let weaponDamage = 0; // Will increase to 10 when player gets a sword
let demonDefense = 5; // Demon's defense value
let healingPotionValue = 30; // How much health the potion restores

// Display the game title
console.log("Welcome to Mystica: RELOAD");

// Starting message
console.log("Now entering uncharted territory...");

// Welcome the player
playerName = readline.question("\nWhat is your name, brave adventurer? ");
console.log("\nWelcome, " + playerName + ".");
console.log("You start with " + playerCoin + " coins.");

// Weapon damage (starts at 0 until player buys a sword)
console.log("\nStarting weapon damage: " + weaponDamage);
console.log("When you buy a sword, weapon damage will increase to 10.");

// Demon defense (affects combat outcomes)
console.log("\nDemon defense: " + demonDefense);
console.log("Demons can withstand some damage in combat.");

// Healing potion restoration
console.log("\nHealing potion value: " + healingPotionValue);
console.log("A potion will restore 30 health.");
