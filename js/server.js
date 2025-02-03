const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Middleware za parsiranje JSON-a i URL-encoded podataka
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulirana baza podataka
const users = [];

// Ruta za prikaz registracijske forme
app.get("/", (req, res) => {
  res.send(`Registracija HTML forma`);
});

// Ruta za registraciju korisnika
app.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validacija podataka
  if (username.length < 4) {
    return res.status(400).send("Korisničko ime mora imati najmanje 4 znaka.");
  }

  if (!email.endsWith("@gmail.com")) {
    return res.status(400).send("Email mora sadržavati '@gmail.com'.");
  }

  if (password.length < 8) {
    return res.status(400).send("Lozinka mora imati najmanje 8 znakova.");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Lozinke se ne podudaraju.");
  }

  // Provjera postoji li korisnik s istim emailom
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).send("Korisnik s ovim emailom već postoji.");
  }

  try {
    // Hashiranje lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    // Spremanje korisnika u "bazu"
    users.push({
      username,
      email,
      password: hashedPassword, // Spremanje samo hashirane lozinke
    });

    res.send("Registracija uspješna!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Dogodila se greška tijekom registracije.");
  }
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`);
});
