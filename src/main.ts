import './style.css';


interface ArticleDTO {
  idArticle: string;
  nomArticle: string;
  ingredientsArticle: string | null;
  quantiteArticle: string | null;
  PrixArticle: string;
}


function genererPlatHTML(art: ArticleDTO): string {

  let nomAffiche: string = art.nomArticle;
  
  if (art.quantiteArticle !== null) {
    nomAffiche = art.nomArticle + " " + parseInt(art.quantiteArticle) + "cm";
  }

  
  return `
    <div class="card">
      <h3>${nomAffiche}</h3>
      <p>${art.ingredientsArticle !== null ? art.ingredientsArticle : ""}</p>
      <p><strong>Prix : ${art.PrixArticle}€</strong></p>
    </div>
  `;
}


async function chargerDonnees(): Promise<ArticleDTO[]> {

  const res = await fetch('http://localhost/David-api-eatsmart/articles');

  return await res.json();
}


async function init() {

  console.log("Chargement du menu");
  

  const menuData = await chargerDonnees();
  console.log("Données reçues :", menuData);


  const appDiv = document.querySelector<HTMLDivElement>('#app');


  if (appDiv) {

    appDiv.innerHTML = `
      <header>
        <h1>EatSmart - Carte du Restaurant</h1>
      </header>
      <main class="menu-container">
        ${menuData.map((art) => genererPlatHTML(art)).join('')}
      </main>
    `;
  }
}


init();