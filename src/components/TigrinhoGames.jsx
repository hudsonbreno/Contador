import React, { useState } from 'react';

const symbols = ['🐯', '🍒', '⭐', '🔔', '🍋'];

export default function TigrinhoGame() {
  const [slots, setSlots] = useState(['❓', '❓', '❓']);
  const [message, setMessage] = useState('');

  const spin = () => {
    const newSlots = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];
    setSlots(newSlots);

    if (newSlots.every((s) => s === newSlots[0])) {
      setMessage('🎉 Parabéns! Você ganhou! 🎉');
    } else {
      setMessage('😢 Tente novamente!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🎰 Jogo do Tigrinho (Versão Educativa)</h1>
      <div style={{ fontSize: '50px', margin: '20px' }}>
        {slots.map((s, index) => (
          <span key={index} style={{ margin: '0 10px' }}>{s}</span>
        ))}
      </div>
      <button onClick={spin} style={{ padding: '10px 20px', fontSize: '16px' }}>Girar</button>
      <h2>{message}</h2>
    </div>
  );
}