import React, { useState } from 'react';

const symbols = ['🌿', '🌳', '⚡', '😈', '☀️', '🧝‍♂️'];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateGrid() {
  return Array.from({ length: 5 }, () =>
    Array.from({ length: 6 }, () => getRandomSymbol())
  );
}

function SlotMachine() {
  const [grid, setGrid] = useState(generateGrid());
  const [balance, setBalance] = useState(100);
  const [bonusSpins, setBonusSpins] = useState(0);
  const [message, setMessage] = useState('');

  const playSound = () => {
    const audio = new Audio('/spin.mp3');
    audio.play();
  };

  const countBaldrs = (grid) => {
    return grid.flat().filter(symbol => symbol === '🧝‍♂️').length;
  };

  const handleSpin = () => {
    if (balance <= 0) {
      setMessage('💸 Geen saldo meer!');
      return;
    }

    playSound();
    const newGrid = generateGrid();
    setGrid(newGrid);

    let winAmount = 0;
    const baldrCount = countBaldrs(newGrid);

    if (baldrCount >= 3) {
      setBonusSpins(10);
      setMessage('🎉 Bonusspel geactiveerd!');
    } else {
      setMessage('');
    }

    if (bonusSpins > 0) {
      winAmount = Math.floor(Math.random() * 10) + 5;
      setBonusSpins(bonusSpins - 1);
    } else {
      winAmount = Math.random() < 0.3 ? Math.floor(Math.random() * 5) + 1 : 0;
    }

    setBalance(balance - 1 + winAmount);
  };

  return (
    <div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((symbol, colIndex) => (
              <div key={colIndex} className="cell flash">{symbol}</div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSpin}>Spin (€1)</button>
      <p>💰 Saldo: €{balance}</p>
      {bonusSpins > 0 && <p>🔮 Bonus spins over: {bonusSpins}</p>}
      <p>{message}</p>
    </div>
  );
}

export default SlotMachine;
