const form = document.getElementById("formCommande");
const selectProd = document.getElementById("produitPrincipal");
const inputQty = document.getElementById("quantite");
const inputMontant = document.getElementById("montantTotal");
const btn = document.getElementById("submitBtn");
const formContent = document.getElementById("formContent");
const successMsg = document.getElementById("successMsg");

// TON URL RENDER
const API_URL = "https://my-node-api-8frq.onrender.com/commandes";

// --- CALCUL AUTOMATIQUE DU PRIX (Comme handleProductChange / handleQtyChange) ---
function calculerTotal() {
  const prixUnitaire = parseFloat(selectProd.value) || 0;
  const qte = parseInt(inputQty.value) || 0;
  const total = prixUnitaire * qte;
  inputMontant.value = total > 0 ? total : "";
}

selectProd.addEventListener("change", calculerTotal);
inputQty.addEventListener("input", calculerTotal);

// --- ENVOI DES DONNÉES (handleSubmit) ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  btn.disabled = true;
  btn.innerText = "Envoi...";

  const data = {
    vendeurNom: document.getElementById("vendeurNom").value,
    nom: document.getElementById("nom").value,
    telephone: document.getElementById("telephone").value,
    produit: selectProd.options[selectProd.selectedIndex].text.split(" - ")[0],
    montant: inputMontant.value,
    quantite: inputQty.value,
    adresse: document.getElementById("adresse").value,
    dateLivraison: document.getElementById("dateLivraison").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Affichage du message de succès (Status === "sent")
      formContent.style.display = "none";
      successMsg.style.display = "block";

      // Reset après 3 secondes (Comme ton setTimeout)
      setTimeout(() => {
        form.reset();
        formContent.style.display = "block";
        successMsg.style.display = "none";
        btn.disabled = false;
        btn.innerText = "Envoyer à l'ERP";
      }, 3000);
    } else {
      alert("Erreur lors de l'envoi.");
      btn.disabled = false;
    }
  } catch (error) {
    alert("Serveur injoignable.");
    btn.disabled = false;
    btn.innerText = "Envoyer à l'ERP";
  }
});
