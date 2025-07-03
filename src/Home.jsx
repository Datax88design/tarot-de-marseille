import React from 'react';
import './Home.css';

export default function Home({ setTab }) {
  return (
    <div className="home">
      {/* Remplace le titre principal par ton résumé */}
           <p className="home-intro">
<p className="home-intro">
Poison & Antidote est ton tirage de Tarot moderne pour explorer tes blocages,
tes peurs et tes désirs. Découvre tes « Haters », fais un tirage libre,
analyse tes relations amoureuses et choisis ton antidote.
</p>


      </p>

      <h2>Choisis ton tirage </h2>

      <div className="home-cards">
        <div className="home-card" onClick={() => setTab('haters')}>
          <div className="icon">😈</div>
          <h3>Haters</h3>
          <p>Tire une carte pour démasquer ton « Hater »</p>
        </div>

        <div className="home-card" onClick={() => setTab('amour')}>
          <div className="icon">❤️</div>
          <h3>Amour</h3>
          <p>Explore tes blocages amoureux</p>
        </div>

        <div className="home-card" onClick={() => setTab('tirage')}>
          <div className="icon">🃏</div>
          <h3>Tirage</h3>
          <p>Fais un tirage libre</p>
        </div>

        <div className="home-card" onClick={() => setTab('historique')}>
          <div className="icon">📜</div>
          <h3>Historique</h3>
          <p>Revois tes anciens tirages</p>
        </div>
      </div>
    </div>
  );
}
