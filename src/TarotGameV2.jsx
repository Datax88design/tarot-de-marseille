import React, { useState, useEffect } from 'react';
import './TarotGameV2.css';
import astroData from './data/astroData_2025.json';
import interpretations from './data/interpretations_amour.json';
import hatersData from './data/tarot_haters.json';

function normalizeText(str) {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/’/g, "'");
}

function getLoveMeaning(cardName, partnerName) {
  const found = interpretations.find(item =>
    normalizeText(item.Arcane) === normalizeText(cardName)
  );
  if (!found) return `Aucune interprétation disponible pour ${cardName}.`;
  return `Dans votre lien avec ${partnerName}, ${found["Interprétation Amoureuse"]}`;
}

function getLoveNarrative(cardName, partnerName) {
  switch (cardName) {
    case "Le Pendu":
      return `🪢 Entre vous et ${partnerName}, il y a des non-dits ou des attentes prolongées.`;
    case "L'Hermite":
      return `🕯️ ${partnerName} semble introspectif. Cette carte évoque une relation qui avance lentement.`;
    case "Le Monde":
      return `🌍 Une belle complétude vous unit à ${partnerName}.`;
    case "L’Amoureux":
      return `💘 Une attirance vive entre vous et ${partnerName}, mais aussi un besoin de clarifier un choix.`;
    case "Le Diable":
      return `🔥 Une connexion magnétique avec ${partnerName}.`;
    default:
      return getLoveMeaning(cardName, partnerName);
  }
}

const tarotCards = [
  { name: "Le Bateleur", image: "le_bateleur.jpg", meaning: "Tu tiens entre tes mains le pouvoir de commencer quelque chose de neuf. Ton potentiel est brut, prêt à jaillir dans le monde. Prends confiance : ta créativité te guidera là où tout reste possible." },
  { name: "La Papesse", image: "la_papesse.jpg", meaning: "Elle incarne le silence fécond. Dans l’ombre, elle murmure la sagesse de l’intuition. Écoute ta voix intérieure, ne précipite rien : l’information que tu attends viendra en temps voulu." },
  { name: "L'Impératrice", image: "l_imperatrice.jpg", meaning: "Elle rayonne de vitalité et d’idées. Elle t’invite à exprimer pleinement ta voix, à séduire, à créer. Sa fécondité est mentale et affective : ose donner forme à tes envies." },
  { name: "L'Empereur", image: "le_empereur.jpg", meaning: "Pilier de structure et de solidité, l’Empereur te rappelle l’importance d’un cadre ferme. Il protège ce que tu bâtis. Prends ta place sans craindre d’imposer tes règles, mais reste souple de cœur." },
  { name: "Le Pape", image: "le_pape.jpg", meaning: "Guide et médiateur, il relie le ciel et la terre. Le Pape t’invite à transmettre, enseigner ou demander conseil. Sa présence rassure, mais te rappelle que la vérité se trouve parfois au-delà des dogmes." },
  { name: "L'Amoureux", image: "l_amoureux.jpg", meaning: "L’Amoureux parle d’attirance, mais aussi de choix délicats. Entre désir et raison, ton cœur hésite. Pose-toi : qu’est-ce qui vibre vraiment pour toi ? Décide par amour, pas par peur." },
  { name: "Le Chariot", image: "le_chariot.jpg", meaning: "Il t’encourage à foncer, à dépasser les obstacles. Ton énergie est conquérante, prête à ouvrir une nouvelle route. Reste maître de tes rênes pour éviter de t’éparpiller en chemin." },
  { name: "La Justice", image: "la_justice.jpg", meaning: "Elle tranche, elle pèse, elle remet l’équilibre où tout vacille. Si tu attends une décision, elle sera claire et logique. Reste honnête avec toi-même, car la Justice te rendra ce que tu projettes." },
  { name: "L'Hermite", image: "l_hermite.jpg", meaning: "Sous sa lanterne, il avance doucement. L’Hermite parle de patience, de recul, d’une solitude nécessaire pour y voir plus clair. Écoute tes silences : ils contiennent ta prochaine réponse." },
  { name: "La Roue de Fortune", image: "la_roue_de_fortune.jpg", meaning: "Elle tourne, imprévisible. Un cycle s’achève, un autre s’amorce. La chance peut sourire, mais ne reste pas passif : la Roue récompense ceux qui savent saisir leur chance." },
  { name: "La Force", image: "la_force.jpg", meaning: "Elle murmure que ta plus grande puissance réside dans la douceur maîtrisée. La colère devient courage, l’impulsion devient action lucide. Tu as en toi la force de dompter tes peurs." },
  { name: "Le Pendu", image: "le_pendu.jpg", meaning: "Suspendu à l’envers, il t’offre un regard nouveau sur ce qui te bloque. Le Pendu est le maître du lâcher-prise. Il t’invite à patienter, à renoncer à vouloir tout contrôler." },
  { name: "L'Arcane sans nom (XIII)", image: "la_mort.jpg", meaning: "Elle tranche ce qui est déjà fané. Ce qui meurt prépare la renaissance. Laisse partir ce qui ne te nourrit plus : chaque fin est une porte grande ouverte sur un renouveau." },
  { name: "Tempérance", image: "temperance.jpg", meaning: "Elle harmonise tes contraires, fluidifie les tensions. Avec Tempérance, les excès s’apaisent, la guérison s’installe. Prends le temps de te rééquilibrer : tout trouve sa juste place." },
  { name: "Le Diable", image: "le_diable.jpg", meaning: "Magnétique et provocateur, il révèle tes pulsions cachées. Le Diable parle d’attractions intenses, parfois toxiques. Es-tu maître de tes désirs, ou esclave de tes chaînes ?" },
  { name: "La Maison Dieu", image: "la_maison_dieu.jpg", meaning: "Le choc qui secoue, la tour qui s’écroule. Un effondrement soudain libère une vérité. Ce chaos apparent te délivre : ce qui tombe n’avait plus de fondations solides." },
  { name: "L'Étoile", image: "l_etoile.jpg", meaning: "L’Étoile t’inspire tendresse et espoir. Elle murmure que tes rêves sont protégés. Même dans l’obscurité, elle éclaire ton chemin : garde confiance en ta bonne étoile." },
  { name: "La Lune", image: "la_lune.jpg", meaning: "Elle t’enveloppe de mystère et d’émotions troubles. La Lune évoque peurs, fantasmes, illusions : avance avec prudence. Écoute tes intuitions, mais vérifie tes mirages." },
  { name: "Le Soleil", image: "le_soleil.jpg", meaning: "Il brille sur toi. Joie, succès, relations sincères : le Soleil dissipe les ombres. Profite de sa chaleur, partage ta lumière sans réserve." },
  { name: "Le Jugement", image: "le_jugement.jpg", meaning: "Un réveil, une prise de conscience. Le Jugement t’appelle à renaître, à laisser derrière toi tes vieilles erreurs. C’est le moment d’ouvrir un nouveau chapitre." },
  { name: "Le Monde", image: "le_monde.jpg", meaning: "Le Monde t’offre l’accomplissement et la reconnaissance. Tu termines un cycle en beauté. Tout s’aligne : savoure cette plénitude, elle t’ouvre vers d’autres horizons." },
  { name: "Le Mat", image: "le_mat.jpg", meaning: "Libre comme le vent, il avance sans bagages. Le Mat te pousse à tout quitter pour explorer de nouvelles terres. Marche sans carte : l’aventure est ta boussole." }
];


function TarotCard({ card, flipped, onClick }) {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src={`/Cartes/${card.image}`} alt={card.name} />
        </div>
        <div className="card-back">
          <strong>{card.name}</strong>
          {card.hater_meme && <p className="hater-meme">{card.hater_meme}</p>}
          {card.hater_serieux && <p className="hater-serieux">{card.hater_serieux}</p>}
          {card.meaning && !card.hater_meme && !card.hater_serieux && (
            <p>{card.meaning}</p>
          )}
        </div>
      </div>
    </div>
  );
}


function TarotGameV2() {
  const [selectedCount, setSelectedCount] = useState(3);
  const [drawnCards, setDrawnCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [tab, setTab] = useState('tirage');
  const [history, setHistory] = useState([]);
  const [loveName, setLoveName] = useState('');

  useEffect(() => {
    if (tab === 'amour' && selectedCount !== 1 && selectedCount !== 3) {
      setSelectedCount(3);
    }
  }, [tab, selectedCount]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('tarotHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const drawCards = () => {
    const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, selectedCount);
    setDrawnCards(selected);
    setFlipped(new Array(selected.length).fill(false));

    const newHistory = [...history, { date: new Date().toLocaleString(), cards: selected }];
    setHistory(newHistory);
    localStorage.setItem('tarotHistory', JSON.stringify(newHistory));
  };

  const toggleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  const resetDraw = () => {
    setDrawnCards([]);
    setFlipped([]);
  };

  const drawLoveCards = () => {
    const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, selectedCount);
    const personalized = selected.map(card => ({
      ...card,
      meaning: `Dans votre lien avec ${loveName}, ${card.meaning.toLowerCase()}`
    }));
    setDrawnCards(personalized);
    setFlipped(new Array(selected.length).fill(false));
  };

const drawHaterCard = () => {
  const randomIndex = Math.floor(Math.random() * hatersData.length);
  const selected = hatersData[randomIndex];
  setDrawnCards([{
    name: selected.arcane,
    image: selected.image,
    hater_meme: selected.hater_meme,
    hater_serieux: selected.hater_serieux,
    protection: selected.protection
  }]);
  setFlipped([false]);
};
const today = new Date().toISOString().split('T')[0];
const astro = astroData[today];

  return (
    <div className="tarot-app">
      <div className="header">
        <h1>Poison & Antidote</h1>
        <div className="tabs">
          <button className={tab === 'tirage' ? 'active' : ''} onClick={() => { setTab('tirage'); resetDraw(); }}>Tirage</button>
          <button className={tab === 'amour' ? 'active' : ''} onClick={() => { setTab('amour'); resetDraw(); }}>Amour</button>
          <button className={tab === 'haters' ? 'active' : ''} onClick={() => { setTab('haters'); resetDraw(); }}>Haters</button>
          <button className={tab === 'historique' ? 'active' : ''} onClick={() => setTab('historique')}>Historique</button>
        </div>
      </div>

      {(tab === 'tirage' || tab === 'amour') && (
        <>
         {tab === 'amour' && (
  <div className="amour-tab">
    <div className="selection-section">
      <h2>Avec qui souhaitez-vous faire un tirage ?</h2>
      <input
        type="text"
        value={loveName}
        onChange={(e) => setLoveName(e.target.value)}
        placeholder="Prénom du partenaire"
        className="love-input"
      />
    </div>

    <div className="selection-section">
      <h2>Quel tirage souhaitez-vous ?</h2>
      <div className="count-buttons love">
        {[1, 3].map((n) => (
          <button
            key={n}
            onClick={() => setSelectedCount(n)}
            className={n === selectedCount ? 'selected love' : ''}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  </div>
)}

          {tab === 'tirage' && (
  <div className="tirage-tab">
    <h2>Combien de cartes voulez-vous tirer ?</h2>
              <div className="count-buttons">
                {[1, 2, 3, 4, 5].map((n) => (
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
          )}

          <div className="cards-section">
            {drawnCards.length === 0 ? (
              <div className="card placeholder-card">
                <div className="card-inner">
                  <div className="card-front">
                    <p>Vos cartes apparaîtront ici...</p>
                  </div>
                </div>
              </div>
            ) : (
              drawnCards.map((card, index) => (
                <TarotCard
                  key={index}
                  card={card}
                  flipped={flipped[index]}
                  onClick={() => toggleFlip(index)}
                />
              ))
            )}
          </div>

          {tab === 'amour' && drawnCards.length > 0 && (
            <div className="love-summary">
              <h3>💗 Résumé du tirage amoureux</h3>
              <div className="love-summary-grid">
                {drawnCards.map((card, idx) => (
                  <div key={idx} className="love-summary-card">
                    <h4>{card.name}</h4>
                    <p>{getLoveNarrative(card.name, loveName)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {drawnCards.length > 0 && (
            <div className="reveal-status">
              {`${flipped.filter(f => f).length}/${drawnCards.length} cartes révélées`}
            </div>
          )}

        {astro && (
  <div className="astro-display">
    <h4>Contexte astrologique</h4>
    <p>{astro.lune} en {astro.signe} ({astro.element})</p>
    <p>{astro.message}</p>
    <p><em>
      {astro.element === 'Feu' && "Une journée idéale pour agir, prendre des initiatives et oser sortir de ta zone de confort."}
      {astro.element === 'Terre' && "Reste ancré. Avance avec méthode et patience, surtout pour concrétiser tes projets."}
      {astro.element === 'Air' && "Ouvre-toi au dialogue, à l’échange d’idées. Ta clarté mentale peut inspirer."}
      {astro.element === 'Eau' && "Accueille tes émotions, développe ton intuition, prends soin de ton monde intérieur."}
    </em></p>
  </div>
)}


          <div className="button-group">
            <button className={`reset-button ${tab === 'amour' ? 'love' : ''}`} onClick={resetDraw}>Réinitialiser</button>
            <button
              className={`draw-button ${tab === 'amour' ? 'love' : ''}`}
              onClick={tab === 'tirage' ? drawCards : drawLoveCards}
            >
              Tirez les cartes
            </button>
          </div>
        </>
      )}

      {tab === 'haters' && (
        <>
         <div className="haters-intro">
  <h2>Qui est ton Hater du moment ?</h2>
  <p>
    Un ex relou qui stalke, une peur sous le lit, un blocage que tu traînes en secret…<br />
    Tire une carte, révèle ton poison, et choisis ton antidote.<br />
    <strong>Brise la chaîne. Libère-toi. Ta clarté est ta magie.</strong>
  </p>
</div>
          <div className="cards-section">
            {drawnCards.length === 0 ? (
              <div className="card placeholder-card">
                <div className="card-inner">
                  <div className="card-front">
                    <p>Votre carte apparaîtra ici...</p>
                  </div>
                </div>
              </div>
            ) : (
              drawnCards.map((card, index) => (
                <TarotCard
                  key={index}
                  card={card}
                  flipped={flipped[index]}
                  onClick={() => toggleFlip(index)}
                />
              ))
            )}
          </div>
        {drawnCards.length > 0 && (
  <div className="hater-summary">
    <h3>😈 Conseil de protection</h3>
    <div className="hater-summary-card">
      <p>{drawnCards[0].protection}</p>
    </div>
  </div>
)}

          <div className="button-group">
            <button className="reset-button hater" onClick={resetDraw}>Réinitialiser</button>
            <button className="draw-button hater" onClick={drawHaterCard}>Tirez votre carte Hater</button>
          </div>
        </>
      )}

      {tab === 'historique' && (
        <div className="history-section">
          {history.length === 0 ? (
            <p>Aucun tirage encore enregistré.</p>
          ) : (
            history.map((entry, i) => (
              <div key={i} className="history-entry">
                <h3>{entry.date}</h3>
                <div className="cards-section">
                  {entry.cards.map((card, idx) => (
                    <TarotCard key={idx} card={card} flipped={true} onClick={() => { }} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TarotGameV2;

