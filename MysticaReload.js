//Mystica: RELOAD
//A short text-based choose-your-own-adventure RPG demonic noir game
// Navigate the city, fight demons and rescue the Chained Prince of the Shadows in the hopes that he will free you from the curse that binds your soul to this city

// Include readline for player input
const readline = require('readline-sync');

// Game stats
let playerHealth = 100;
let playerCoin = 20; // Starting coins
let inventory = [];

// Display the game title
console.log("Welcome to Mystica: RELOAD");

// Starting message
console.log("Now entering uncharted territory...");

// Welcome the player
console.log("\nRei, was it? Nevermind, not important...");
console.log("\nWelcome, Rei.");
console.log("You start with " + playerCoin + " coins.");
console.log("\nYour quest: rescue the Chained Prince of the Shadows from the tower he's been imprisoned in, and hope that in return he'll free you from the curse that binds your soul to this city.");

// Weapon damage (starts at 0 until player buys a sword)
let weaponDamage = 0; // Will increase to 10 when player gets a sword
console.log("\nStarting weapon damage: " + weaponDamage);
console.log("When you buy a sword, weapon damage will increase to 10.");

// Demon defense (affects combat outcomes)
let demonDefense = 5; // Demon's defense value
console.log("\nDemon defense: " + demonDefense);
console.log("Demons can withstand some damage in combat.");

// Healing potion restoration
let healingPotionValue = 30; // How much health the potion restores
console.log("\nHealing potion value: " + healingPotionValue);
console.log("A potion will restore 30 health.");

//Location tracking
let currentLocation = "Miragem City";
let firstVisit = true;

if(currentLocation === "Miragem City") {
    console.log("\n--- MIRAGEM CITY ---");
    console.log("You're in Miragem City. There are tall buildings of various assortments all around you, connected by catwalks. Below, you can see the deep end of the city: the lower districts. A suffocating haze hangs around the city permanently.");
    console.log("\nWhere would you like to go?");
    console.log("1: Go to blacksmith");
    console.log("2: Head to the densest part of the upper districts");
    console.log("3: Go straight to the tower the Prince is imprisoned in");
    console.log("4: Check status");
    console.log("5: Exit game");

    if(firstVisit) {
        console.log("\nA tall woman with black hair and pale skin walks over to you. Her fox eyes, lined with purple eyeshadow, analyze you carefully. 'Welcome, Rei. Legend has it the Chained Prince of the Shadows is imprisoned in the tallest tower hidden at the back of the city...' She then turns around and walks off.");
        firstVisit = false;
    }
} else if (currentLocation === "Blacksmith") {
    console.log("\n--- BLACKSMITH ---");
    console.log("It's relatively dark here, but you can feel the heat all around you. Weapons and armour line the walls.");
    console.log("\nWhere would you like to go?");
    console.log("1: Return to city");
    console.log("2: Check status");
    console.log("3: Exit game");
}

let choice = readline.question("\nEnter choice (number): ");
let choiceNum = parseInt(choice);

if(currentLocation === "Miragem City") {
    if(choiceNum === 1) {
        currentLocation = "Blacksmith"
        console.log("\nYou enter the blacksmith's shop.");
    } else if(choiceNum === 2) {
        console.log("\nYou head towards the densest part of the upper districts and spot a mysterious shop shrouded in shadows...");
    } else if(choiceNum === 3) {
        console.log("You decide to head straight for the tower- at the back of the city. To get there, you'll need to take a path through the Undergrounds, starting at an abandoned subway station...");
    } else if(choiceNum === 4) {
        console.log("\n--- STATUS ---");
        console.log("💀  Health: " + playerHealth);
        console.log("🪙  Coins: " + playerCoin);
        console.log("📍  Location: " + currentLocation);
    } else if(choiceNum === 5) {
        console.log("\nAre you sure you want to leave? Farewell, but you'll come back soon...");
    } else {
        console.log("\nInvalid choice. Please enter a number between 1 and 5.");
    }
} else if(currentLocation === "Blacksmith") {
    if(choiceNum === 1) {
        currentLocation = "Miragem City";
        console.log("\nYou return to the city.");
    } else if(choiceNum === 2) {
        console.log("\n--- STATUS ---");
        console.log("  Health: " + playerHealth); //Skull emoji
        console.log("  Coins: " + playerCoin);
        console.log("  Location: " + currentLocation);
    } else if(choiceNum === 3) {
        console.log("\nAre you sure you want to leave? Farewell, but you'll come back soon...");
    } else {
        console.log("\nInvalid choice. Please enter a number between 1 and 3.");
    }
}
