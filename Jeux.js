// script.js

document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const messageDisplay = document.getElementById("message");
    const restartButton = document.getElementById("restart");
    const playAgainButton = document.getElementById("play-again");

    let currentPlayer = "X"; // Le joueur humain
    let gameActive = true; // État du jeu
    let gameState = ["", "", "", "", "", "", "", "", ""]; // État du jeu

    // Conditions de victoire
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Gestion des clics sur les cellules
    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    // Fonction pour gérer le clic sur une cellule
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        // Vérifier si la cellule est déjà occupée ou si le jeu est terminé
        if (gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer === "O") {
            return; // Ne rien faire si c'est l'ordinateur qui joue
        }

        // Mettre à jour l'état du jeu et afficher le symbole du joueur courant
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        // Vérifier le résultat du jeu
        checkResult();

        // Si le jeu est toujours actif, faire jouer l'ordinateur
        if (gameActive) {
            currentPlayer = "O"; // Changer au joueur ordinateur
            computerMove();
        }
    }

    // Fonction pour que l'ordinateur fasse un mouvement logique
    function computerMove() {
        // Vérifier si l'ordinateur peut gagner
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === "O" && gameState[b] === "O" && gameState[c] === "") {
                makeMove(c);
                return;
            }
            if (gameState[a] === "O" && gameState[c] === "O" && gameState[b] === "") {
                makeMove(b);
                return;
            }
            if (gameState[b] === "O" && gameState[c] === "O" && gameState[a] === "") {
                makeMove(a);
                return;
            }
        }

        // Vérifier si le joueur peut gagner au prochain tour et bloquer
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] === "X" && gameState[b] === "X" && gameState[c] === "") {
                makeMove(c);
                return;
            }
            if (gameState[a] === "X" && gameState[c] === "X" && gameState[b] === "") {
                makeMove(b);
                return;
            }
            if (gameState[b] === "X" && gameState[c] === "X" && gameState[a] === "") {
                makeMove(a);
                return;
            }
        }

        // Si aucune victoire ou blocage, jouer un mouvement aléatoire
                // Si aucune victoire ou blocage, jouer un mouvement aléatoire
                let availableCells = gameState.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
                if (availableCells.length > 0) {
                    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
                    makeMove(randomIndex);
                }
            }
        
            // Fonction pour faire un mouvement
            function makeMove(index) {
                gameState[index] = currentPlayer;
                cells[index].textContent = currentPlayer;
                checkResult();
                currentPlayer = "X"; // Revenir au joueur humain
            }
        
            // Fonction pour vérifier le résultat du jeu
            function checkResult() {
                let roundWon = false;
        
                // Vérifier les conditions de victoire
                for (let i = 0; i < winningConditions.length; i++) {
                    const [a, b, c] = winningConditions[i];
                    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
                        continue;
                    }
                    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                        roundWon = true;
                        break; // Sortir de la boucle si un joueur a gagné
                    }
                }
        
                // Afficher le message de victoire
                if (roundWon) {
                    messageDisplay.textContent = `Le joueur ${currentPlayer} a gagné !`;
                    gameActive = false; // Désactiver le jeu
                    playAgainButton.classList.remove("hidden"); // Afficher le bouton "Rejouer"
                    return;
                }
        
                // Vérifier si le jeu est un match nul
                if (!gameState.includes("")) {
                    messageDisplay.textContent = "Match nul !";
                    gameActive = false; // Désactiver le jeu
                    playAgainButton.classList.remove("hidden"); // Afficher le bouton "Rejouer"
                }
            }
        
            // Gestion du bouton de redémarrage
            restartButton.addEventListener("click", restartGame);
        
            // Gestion du bouton "Rejouer"
            playAgainButton.addEventListener("click", restartGame);
        
            // Fonction pour redémarrer le jeu
            function restartGame() {
                currentPlayer = "X"; // Réinitialiser le joueur courant
                gameActive = true; // Réactiver le jeu
                gameState = ["", "", "", "", "", "", "", "", ""]; // Réinitialiser l'état du jeu
                messageDisplay.textContent = ""; // Effacer le message
                cells.forEach(cell => {
                    cell.textContent = ""; // Effacer le contenu des cellules
                });
                playAgainButton.classList.add("hidden"); // Cacher le bouton "Rejouer"
            }
        });