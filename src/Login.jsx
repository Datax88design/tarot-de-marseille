import { useState } from "react";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (password === "marseille2025") {
      onLogin(true);
    } else {
      alert("Mot de passe incorrect !");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 50, textAlign: "center" }}>
      <h2>🔒 Accès protégé</h2>
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: 10, fontSize: 16 }}
      />
      <br /><br />
      <button type="submit" style={{ padding: "10px 20px" }}>Se connecter</button>
    </form>
  );
}
