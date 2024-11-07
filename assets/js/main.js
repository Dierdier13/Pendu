const playContainer = document.getElementById("play");
const replayContainer = document.getElementById("replay");
const gameContainer = document.getElementById("game");
const penduContainer = document.getElementById("pendu");
const imageContainer = document.getElementById("image");
const findWordContainer = document.getElementById("findWord");
const alphabetContainer = document.getElementById("alphabet");
const winnerContainer = document.getElementById("winner")
const words = ["salut", "bonjours", "patate", "tartiflette", "saperlipopette", "halucinant"];
let addWord = words[random(0, words.length - 1)];
let hiddenword = "";
let wrongAttempts = 0; // Variable pour compter les mauvaises tentatives

// Références au modal et aux boutons de confirmation/annulation
const confirmationModal = document.getElementById("confirmationModal");
const modalOverlay = document.getElementById("modalOverlay");
const confirmReplay = document.getElementById("confirmReplay");
const cancelReplay = document.getElementById("cancelReplay");

// Boutton Play
let buttonPlay = document.createElement('div');
buttonPlay.textContent = "JOUER";
playContainer.appendChild(buttonPlay);
buttonPlay.addEventListener('click', function () {
    // Lancer la partie
    alphabetContainer.textContent = "";
    playContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    afficheFindWord(addWord);
    crateAlphabet();
})

// Boutton Replay
let buttonReplay = document.createElement('div');
buttonReplay.textContent = "REJOUER";
replayContainer.appendChild(buttonReplay);
buttonReplay.addEventListener('click', function () {
    // Relancer la partie 
    showModal();
    hiddenword = "";

})

// ////////////////////////////////  MODAL   ////////////////////////////////////

// Affiche le modal de confirmation
function showModal() {
    confirmationModal.style.display = "block";
    modalOverlay.style.display = "block";
}

// Cache le modal de confirmation
function hideModal() {
    confirmationModal.style.display = "none";
    modalOverlay.style.display = "none";
}

//  Confirme la 
confirmReplay.addEventListener("click", function () {
    playContainer.classList.remove('hidden');
    addWord = words[random(0, words.length - 1)];
    hideModal();
    gameContainer.classList.add('hidden');
    imageContainer.style.transform = "translate(" + 0 + "%, " + 0 + "%) rotate(" + 0 + "deg)";
    wrongAttempts = 0;
    winnerContainer.classList.add('hidden')
});

// Annule la suppression
cancelReplay.addEventListener("click", hideModal);
modalOverlay.addEventListener("click", hideModal);

////////////////////////////////////////////////////////////////////////////////////

function crateAlphabet() {
    let pangramme = "abcdefghijklmnopqrstuvwxyz"
    for (let i = 0; i < pangramme.length; i++) {
        let letter = document.createElement('button');
        letter.textContent = pangramme[i];
        alphabetContainer.appendChild(letter);
        letter.addEventListener('click', function () {
            checkLetter(pangramme[i], letter);
        })
    }
}

function afficheFindWord(addWord) {
    for (let i = 0; i < addWord.length; i++) {
        hiddenword += "_";
    }
    findWordContainer.querySelector('p').textContent = hiddenword;
}

function checkLetter(letter, letterButton) {
    let result = "";
    let isCorrect = false;
    for (let i = 0; i < addWord.length; i++) {
        if (letter == addWord[i]) {
            result += letter;
            isCorrect = true;
        } else {
            result += hiddenword[i];
        }
    }
    // Mise à jour de hiddenword avec les lettres trouvées
    hiddenword = result;
    findWordContainer.querySelector('p').textContent = hiddenword;

    if (!isCorrect) {
        wrongAttempts++; // Incrémenter en cas d'erreur
        moveImage(); // Déplacer l'image en cas de mauvaise lettre
    }

    if (result == addWord) {
        winner()
    }

    if (wrongAttempts >= 10) {
        gameOver();
        return;
    }
    // Désactiver le bouton de la lettre sélectionnée
    letterButton.disabled = true;
    letterButton.classList.add("disabled");
}

function moveImage() {
    // Ajuster le déplacement en fonction du nombre de tentatives incorrectes
    const xMove = wrongAttempts * 20; // Déplacement horizontal
    const yMove = wrongAttempts * 10; // Déplacement vertical
    const rotation = wrongAttempts * 50; // Rotation cumulative, 50 degrés par erreur
    imageContainer.style.transform = "translate(" + xMove + "%, " + yMove + "%) rotate(" + rotation + "deg)";
}

function winner() {
    gameContainer.classList.add('hidden');
    winnerContainer.classList.remove('hidden')
}

// Fonction de fin de partie (après 10 erreurs)
function gameOver() {
    // Désactiver tous les boutons de l'alphabet
    const buttons = alphabetContainer.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);

    // Afficher le modal de confirmation pour rejouer ou quitter
    showModal();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
