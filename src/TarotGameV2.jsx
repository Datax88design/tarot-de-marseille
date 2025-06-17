
import React, { useState } from 'react';
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

function TarotGameV2() {
  const [selectedCount, setSelectedCount] = useState(5);
  const [drawnCards, setDrawnCards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const drawCards = () => {
    const shuffled = tarotCards.sort(() => 0.5 - Math.random());
    const drawn = shuffled.slice(0, selectedCount);
    setDrawnCards(drawn);
    setFlipped(new Array(selectedCount).fill(false));
  };

  const toggleFlip = index => {
    const newFlips = [...flipped];
    newFlips[index] = !newFlips[index];
    setFlipped(newFlips);
  };

  const angleStep = 10;

  return (
    <div className="tarot-app">
      <div className="header">
        <div>🔮 Tarot</div>
        <div>Username</div>
      </div>

      <div className="selection-section">
        <h2>Sélectionnez le nombres de cartes à tirer</h2>
        <div className="count-buttons">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => setSelectedCount(n)}
              className={n === selectedCount ? 'selected' : ''}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-section">
        {drawnCards.map((card, index) => {
          const rotation = (index - Math.floor(drawnCards.length / 2)) * angleStep;
          return (
            <div
              key={index}
              className={`card ${flipped[index] ? 'flipped' : ''}`}
              onClick={() => toggleFlip(index)}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="card-inner">
                <div className="card-front">
                  <img src={process.env.PUBLIC_URL + `/Cartes/${card.image}`} alt={card.name} />
                </div>
                <div className="card-back">
                  <strong>{card.name}</strong>
                  <p>{card.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="draw-button" onClick={drawCards}>🔮 Tirez les cartes</button>
    </div>
  );
}

export default TarotGameV2;
