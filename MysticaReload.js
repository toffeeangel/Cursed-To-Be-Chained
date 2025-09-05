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
let gameRunning = true;
let currentLocation = "Miragem City";
let firstVisit = true;
let hasWeapon = false;
let hasPotion = false;
let hasCross = false;

function showStatus() {
    console.log("\n--- STATUS ---");
    console.log("💀  Health: " + playerHealth);
    console.log("🪙  Coins: " + playerCoin);
    console.log("📍  Location: " + currentLocation);
}

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
        console.log("6: Exit game");

        if(firstVisit) {
            console.log("\nA tall woman with black hair and pale skin walks over to you. Her fox eyes, lined with purple eyeshadow, analyze you carefully. 'Welcome, Rei. Legend has it the Chained Prince of the Shadows is imprisoned in the tallest tower hidden at the back of the city... Do what you must and come back alive.' She then turns around and walks off.");
            firstVisit = false;
        }
    } else if (currentLocation === "Blacksmith") {
        console.log("\n--- BLACKSMITH ---");
        console.log("It's relatively dark here, but you can feel the heat all around you. Weapons and armour line the walls.");
        console.log("\nWhat would you like to do?");
        console.log("1: Return to city");
        console.log("2: Check inventory");
        console.log("3: Check status");
        console.log("4: Exit game");
    } else if (currentLocation === "Upper Districts") {
        console.log("\n--- UPPER DISTRICTS ---");
        console.log("The Upper Districts are lined with shops and buildings, all abandoned or closed down. However, you spot a dusty old potion shop in a corner...");

        console.log("\nWhat would you like to do?");
        console.log("1: Return to city");
        console.log("2: Check inventory");
        console.log("3: Check status");
        console.log("4: Exit game");
    }
}

function move(choiceNum) {
    let validMove = false;

    if(currentLocation === "Miragem City") {
        if(choiceNum === 1) {
            currentLocation = "Blacksmith"
            console.log("\nYou enter the blacksmith's shop.");
            validMove = true;
        } else if(choiceNum === 2) {
            currentLocation = "Upper Districts"
            console.log("\nYou head to the Upper Districts and spot a mysterious shop shrouded in shadows...");
            validMove = true;
        } else if(choiceNum === 3) {
            currentLocation = "Undergrounds"
            validMove = true;
        }
    } else if (currentLocation === "Blacksmith" || currentLocation === "Upper Districts") {
        if(choiceNum === 1) {
            currentLocation = "Miragem City";
            console.log("\nYou return to the city.");
            validMove = true;
        }
    }

    return validMove;
}

function handleCombat() {
    let inBattle = true;
    let demonHealth = 3;
    console.log("\nYou decide to head straight for the tower - at the back of the city. To get there, you'll need to take a path through the Undergrounds, starting at an abandoned subway station...");
    console.log("\n--- THE UNDERGROUNDS ---");
    console.log("You walk down the stairs of the abandoned subway station, deeper and deeper underground. Seemingly senseless murals and writings litter the walls. Everything is quiet, but you might not be alone...");
    console.log("\nA demon lunges towards you and you dodge. Battle started.");
    if(hasWeapon) {
        console.log("Wait?! Right... you have a sword. Fine by me.");
    }

    while(inBattle) {
        if(hasWeapon) {
        console.log("Demon health: " + demonHealth);
        console.log("You attack.");
        demonHealth--;
        } else {
            console.log("Oh wait! Haha, you don't have a weapon!");
            updateHealth(-100);
            return false;
        }

        if(demonHealth <= 0) {
            console.log("Demon defeated. You watch its motionless body on the floor.");
            console.log("You get 10 coins for effort.");
            console.log("\nShocked, you run up the stairs and out of the Undergrounds.");
            playerCoin += 10;
            inBattle = false;
            return true;
        }
    }
}

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

function displayInventory() {
    console.log("\n--- INVENTORY ---");
    if(!hasWeapon && !hasPotion && !hasCross) {
        console.log("Inventory empty. You came rather unprepared, Rei. It's rather funny how you think you'll make it even halfway.");
        console.log("\nYou: 'What's your problem...'");
        return;
    }

    if(hasWeapon) console.log("- Sword");
    if(hasPotion) console.log("- Life Potion");
    if(hasCross) console.log("- Cross- keep that away from me-! Hell.");
}

//Main game loop
while(gameRunning) {
    showLocation();
    let validChoice = false;
    while(!validChoice) {
        try {
            let choice = readline.question("\nEnter choice (number): ");
            if(choice.trim() === "") {
                throw "Please enter a number.";
            }

            let choiceNum = parseInt(choice);
            if(isNaN(choiceNum)) {
                throw "That's not a number. Please enter a number.";
            }
            
            if(currentLocation === "Miragem City") {
                if(choiceNum < 1 || choiceNum > 6) {
                    throw "Please enter a number between 1 and 6.";
                }

                validChoice = true; // Valid choice made

                if(choiceNum < 3) {
                    if(!move(choiceNum)) {
                        console.log("\nYou can't go there...");
                    }
                } else if (choiceNum === 3) {
                    if(!handleCombat()) {
                        currentLocation = "Miragem City";
                    }
                } else if (choiceNum === 4) {
                    displayInventory();
                } else if(choiceNum === 5) {
                    showStatus();
                } else if(choiceNum === 6) {
                    console.log("\nAre you sure you want to leave? Farewell, but you'll come back soon...");
                    gameRunning = false;
                } else {
                    console.log("\nInvalid choice. Please enter a number between 1 and 5.");
                }
            } else if (currentLocation === "Blacksmith" || currentLocation === "Upper Districts") {
                if(choiceNum < 1 || choiceNum > 4) {
                    throw "Please enter a number between 1 and 4.";
                }

                validChoice = true;

                if(choiceNum === 1) {
                    move(choiceNum);
                } else if (choiceNum === 2) {
                    displayInventory();
                } else if(choiceNum === 3) {
                    showStatus();
                } else if(choiceNum === 4) {
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
