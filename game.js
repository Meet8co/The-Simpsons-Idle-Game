let money = 0;
let totalEarnings = 0;
const moneyElement = document.getElementById("moneyCount");
const totalEarningsElement = document.getElementById("totalEarnings");
const earnMoneyButton = document.getElementById("earnMoneyButton");

const characters = [
    { name: "Homer", baseCost: 10, baseEarnings: 1, count: 0 },
    { name: "Marge", baseCost: 20, baseEarnings: 2, count: 0 },
    { name: "Bart", baseCost: 50, baseEarnings: 5, count: 0 },
    { name: "Lisa", baseCost: 100, baseEarnings: 10, count: 0 },
    { name: "Maggie", baseCost: 200, baseEarnings: 20, count: 0 },
];

function updateMoney() {
    moneyElement.textContent = money.toFixed(2);
    totalEarningsElement.textContent = totalEarnings.toFixed(2);
}

function buyCharacter(index) {
    const character = characters[index];
    if (money >= character.baseCost) {
        money -= character.baseCost;
        character.count += 1;
        character.baseCost *= 1.15;
        updateMoney();
        updateCharacter(index);
    }
}

function updateCharacter(index) {
    const character = characters[index];
    const characterElement = document.getElementById(`character${index}`);
    characterElement.querySelector(".cost").textContent = `Cost: $${character.baseCost.toFixed(2)}`;
    characterElement.querySelector(".count").textContent = `Count: ${character.count}`;
}

function generateMoney() {
    characters.forEach(character => {
        const earnings = character.count * character.baseEarnings;
        money += earnings;
        totalEarnings += earnings;
    });
    updateMoney();
}

function setupCharacters() {
    const charactersContainer = document.getElementById("characters");
    characters.forEach((character, index) => {
        const characterElement = document.createElement("div");
        characterElement.className = "character";
        characterElement.id = `character${index}`;
        characterElement.innerHTML = `
            <h2>${character.name}</h2>
            <div class="cost">Cost: $${character.baseCost.toFixed(2)}</div>
            <div class="count">Count: ${character.count}</div>
            <button onclick="buyCharacter(${index})">Buy</button>
        `;
        charactersContainer.appendChild(characterElement);
    });
}

earnMoneyButton.addEventListener("click", () => {
    money += 1;
    totalEarnings += 1;
    updateMoney();
});

setupCharacters();
setInterval(generateMoney, 1000);
updateMoney();
