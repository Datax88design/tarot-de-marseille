import React, { useState } from 'react';
import TarotGame from './TarotGame';
import Login from './Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <TarotGame />
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;
