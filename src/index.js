import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Contador from "./components/Contador.jsx";
import TigrinhoGame from './components/TigrinhoGames.jsx';

function App() {
  const [appSelecionado, setAppSelecionado] = useState('contador');

  return (
    <div>
      <button onClick={() => setAppSelecionado('contador')}>Contador</button>
      <button onClick={() => setAppSelecionado('TigrinhoGame')}>TigrinhoGame</button>

      {appSelecionado === 'contador' && <Contador />}
      {appSelecionado === 'TigrinhoGame' && <TigrinhoGame />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
