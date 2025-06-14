
import { useState } from "react";
import tarotMeanings from "./tarotMeanings_detailed.json";
import "./TarotGame_roboto.css";

const tarotDeck = [
  { name: "Le Bateleur", image: "/tarot/le_bateleur.jpg" },
  { name: "La Papesse", image: "/tarot/la_papesse.jpg" },
  { name: "L'Impératrice", image: "/tarot/l_imperatrice.jpg" },
  { name: "L'Empereur", image: "/tarot/l_empereur.jpg" },
  { name: "Le Pape", image: "/tarot/le_pape.jpg" },
  { name: "L'Amoureux", image: "/tarot/l_amoureux.jpg" },
  { name: "Le Chariot", image: "/tarot/le_chariot.jpg" },
  { name: "La Justice", image: "/tarot/la_justice.jpg" },
  { name: "L'Hermite", image: "/tarot/l_hermite.jpg" },
  { name: "La Roue de Fortune", image: "/tarot/la_roue.jpg" },
  { name: "La Force", image: "/tarot/la_force.jpg" },
  { name: "Le Pendu", image: "/tarot/le_pendu.jpg" },
  { name: "La Mort", image: "/tarot/la_mort.jpg" },
  { name: "Tempérance", image: "/tarot/temperance.jpg" },
  { name: "Le Diable", image: "/tarot/le_diable.jpg" },
  { name: "La Maison Dieu", image: "/tarot/la_maison_dieu.jpg" },
  { name: "L'Étoile", image: "/tarot/l_etoile.jpg" },
  { name: "La Lune", image: "/tarot/la_lune.jpg" },
  { name: "Le Soleil", image: "/tarot/le_soleil.jpg" },
  { name: "Le Jugement", image: "/tarot/le_jugement.jpg" },
  { name: "Le Monde", image: "/tarot/le_monde.jpg" },
  { name: "Le Mat", image: "/tarot/le_mat.jpg" }
];

export default function TarotGame() {
  const [drawnCards, setDrawnCards] = useState([]);
  const [numCards, setNumCards] = useState(3);

  const drawCards = () => {
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    setDrawnCards(shuffled.slice(0, numCards));
  };

  return (
    <div className="container">
      <h1>🎴 Tirage du Tarot de Marseille</h1>

      <div className="buttons">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} className="btn" onClick={() => setNumCards(n)}>
            {n} carte{n > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      <button className="btn draw" onClick={drawCards}>🔮 Tirer les cartes</button>

      <div className="cards">
        {drawnCards.map((card, index) => (
          <div key={index} className="card">
            <img src={card.image} alt={card.name} />
            <h2>{card.name}</h2>
            <p>{tarotMeanings.find(c => c.name === card.name)?.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
