const itemInput = document.getElementById("itemInput");
const addItemButton = document.getElementById("addItemButton");
const groceryItems = document.getElementById("groceryItems");
const filterOptions = document.getElementById("filterOptions");

let items = [];

function addItem() {
    const itemName = itemInput.value.trim();

    if (itemName === "") {
        alert("Please enter a grocery item!");
        return;
    }

    const newItem = {
        name: itemName,
        purchased: false
    };

    items.push(newItem);

    itemInput.value = "";

    displayItems();
}

function displayItems() {

    groceryItems.innerHTML = "";

    const filter = filterOptions.value;

    items.forEach((item, index) => {

        if (filter === "VOPI" && !item.purchased) {
            return;
        }

        if (filter === "VOUI" && item.purchased) {
            return;
        }

        const itemElement = document.createElement("p");

        itemElement.textContent = item.name;

        if (item.purchased) {
            itemElement.style.textDecoration = "line-through";
            itemElement.style.color = "gray";
        }

        itemElement.style.cursor = "pointer";
        itemElement.style.fontSize = "20px";
        itemElement.style.margin = "8px";

        itemElement.addEventListener("click", function() {
            items[index].purchased = !items[index].purchased;
            displayItems();
        });

        groceryItems.appendChild(itemElement);
    });
}

filterOptions.addEventListener("change", displayItems);

itemInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addItem();
    }
});