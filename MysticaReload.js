//Mystica: RELOAD
//A short text-based choose-your-own-adventure RPG demonic noir game
//Navigate the city, fight demons and rescue the Chained Prince of the Shadows in the hopes that he will free you from the curse that binds your soul to this city

// Include readline for player input
const readline = require('readline-sync');

// Game stats
let playerName = "";
let playerHealth = 100;
let playerCoin = 20; // Starting coins
let currentLocation = "Miragem City";
let firstVisit = true;
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
playerName = readline.question("\nRei, was it? Nevermind, not important...");
console.log("\nWelcome, Rei.");
console.log("You start with " + playerCoin + " coins.");
console.log("\nYour quest: rescue the Chained Prince of the Shadows from the tower he's been imprisoned in, and hope that in return he'll free you from the curse that binds your soul to this city.");

// Weapon damage (starts at 0 until player buys a sword)
console.log("\nStarting weapon damage: " + weaponDamage);
console.log("When you buy a sword, weapon damage will increase to 10.");

// Demon defense (affects combat outcomes)
console.log("\nDemon defense: " + demonDefense);
console.log("Demons can withstand some damage in combat.");

// Healing potion restoration
console.log("\nHealing potion value: " + healingPotionValue);
console.log("A potion will restore 30 health.");
