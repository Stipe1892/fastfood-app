// Učitaj košaricu iz localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Provjerite postoji li 'cart-items' i 'total-price' elementi u DOM-u
const cartItemsDiv = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

// Provjerite postoji li 'cart' niz i nije prazan
if (cartItemsDiv && totalPriceElement && Array.isArray(cart) && cart.length > 0) {
  // Dodavanje stavki u košaricu
  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.name} - ${item.quantity} kom - ${(item.price * item.quantity).toFixed(2)} €`;
    cartItemsDiv.appendChild(itemDiv);
  });

  // Izračun ukupne cijene
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceElement.textContent = `Ukupna cijena: ${totalPrice.toFixed(2)} €`;
} else {
  // Ako košarica nema stavki, prikaži poruku
  if (cartItemsDiv) {
    cartItemsDiv.textContent = "Košarica je prazna.";
  }
}
