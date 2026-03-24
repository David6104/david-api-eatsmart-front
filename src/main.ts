import './style.css';

interface ArticleDTO {
  idArticle: string;
  nomArticle: string;
  ingredientsArticle: string | null;
  quantiteArticle: string | null;
  PrixArticle: string;
}

async function chargerMessageDuJour(): Promise<string> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1"); // besoin 3 : permet de recueprer le message du jour via le lien de l'API
  const data = await res.json();
  return data.title; 
}

function genererPlatHTML(art: ArticleDTO): string {
  let nomAffiche = art.nomArticle;

  if (art.quantiteArticle !== null) {
    nomAffiche = `${art.nomArticle} ${parseInt(art.quantiteArticle)}cm`;
  }
  
  const prix = parseFloat(art.PrixArticle); // besoin 2 : convertir le prix en string en nombre flottant
  const badgeBonPlan = prix < 10 ? `<span class="badge-bon-plan">🔥 Bon Plan</span>` : ""; // besoin 2 : si le prix est inferieur a 10 alors afficher bon plan

  return `
    <div class="card">
      <h3>${nomAffiche}</h3>
      <p>${art.ingredientsArticle ?? ""}</p>
      <p><strong>Prix : ${art.PrixArticle}€</strong></p>
      <p>${badgeBonPlan}</p>
      <button type="button" class="btn-order">Ajouter</button>
    </div>
  `;
}

// besoin 1 : fonction qui va compter les plats dynamiquement
function mettreAJourCompteur() {
  const compteur = document.querySelector<HTMLHeadingElement>('#compteur-plats');
  const nbPlats = document.querySelectorAll('.card').length;

  if (compteur) {
    compteur.textContent = `(${nbPlats} plats)`;
  }
}

async function chargerDonnees(): Promise<ArticleDTO[]> {
  const res = await fetch('http://localhost/David-api-eatsmart/articles');
  return await res.json();
}

//  tableau qui stocke les plats sélectionnés
const panier: ArticleDTO[] = [];


function mettreAJourPanier() {
  // elements HTML ou on va injecter les données
  const cartItemsDiv = document.querySelector<HTMLDivElement>('#cart-items');
  const totalPrixSpan = document.querySelector<HTMLSpanElement>('#total-prix');

  if (cartItemsDiv && totalPrixSpan) {
    // si le panier est vide on remet le texte par défaut
    if (panier.length === 0) {
      cartItemsDiv.innerHTML = '<p>Votre panier est vide</p>';
      totalPrixSpan.textContent = '0.00';
    } else {
      // besoin 6 : Affichage dynamique via un .map()
      cartItemsDiv.innerHTML = panier.map(art => `
        <div class="cart-item">
          <span>${art.nomArticle}</span>
          <span>${parseFloat(art.PrixArticle).toFixed(2)}€</span>
        </div>
      `).join('');

      // besoin 7 : Calcul et affichage du total
      let total = 0;
      for (const art of panier) {
        total += parseFloat(art.PrixArticle);
      }
      
      // on utilise toFixed(2) pour forcer les 2 chiffres après la virgule
      totalPrixSpan.textContent = total.toFixed(2);
    }
  }
}

async function init() {
  console.log("Chargement du menu");

  const menuData = await chargerDonnees();
  const messageDuJour = await chargerMessageDuJour(); // besoin 3 :mettre dans une variable le message du jour

  console.log("Données reçues :", menuData);
  console.log("Message du jour :", messageDuJour);

  const appDiv = document.querySelector<HTMLDivElement>('#app');

  if (appDiv) {// besoins 1 et 3 : affiche dans le header le nombres de plats et le message du jour
    appDiv.innerHTML = `
      <header>
        <h1> EatSmart - Carte du Restaurant <strong id="compteur-plats"> </strong> </h1>
        <p id="message-jour">Message du jour : ${messageDuJour}</p>
      </header>

       <div class="content-wrapper">
        <main class="menu-container">
          ${menuData.map((art) => genererPlatHTML(art)).join('')}
        </main>

        <aside class="cart-container">
          <h2>Votre Panier</h2>
          <div id="cart-items">
            <p>Votre panier est vide</p>
          </div>
          <hr>
          <div class="cart-total">
            <strong>Total : <span id="total-prix">0.00</span>€</strong>
          </div>
        </aside>
      </div>
    `;
    
    mettreAJourCompteur();
    
    const tousLesBoutons = document.querySelectorAll<HTMLButtonElement>('.btn-order');
    tousLesBoutons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const plat = menuData[index];
        console.log(`Bouton n°${index} cliqué ! Plat : ${plat.nomArticle}`);
        
        // Ajout du plat au panier
        panier.push(plat); 
        console.log("État du panier :", panier); 
        
       
        mettreAJourPanier(); 
      });
    });
  }
}

init();