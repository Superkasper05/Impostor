const setupDiv = document.getElementById('setup');
const gameDiv = document.getElementById('game');
const promptP = document.getElementById('prompt');
const revealBtn = document.getElementById('reveal');
const nextBtn = document.getElementById('next');

document.getElementById('start').addEventListener('click', () => {
  const numPlayers = parseInt(document.getElementById('players').value, 10);
  const numImpostors = parseInt(document.getElementById('impostors').value, 10);
  const word = document.getElementById('word').value.trim();
  if (!word) { alert('Skriv inn et hemmelig ord.'); return; }
  startGame(numPlayers, numImpostors, word);
});

let roles = [];
let currentPlayer = 0;
let secretWord = '';

function startGame(numPlayers, numImpostors, word) {
  roles = Array(numPlayers).fill('civilian');
  for (let i = 0; i < numImpostors; i++) {
    let idx;
    do { idx = Math.floor(Math.random() * numPlayers); } while (roles[idx] === 'impostor');
    roles[idx] = 'impostor';
  }
  secretWord = word;
  currentPlayer = 0;
  setupDiv.classList.add('hidden');
  gameDiv.classList.remove('hidden');
  promptP.textContent = `Spiller 1: Klikk for å se din rolle.`;
}

revealBtn.addEventListener('click', () => {
  const role = roles[currentPlayer];
  if (role === 'impostor') {
    promptP.textContent = 'Du er impostoren!';
  } else {
    promptP.textContent = `Hemmelig ord: ${secretWord}`;
  }
  revealBtn.classList.add('hidden');
  nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
  currentPlayer++;
  if (currentPlayer >= roles.length) {
    promptP.textContent = 'Alle rollene er utdelt. Diskuter hvem som er impostor!';
    nextBtn.classList.add('hidden');
  } else {
    promptP.textContent = `Spiller ${currentPlayer + 1}: Klikk for å se din rolle.`;
    revealBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
  }
});
