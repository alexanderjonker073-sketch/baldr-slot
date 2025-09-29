const symbols = ['baldr', 'sun', 'moon', 'hammer', 'shield', 'wolf'];
const grid = document.getElementById('slot-grid');
const bonusMessage = document.getElementById('bonus-message');
const spinSound = new Audio('assets/sounds/spin.mp3');
const bonusSound = new Audio('assets/sounds/bonus.mp3');

function createGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        cell.className = 'slot-cell';
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const img = document.createElement('img');
        img.src = `assets/icons/${symbol}.png`;
        img.alt = symbol;
        cell.appendChild(img);
        grid.appendChild(cell);
    }
}

function checkBonus() {
    const images = document.querySelectorAll('.slot-cell img');
    let baldrCount = 0;
    images.forEach(img => {
        if (img.alt === 'baldr') baldrCount++;
    });
    if (baldrCount >= 3) {
        bonusMessage.classList.remove('hidden');
        bonusSound.play();
    } else {
        bonusMessage.classList.add('hidden');
    }
}

document.getElementById('spin-button').addEventListener('click', () => {
    spinSound.play();
    createGrid();
    checkBonus();
});

createGrid();
