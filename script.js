// script.js
let timerInterval;
let totalSeconds = 0;
const scores = { 1: 0, 2: 0 };
const fouls = { 1: 0, 2: 0 };

function startTimer() {
  stopTimer(); 
  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimerDisplay();
    } else {
      stopTimer();
      
    }
  }, 1000);
}

function showWinner() {
  // Verifica o vencedor
  let winner = scores[1] > scores[2] ? document.getElementById('athlete1-name').value : document.getElementById('athlete2-name').value;
  document.getElementById('winner-name').textContent = `${winner} é o vencedor!`;

  // Oculta a tela atual
  document.querySelector('.container').style.display = 'none';

  // Mostra a tela do vencedor
  document.getElementById('winner-screen').style.display = 'flex';
}


function stopTimer() {
  clearInterval(timerInterval);
}

function setTimer() {
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  totalSeconds = minutes * 60 + seconds;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

function updateScore(athlete, points) {
  scores[athlete] += points;
  //Se cada falta diminuir 1 ponto deverá ter esse código abaixo
  //scores[athlete] -= points;
  document.getElementById(`score${athlete}`).textContent = scores[athlete];
}

function updateFouls(athlete, foulCount) {
  fouls[athlete] += foulCount;
  if (fouls[athlete] < 0) fouls[athlete] = 0;
  document.getElementById(`fouls${athlete}`).textContent = `Faltas: ${fouls[athlete]}`;
}

function resetAll() {
  stopTimer();
  totalSeconds = 0;
  updateTimerDisplay();
  scores[1] = scores[2] = fouls[1] = fouls[2] = 0;
  document.getElementById('score1').textContent = '0';
  document.getElementById('score2').textContent = '0';
  document.getElementById('fouls1').textContent = 'Faltas: 0';
  document.getElementById('fouls2').textContent = 'Faltas: 0';
  
  // Volta para a tela inicial
  document.querySelector('.container').style.display = 'block';
  document.getElementById('winner-screen').style.display = 'none';
}

function showWinner() {
  const athlete1Name = document.getElementById("athlete1-name").value;
  const athlete2Name = document.getElementById("athlete2-name").value;

  let resultMessage;

  if (scores[1] > scores[2]) {
    resultMessage = `O vencedor é: ${athlete1Name}`;
  } else if (scores[2] > scores[1]) {
    resultMessage = `O vencedor é: ${athlete2Name}`;
  } else {
    resultMessage = "Empate!";
  }

  const winnerDisplay = document.getElementById("winner-display");
  const winnerText = document.getElementById("winner-text");
  winnerText.textContent = resultMessage;
  
  winnerDisplay.classList.add("visible");
  setTimeout(() => winnerDisplay.classList.remove("visible"), 5000);
}
