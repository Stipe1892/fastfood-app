// Funkcija koja dodaje stavku u košaricu
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Uzmi postojeću košaricu ili prazan niz ako ne postoji
  
  // Dodaj novu stavku u košaricu
  cart.push({ name: name, price: parseFloat(price) });
  
  // Spremi košaricu u localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} dodan u košaricu!`);
}

// Funkcija koja prikazuje košaricu na stranici
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Uzmi košaricu iz localStorage
  const cartContainer = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  let total = 0;
  
  // Ako košarica nije prazna, prikaži stavke
  if (cart.length > 0) {
    cartContainer.innerHTML = ""; // Očisti prethodne stavke
    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
        <p>${item.name}</p>
        <p>${item.price.toFixed(2)} €</p>
        <button class="remove-btn" onclick="removeItem(${index})">Ukloni</button>
      `;
      cartContainer.appendChild(itemElement);
      total += item.price;
    });

    // Prikazivanje ukupne cijene
    totalPrice.innerText = `Ukupno: ${total.toFixed(2)} €`;
  } else {
    cartContainer.innerHTML = "<p>Košarica je prazna.</p>";
    totalPrice.innerText = "Ukupno: 0.00 €";
  }
}

// Funkcija za uklanjanje stavke iz košarice
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Ukloni stavku na temelju indeksa
  cart.splice(index, 1);
  
  // Ažuriraj localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Ponovno prikaži ažuriranu košaricu
  displayCart();
}

// Dodaj event listener na sva dugmadi "Dodaj u košaricu"
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", function() {
    const name = this.getAttribute("data-name");
    const price = this.getAttribute("data-price");
    addToCart(name, price);
  });
});

// Ako se radi o stranici košarice, prikazujemo sadržaj košarice
if (window.location.pathname.includes("cart.html")) {
  displayCart();
}

