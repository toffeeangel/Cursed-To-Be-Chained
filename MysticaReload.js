//Mystica: RELOAD
//A short text-based choose-your-own-adventure RPG demonic noir game
// Navigate the city, fight demons and rescue the Chained Prince of the Shadows in the hopes that he will free you from the curse that binds your soul to this city

// Include readline for player input
const readline = require('readline-sync');

// Game stats
let gameRunning = true;
let playerHealth = 100;
let playerCoin = 20; // Starting coins
let currentLocation = "Miragem City";
let firstVisit = true;
let inventory = []; // Will store all player items

// Weapon damage (starts at 0 until player buys a sword)
let weaponDamage = 0; // Base weapon damage
let demonDefense = 5; // Demon's defense value
let healingPotionValue = 30; // How much health the potion restores

// Item templates with properties
const lifePotion = {
    name: "Life Potion",
    type: "Potion",
    value: 5, // Cost in coins
    effect: 30, // Healing amount
    description: "Restores 30 health points"
};

const sword = {
    name: "Sword",
    type: "Weapon",
    value: 10, // Cost in coins
    effect: 10, // Damage amount
    description: "A magical blade for combat"
};

const cross = {
    name: "Cross",
    type: "Defense",
    value: 15, // Cost in coins
    effect: 15, // Protection amount
    description: "Gives you stronger defense against demons"
};

const ashSword = {
    name: "The Sword of Ashes",
    type: "Weapon",
    value: 20, // Cost in moral- I mean coins
    effect: 20, // Damage amount
    description: "The Sword of Ashes carries both the strength of all those who died wielding it, and their sorrow"
};

const soulCrown = {
    name: "The Soul Crown",
    type: "Reward",
    description: "The Soul Crown is your objective, but it could be your rescue, or a curse..."
}

// --- INFORMATION DISPLAY FUNCTIONS ---

// Shows status including health, coins and current location
function showStatus() {
    console.log("\n--- STATUS ---");
    console.log("💀  Health: " + playerHealth);
    console.log("🪙  Coins: " + playerCoin);
    console.log("📍  Location: " + currentLocation);
}

// Shows location descriptions and choices
function showLocation() {
    if(currentLocation === "Miragem City") {
        console.log("\n--- MIRAGEM CITY ---");
        console.log("You're in Miragem City. There are tall buildings of various assortments all around you, connected by catwalks. Below, you can see the deep end of the city: the lower districts. A suffocating haze hangs around the city permanently.");
        console.log("\nWhat would you like to do?");
        console.log("1: Go to blacksmith");
        console.log("2: Head to the Upper Districts");
        console.log("3: Go straight to the tower the Prince is imprisoned in");
        console.log("4: Check inventory");
        console.log("5: Check status");
        console.log("6: Use item");
        console.log("7: Help");
        console.log("8: Exit game");

        if(firstVisit) {
            console.log("\nA tall woman with black hair and pale skin walks over to you. Her fox eyes, lined with purple eyeshadow, analyze you carefully. 'Welcome, Rei. Legend has it the Chained Prince of the Shadows is imprisoned in the tallest tower hidden at the back of the city... Do what you must and come back alive.' She then turns around and walks off.");
            firstVisit = false;
        }
    } else if (currentLocation === "Blacksmith") {
        console.log("\n--- BLACKSMITH ---");
        console.log("It's relatively dark here, but you can feel the heat all around you. Weapons and armour line the walls.");
        console.log("\nWhat would you like to do?");
        console.log("1: Buy sword (" + sword.value + " gold)");
        console.log("2: Return to city");
        console.log("3: Check inventory");
        console.log("4: Check status");
        console.log("5: Use item");
        console.log("6: Help");
        console.log("7: Exit game");
    } else if (currentLocation === "Upper Districts") {
        console.log("\n--- UPPER DISTRICTS ---");
        console.log("The Upper Districts are lined with shops and buildings, all abandoned or closed down. However, you spot a dusty old potion shop in a corner...");
        console.log("\nWhat would you like to do?");
        console.log("1: Buy potion (" + lifePotion.value + " gold)");
        console.log("2: Return to city");
        console.log("3: Check inventory");
        console.log("4: Check status");
        console.log("5: Use item");
        console.log("6: Help");
        console.log("7: Exit game");
    }
}

// --- MOVEMENT FUNCTIONS ---

/**
 * Handles game choices and location movement
 * @param {number} choiceNum The chosen option number
 * @returns {boolean} True if movement was successful
 */

function move(choiceNum) {
    let validMove = false;

    if(currentLocation === "Miragem City") {
        if(choiceNum === 1) {
            currentLocation = "Blacksmith";
            console.log("\nYou enter the blacksmith's shop.");
            validMove = true;
        } else if(choiceNum === 2) {
            currentLocation = "Upper Districts";
            console.log("\nYou head to the Upper Districts.");
            validMove = true;
        } else if(choiceNum === 3) {
            currentLocation = "Undergrounds";
            console.log("\nYou decide to head straight for the tower - at the back of the city. To get there, you'll need to take a path through the Undergrounds, starting at an abandoned subway station...");
            console.log("\n--- THE UNDERGROUNDS ---");
            console.log("You walk down the stairs of the abandoned subway station, deeper and deeper underground. Seemingly senseless murals and writings litter the walls. Everything is quiet, but you might not be alone...");
            validMove = true;

            // Trigger combat when entering the Undergrounds
            if(!handleCombat()) {
                currentLocation = "Miragem City";
            }
        }
    } else if (currentLocation === "Blacksmith" || currentLocation === "Upper Districts") {
        if(choiceNum === 2) {
            currentLocation = "Miragem City";
            console.log("\nYou return to the city.");
            validMove = true;
        }
    }

    return validMove;
}

// --- COMBAT FUNCTIONS ---
// Functions that handle battle and health

/**
 * Checks if player has an item of specified type
 * @param {string} type The type of item to check for
 * @returns {boolean} True if player has the item type
 */

function hasItemType(type) {
    return inventory.some(item => item.type === type);
}

/**
 * Handles demon battles
 * Checks if player has weapon and manages combat results
 * @returns {boolean} true if player wins, false if they enter without a weapon, leading to player death
 */

function handleCombat() {
    let inBattle = true;
    let demonHealth = 3;
    console.log("\nA demon lunges towards you and you dodge. Battle started.");
    if(hasItemType("Weapon")) {
        let weapon = inventory.find(item => item.type === "Weapon");
        console.log("\nNarrator: 'Wait?! Right... you have a " + weapon.name + ". Fine by me.'");
        console.log("");
    }

    while(inBattle) {
        if(hasItemType("Weapon")) {
        let weapon = inventory.find(item => item.type === "Weapon");
        console.log("\nDemon health: " + demonHealth);
        console.log("You deal damage.");
        demonHealth--;
        console.log("\nThe demon lunges at you. You take damage.");
        console.log("Your health: " + playerHealth);
        playerHealth--;
        } else {
            console.log("Oh wait! Haha, you don't have a weapon!");
            updateHealth(-100);
            return false;
        }

        if(demonHealth <= 0) {
            console.log("\nDemon defeated. You watch its mutilated body on the floor.");
            console.log("You get 10 coins for effort.");
            console.log("\nShocked, you run up the stairs and out of the Undergrounds.");
            playerCoin += 10;
            inBattle = false;
            currentLocation = "Miragem City";
            return true;
        }
    }
}

/**
 * Updates player health, keeping it between 0 and 100
 * @param {number} amount Amount to change health by (positive for healing, negative for damage)
 * @returns {number} The new health value
 */
function updateHealth(amount) {
    playerHealth += amount;

    if(playerHealth > 100) {
        playerHealth = 100;
        console.log("You're at full health... for now, at least.");
    }

    if(playerHealth < 0) {
        playerHealth = 0;
        console.log("You're gravely wounded.");
    }

    console.log("Health is now: " + playerHealth);
    return playerHealth;
}

// --- ITEM FUNCTIONS ---
// Functions that handle item usage and inventory

/**
 * Handles using items like potions
 * @returns {boolean} true if item was used successfully, false if not
 */
function useItem() {
    if(hasItemType("Potion")) {
        console.log("\nYou drink the " + lifePotion.name + ".");
        console.log("\nNarrator: 'Full disclosure, I may or may not have poisoned it.'");
        console.log("\nYou: 'WHAT?! WHY?!'");
        console.log("\nNarrator: 'Calm down. I said I 𝑚𝑎𝑦 or 𝑚𝑎𝑦 𝑛𝑜𝑡 have done something.'");
        updateHealth(lifePotion.effect);
        let potionIndex = inventory.indexOf("Life Potion");
        inventory.splice(potionIndex, 1);
        return true;
    }
    console.log("\nNarrator: 'You don't have any usable items. If you're bleeding out or something, you're gonna have to deal with it.'");
    return false;
}

// Displays inventory
function displayInventory() {
    console.log("\n--- INVENTORY ---");
    if(inventory.length === 0) {
        console.log("Narrator: 'Inventory empty. You came rather unprepared, Rei. It's rather funny how you think you'll make it even halfway.'");
        console.log("\nYou: 'What's your problem...'");
        return;
    } else {
        inventory.forEach((item) => {
            if(item.name === "Cross") {
                console.log("- " + item.name + "- keep that away from me-! Hell.");
            } else {
                console.log("- " + item.name);
            }
        });
    }
}

function getItemsByType(type) {
    return
}

// --- SHOPPING FUNCTIONS ---

// Handles buying items at the blacksmith
function buyFromBlacksmith() {
    if(hasItemType("Weapon")) {
        console.log("\nNarrator: 'Rei, you already have a sword. Now what do you need another one for?'");
    }
    else if(playerCoin >= sword.value) {
        console.log("\nBlacksmith: 'Take this sword. You're going to need it.'");
        playerCoin -= sword.value;

        // Add sword object to inventory
        inventory.push({...sword}); // Create a copy of the sword object

        console.log("\nYou take the " + sword.name + " and look at its jewel-encrusted hilt, feeling the magic humming in its blade. You buy it for " + sword.value + " coins.");
        console.log("Remaining coins: " + playerCoin);
    } else {
        console.log("\nBlacksmith: 'You don't have enough coins. This isn't for free, you know. Come back later.'");
    }
}

// Handles buying items at the Upper Districts shops
function buyFromPotionShop() {
    if(hasItemType("Potion")) {
        console.log("\nNora: 'Hang on... you can only take one potion at a time.'");
    }
    else if(playerCoin >= lifePotion.value) {
        console.log("\nYou enter the shop with the sign that reads, 'Potions and Contortions'. Inside, you find a young woman with freckles and light pink hair up in space buns. Her necklace says, 'Nora'.");
        console.log("\nNora: 'This potion will heal your physical wounds, can't say the same for your spiritual ones, though.'");
        playerCoin -= lifePotion.value;

        // Add Life Potion object to inventory
        inventory.push({...lifePotion}); // Create a copy of the Life Potion object

        console.log("\nYou buy a " + lifePotion.name + " for " + lifePotion.value + " coins. You look hesitantly at the purple liquid swirling inside.");
        console.log("Remaining coins: " + playerCoin);
    } else {
        console.log("\nNora: 'No coins, no potion, sorry.'");
    }
}

// --- HELP SYSTEM ---

// Shows all available game commands and how to use them
function showHelp() {
    console.log("\nNarrator: 'Help? Holy Beelzebub, you really are useless...'");
    console.log("\n--- HELP ---");

    console.log("\nMovement Commands:");
    console.log("- In Miragem City, choose 1-3 to travel to different locations");
    console.log("- In other locations, choose the return option to go back to Miragem City");

    console.log("\nBattle Information:");
    console.log("\nNarrator: '... Why don't we go to the Undergrounds and find out?'");

    console.log("\nItem usage:");
    console.log("- Life Potions restore 30 health");
    console.log("- You can buy Life Potions at the shop in the Upper Districts for 5 coins");
    console.log("- You can buy a sword at the blacksmith for 10 coins");

    console.log("\nOther commands:");
    console.log("- Choose the status option to see your current location, health and coins");
    console.log("- Choose the help option to see this message again");
    console.log("- Choose the exit option to end the game");

    console.log("\nTips:");
    console.log("- Keep healing potions for dangerous areas");
    console.log("- Defeat demons to earn coins");
    console.log("- Don't get too comfortable around the narrator...");

    console.log("\nNarrator: 'And look, if you ever need help... don't ask me.'");
    console.log("You: '...'");
}

// --- MAIN GAME LOOP ---

// Display the game title
console.log("Welcome to Mystica: RELOAD");

// Starting message
console.log("Now entering uncharted territory...");

// Welcome the player
console.log("\nRei, was it? Nevermind, not important...");
console.log("\nWelcome, Rei.");
console.log("You start with " + playerCoin + " coins.");
console.log("\nYour quest: rescue the Chained Prince of the Shadows from the tower he's been imprisoned in, and hope that in return he'll free you from the curse that binds your soul to this city.");

while(gameRunning) {
    // Show current location and choices
    showLocation();

    // Get and validate player choice
    let validChoice = false;
    while(!validChoice) {
        try {
            let choice = readline.question("\nEnter choice (number): ");

            // Check for sneaky empty input
            if(choice.trim() === "") {
                throw "Please enter a number.";
            }

            // Convert to number and check for validity
            let choiceNum = parseInt(choice);
            if(isNaN(choiceNum)) {
                throw "That's not a number. Please enter a number.";
            }
            
            // Handle choices based on location
            if(currentLocation === "Miragem City") {
                if(choiceNum < 1 || choiceNum > 8) {
                    throw "Please enter a number between 1 and 8.";
                }

                validChoice = true; // Valid choice made

                if(choiceNum <= 3) {
                    move(choiceNum);
                } else if (choiceNum === 4) {
                    displayInventory();
                } else if(choiceNum === 5) {
                    showStatus();
                } else if(choiceNum === 6) {
                    useItem();
                } else if(choiceNum === 7) {
                    showHelp();
                } else if(choiceNum === 8) {
                    console.log("\nAre you sure you want to leave? Farewell, but you'll come back soon...");
                    gameRunning = false;
                } else {
                    console.log("\nInvalid choice. Please enter a number between 1 and 5.");
                }
            } else if (currentLocation === "Blacksmith") {
                if(choiceNum < 1 || choiceNum > 7) {
                    throw "Please enter a number between 1 and 7.";
                }

                validChoice = true;

                if(choiceNum === 1) {
                    buyFromBlacksmith();
                } else if (choiceNum === 2) {
                    move(choiceNum);
                } else if(choiceNum === 3) {
                    displayInventory();
                } else if(choiceNum === 4) {
                    showStatus();
                } else if(choiceNum === 5) {
                    useItem();
                } else if(choiceNum === 6) {
                    showHelp();
                } else if(choiceNum === 7) {
                    console.log("\nAre you sure you want to leave? Farewell, but you'll come back soon...");
                    gameRunning = false;
                } else {
                    console.log("\nInvalid choice. Please enter a number between 1 and 3.");
                }
            } else if(currentLocation === "Upper Districts") {
                if(choiceNum < 1 || choiceNum > 7) {
                    throw "Please enter a number between 1 and 7.";
                }

                validChoice = true;

                if(choiceNum === 1) {
                    buyFromPotionShop();
                } else if (choiceNum === 2) {
                    move(choiceNum);
                } else if(choiceNum === 3) {
                    displayInventory();
                } else if(choiceNum === 4) {
                    showStatus();
                } else if(choiceNum === 5) {
                    useItem();
                } else if(choiceNum === 6) {
                    showHelp();
                } else if(choiceNum === 7) {
                    console.log("\nAre you sure you want to leave? Farewell, but you'll come back soon...");
                    gameRunning = false;
                } else {
                    console.log("\nInvalid choice. Please enter a number between 1 and 3.");
                }
            }
        } catch(error) {
            console.log("\nERROR: " + error);
            console.log("LOG: RETRY LAST ACTION");
        }
    }
    //Check if player died
    if(playerHealth <= 0) {
        console.log("\nYOU DIED. GAME OVER.");
        gameRunning = false;
    }
}
