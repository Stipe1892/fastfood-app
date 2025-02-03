document.addEventListener("DOMContentLoaded", function () {
    const storedItems = JSON.parse(localStorage.getItem("menuItems")) || [];

    // Ako u Local Storage-u nema podataka, dodajemo defaultne artikle
    if (storedItems.length === 0) {
        const defaultItems = [
            { name: "Coca-cola 0,33", price: 1.50, img: "../images/kola.jpg", desc: "", category: "pice" },
            { name: "Coca-cola", price: 2.00, img: "../images/cola.jpg", desc: "", category: "pice" },
            { name: "Fanta", price: 2.00, img: "../images/fanta.jpg", desc: "", category: "pice" },
            { name: "Voda", price: 1.00, img: "../images/voda.jpg", desc: "", category: "pice" },
            { name: "Jamnica", price: 1.00, img: "../images/jamnica.jpg", desc: "", category: "pice" },
            { name: "Ožujsko", price: 2.50, img: "../images/zuja.jpg", desc: "", category: "pice" }
        ];
        
        localStorage.setItem("menuItems", JSON.stringify(defaultItems));
    }

    // Prikazivanje artikala na stranici
    displayMenuItems();
});

function displayMenuItems() {
    const itemsContainer = {
        pice: document.querySelector('[data-category="pice"] .items')
    };

    // Ukloni stare artikle iz HTML-a prije dodavanja novih
    Object.values(itemsContainer).forEach(container => container.innerHTML = "");

    const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];

    menuItems.forEach(item => {
        if (item.category !== "pice") return; // Prikazujemo samo pića

        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Cijena: ${item.price.toFixed(2)} €</p>
            <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Dodaj u košaricu</button>
        `;

        itemsContainer.pice.appendChild(itemElement);
    });
}
