// VERSION AVEC CHOIX DE 1 OU 3 CARTES POUR LE TIRAGE AMOUREUX
import React, { useState, useEffect } from 'react';
import './TarotGameV2.css';
import astroData from './data/astroData_2025.json';


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
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick} aria-label={`Carte de tarot : ${card.name}`}>
      <div className="card-inner">
        <div className="card-front">
          <img src={`/Cartes/${card.image}`} alt={card.name} loading="lazy" />
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
  const [tab, setTab] = useState('tirage');
  const [history, setHistory] = useState([]);
  const [loveName, setLoveName] = useState('');
 useEffect(() => {
  if (tab === 'amour' && selectedCount !== 1 && selectedCount !== 3) {
    setSelectedCount(3);
  }
}, [tab, selectedCount]);


  const today = new Date().toISOString().split('T')[0];
  const astro = astroData[today];


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


    const newHistory = [
      ...history,
      { date: new Date().toLocaleString(), cards: selected },
    ];
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


  const getStats = () => {
    const allDraws = history.flatMap(entry => entry.cards.map(card => card.name));
    const stats = allDraws.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  };


  return (
    <div className="tarot-app">
      <div className="header">
        <h1>Tarot</h1>
        <div className="tabs">
          <button className={tab === 'tirage' ? 'active' : ''} onClick={() => { setTab('tirage'); setDrawnCards([]); setFlipped([]); }}>Tirage</button>
          <button className={tab === 'amour' ? 'active' : ''} onClick={() => { setTab('amour'); setDrawnCards([]); setFlipped([]); }}>Tirage Amoureux</button>
          <button className={tab === 'historique' ? 'active' : ''} onClick={() => setTab('historique')}>Historique</button>
          <button className={tab === 'stats' ? 'active' : ''} onClick={() => setTab('stats')}>Statistiques</button>
        </div>
      </div>


      {(tab === 'tirage' || tab === 'amour') && (
        <>
          {tab === 'amour' && (
            <>
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
            </>
          )}


          {tab === 'tirage' && (
            <div className="selection-section">
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


          {drawnCards.length > 0 && (
            <div className="reveal-status">
              {`${flipped.filter(f => f).length}/${drawnCards.length} cartes révélées`}
            </div>
          )}

{astro && tab === 'tirage' && (
  <div className="astro-display">
    <h4>Contexte astrologique</h4>
    <p>{astro.lune} en {astro.signe} ({astro.element})</p>
    <p>— {astro.message}</p>

    {/* 💡 Interprétation personnalisée */}
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
                    <TarotCard key={idx} card={card} flipped={true} onClick={() => {}} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}


      {tab === 'stats' && (
        <div className="stats-section">
          <h3>Cartes les plus souvent tirées</h3>
          <ul>
            {getStats().map(([name, count], i) => (
              <li key={i}><strong>{name}</strong>: {count} fois</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


export default TarotGameV2;
