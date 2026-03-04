
import './style.css';


const plats = [
  {
    id: 1,
    nom: "Anchois 23cm",
    prix: 7.9,
    description: "sauce tomate premium, origan, huile d'olive extra vierge, anchois, olive"
  },
  {
    id: 2,
    nom: "Emmental 23cm",
    prix: 7.9,
    description: "sauce tomate premium, origan, huile d'olive extra vierge, emmental, basilic, olive"
  },
  {
    id: 3,
    nom: "Margherita 23cm",
    prix: 7.9,
    description: "sauce tomate premium, origan, huile d'olive extra vierge, mozzarella"
  }
];


console.log(plats);


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <h1>EatSmart - Carte du Restaurant</h1>
  </header>
  <main class="menu-container" id="menu">
  </main>
`;


const menuContainer = document.querySelector('#menu');


plats.forEach(plat => {

  const card = document.createElement('div');
  card.className = 'card';


  card.innerHTML = `
    <h3>${plat.nom}</h3>
    <p>${plat.description}</p>
    <p><strong>Prix : ${plat.prix}€</strong></p>
  `;


  menuContainer?.appendChild(card);
});