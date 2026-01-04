const form = document.getElementById("formCommande");
const btn = document.getElementById("submitBtn");

// Dès que tu as déployé ton backend, mets l'adresse ici :
const API_URL = "https://TON-APP-BACKEND.onrender.com/commandes";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.innerText = "Envoi sécurisé...";

  const selectProd = document.getElementById("produitPrincipal");

  const data = {
    id: Date.now(),
    nom: document.getElementById("nom").value,
    telephone: document.getElementById("telephone").value,
    produit: selectProd.options[selectProd.selectedIndex].text,
    montant: selectProd.value,
    quantite: document.getElementById("quantite").value,
    adresse: `${document.getElementById("adresse").value}, ${
      document.getElementById("ville").value
    }`,
    dateLivraison: document.getElementById("dateLivraison").value,
    dateCommande: new Date().toLocaleString(),
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("✅ Commande envoyée à l'entreprise !");
      form.reset();
    }
  } catch (error) {
    alert("Erreur de connexion au serveur de l'entreprise.");
  } finally {
    btn.disabled = false;
    btn.innerText = "Confirmer l'achat sécurisé";
  }
});
