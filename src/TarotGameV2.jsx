import React, { useState, useCallback } from 'react';
import './TarotGameV2.css';

const tarotCards = [
  { name: "Le Bateleur", image: "le_bateleur.jpg", meaning: "Bon présage sentimental, bénéfique pour la carrière, propice à la méditation spirituelle." },
  { name: "La Papesse", image: "la_papesse.jpg", meaning: "Vie de couple sincère et durable, réussite professionnelle, évolution personnelle." },
  { name: "L'Impératrice", image: "l_imperatrice.jpg", meaning: "Exprime la féminité, confiance en soi, inspiration amoureuse et charnelle." },
  { name: "L'Empereur", image: "le_empereur.jpg", meaning: "Engagement sentimental solide, leadership affirmé." },
  { name: "Le Pape", image: "le_pape.jpg", meaning: "Amour spirituel mais confus, succès professionnel, rôle de guide." },
  { name: "L'Amoureux", image: "l_amoureux.jpg", meaning: "Hésitation sentimentale et professionnelle, danger financier, influençable." },
  { name: "Le Chariot", image: "le_chariot.jpg", meaning: "Succès amoureux, grande avancée professionnelle." },
  { name: "La Justice", image: "la_justice.jpg", meaning: "Valeurs sentimentales fortes, respect des règles, droiture et engagement." },
  { name: "L'Hermite", image: "l_hermite.jpg", meaning: "Relation stable, patience, sagesse intérieure." },
  { name: "La Roue de Fortune", image: "la_roue_de_fortune.jpg", meaning: "Changements soudains positifs ou négatifs, en amour et au travail." },
  { name: "La Force", image: "la_force.jpg", meaning: "Amour solide, foi dans le travail, maîtrise de soi." },
  { name: "Le Pendu", image: "le_pendu.jpg", meaning: "Relation peu sincère, discrétion au travail, patience." },
  { name: "La Mort", image: "la_mort.jpg", meaning: "Séparation à venir, changement professionnel important." },
  { name: "Tempérance", image: "temperance.jpg", meaning: "Équilibre parfait, harmonie dans le couple et au travail." },
  { name: "Le Diable", image: "le_diable.jpg", meaning: "Relations courtes, tensions et conflits, mauvaise communication." },
  { name: "La Maison Dieu", image: "la_maison_dieu.jpg", meaning: "Amour positif, mais rupture ou fin professionnelle." },
  { name: "L'Étoile", image: "l_etoile.jpg", meaning: "Tendresse amoureuse, compassion, lenteur professionnelle." },
  { name: "La Lune", image: "la_lune.jpg", meaning: "Relation cachée, créativité, forte imagination." },
  { name: "Le Soleil", image: "le_soleil.jpg", meaning: "Désir, passion, belles opportunités professionnelles." },
  { name: "Le Jugement", image: "le_jugement.jpg", meaning: "Nouvelle rencontre, renouveau amoureux et professionnel." },
  { name: "Le Monde", image: "le_monde.jpg", meaning: "Relation stable et heureuse, succès et gloire." },
  { name: "Le Mat", image: "le_mat.jpg", meaning: "Nouveau départ, grands changements de vie." }
];

function TarotCard({ card, flipped, onClick }) {
  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={`/Cartes/${card.image}`} alt={card.name} />
        </div>
        <div className="card-back">
          <strong>{card.name}</strong>
          <p>{card.meaning}</p>
        </div>
      </div>
    </div>
  );
}

function TarotGameV2() {
  const [selectedCount, setSelectedCount] = useState(3);
  const [drawnCards, setDrawnCards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const drawCards = useCallback(() => {
    const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, selectedCount);
    setDrawnCards(selected);
    setFlipped(new Array(selected.length).fill(false));
  }, [selectedCount]);

  const toggleFlip = useCallback((index) => {
    setFlipped(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  }, []);

  return (
    <div className="tarot-app">
      <div className="header">
        <h1>🔮 Tarot</h1>
        <div>Log out</div>
      </div>

      <div className="selection-section">
        <h2>Combien de cartes voulez-vous tirer ?</h2>
        <div className="count-buttons">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => setSelectedCount(n)}
              className={n === selectedCount ? 'selected' : ''}
              aria-label={`Tirer ${n} carte${n > 1 ? 's' : ''}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-section">
        {drawnCards.map((card, index) => (
          <TarotCard
            key={index}
            card={card}
            flipped={flipped[index]}
            onClick={() => toggleFlip(index)}
          />
        ))}
      </div>

      {drawnCards.length > 0 && (
        <p className="reveal-status">
          {flipped.filter(f => f).length}/{drawnCards.length} cartes révélées
        </p>
      )}

      <button className="draw-button" onClick={drawCards}>
        Tirez les cartes
      </button>
    </div>
  );
}

export default TarotGameV2;
