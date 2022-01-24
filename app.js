let scores, roundScore, activePlayer, gamePlaying;

init();

// ROLL bouton
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Nombre aléatoire
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Afficher le résultat 
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "images/dice-" + dice + ".png";

    // 3. Mettre à jour le score du tour si le numéro obtenu n'ést pas un 1 
    if (dice !== 1) {
      // Ajouter le score
      roundScore += dice;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Joueur suivant 
      nextPlayer();
    }
  }
});

// HOLD bouton
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Ajouter le score actuel au score global 
    scores[activePlayer] += roundScore;

    // Mettre à jour l'interface utilisateur 
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Vérifier si le joueur a gagné le jeu 
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.dispaly = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      gamePlaying = false;
    } else {
      // Joueur suivant 
      nextPlayer();
    }
  }
});

function nextPlayer() {
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

// NEW-GAME bouton 
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  // Réinitialiser le score 
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  // Réinitialiser tous les scores 
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // Réinitialiser les noms des joueurs 
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  // Supprimer des classes des panneaux 
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}


