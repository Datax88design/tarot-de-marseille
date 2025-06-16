import { useState } from "react";
import './TarotGameV2.css';


const tarotCards = [
  { name: "Le Bateleur", image: "le_bateleur.jpg", description: "Bon présage amoureux, promotion et spiritualité." },
  { name: "La Papesse", image: "la_papesse.jpg", description: "Vie de couple sincère, réussite par la sagesse." },
  { name: "L'Impératrice", image: "l_imperatrice.jpg", description: "Féminité, amour physique, confiance en soi." },
  { name: "L'Empereur", image: "le_empereur.jpg", description: "Stabilité, engagement sérieux, leadership." },
  { name: "Le Pape", image: "le_pape.jpg", description: "Amour spirituel, période prospère, guide." },
  { name: "L'Amoureux", image: "l_amoureux.jpg", description: "Hésitation, danger financier, influençable." },
  { name: "Le Chariot", image: "le_chariot.jpg", description: "Succès amoureux et pro, évolution rapide." },
  { name: "La Justice", image: "la_justice.jpg", description: "Rigueur, valeurs solides, règles claires." },
  { name: "L'Hermite", image: "l_hermite.jpg", description: "Patience, couple stable, réflexion positive." },
  { name: "La Roue de Fortune", image: "la_roue_de_fortune.jpg", description: "Changement soudain, positif ou négatif." },
  { name: "La Force", image: "la_force.jpg", description: "Relation forte, foi au travail, maîtrise de soi." },
  { name: "Le Pendu", image: "le_pendu.jpg", description: "Blocage, double relation, sacrifice." },
  { name: "La Mort", image: "la_mort.jpg", description: "Transformation, séparation, renouveau." },
  { name: "Tempérance", image: "temperance.jpg", description: "Équilibre, travail en équipe, harmonie." },
  { name: "Le Diable", image: "le_diable.jpg", description: "Passion toxique, manipulation, tentation." },
  { name: "La Maison Dieu", image: "la_maison_dieu.jpg", description: "Choc, fin de cycle, révélation." },
  { name: "L'Étoile", image: "l_etoile.jpg", description: "Espoir, tendresse, inspiration." },
  { name: "La Lune", image: "la_lune.jpg", description: "Illusions, rêve, intuition, secret." },
  { name: "Le Soleil", image: "le_soleil.jpg", description: "Réussite, joie, couple rayonnant." },
  { name: "Le Jugement", image: "le_jugement.jpg", description: "Renaissance, surprise, annonce." },
  { name: "Le Monde", image: "le_monde.jpg", description: "Accomplissement, succès, bonheur total." },
  { name: "Le Mat", image: "le_mat.jpg", description: "Liberté, nouveauté, imprévu." }
];


function getRandomCards(count) {
  return [...tarotCards].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function TarotGameV2() {
  const [count, setCount] = useState(1);
  const [tirage, setTirage] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const tirer = () => {
    const result = getRandomCards(count);
    setTirage(result);
    setFlipped(Array(result.length).fill(false));
  };

  const handleFlip = (i) => {
    const next = [...flipped];
    next[i] = !next[i];
    setFlipped(next);
  };

  return (
    <div className="container">
      <header className="header">
        <span className="icon">🎴</span>
        <h1>Tirage du Tarot de Marseille</h1>
        <p className="date">Tirage du {new Date().toLocaleDateString()}</p>
      </header>

      <section className="controls">
        <p>Sélectionnez le nombre de cartes à tirer</p>
        <div className="button-grid">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={count === n ? "active" : ""}
            >
              {n} carte{n > 1 ? "s" : ""}
            </button>
          ))}
        </div>
        <button className="draw-button" onClick={tirer}>
          🔮 Tirer les cartes
        </button>
      </section>

      {tirage.length > 0 && (
        <hr className="separator" />
      )}

      <section className="cards">
        {tirage.map((card, i) => (
          <div
            className={`card ${flipped[i] ? "flipped" : ""}`}
            key={i}
            onClick={() => handleFlip(i)}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={process.env.PUBLIC_URL + "/Cartes/" + card.image}
                  alt={card.name}
                />
              </div>
              <div className="card-back">
                <h4>{card.name}</h4>
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
