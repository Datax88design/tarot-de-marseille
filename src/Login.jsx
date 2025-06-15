import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'tarot2025') {
      onLogin(); // autorise l'accès
    } else {
      setError('Mot de passe incorrect.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>🔒 Accès au jeu de tarot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrer</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
