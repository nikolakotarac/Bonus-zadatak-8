const rulesBtn = document.querySelector('.rules');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-btn');
const closeModalMb = document.querySelector('.closeMb-btn');
const modal = document.querySelector('.modal');
const main = document.querySelector('.main')
const gameButtons = Array.from(document.querySelector('.main').children)
const gameScore = document.querySelector('.score')
const resultInfo = document.querySelector('.result')
const gameResult = document.querySelector('.status')
const playerBtn = document.querySelector('.your-pick')
const houseBtn = document.querySelector('.house-pick')
const resultBox = document.querySelector('.result-info')
const playAgain = document.querySelector('.play-again')
    
rulesBtn.addEventListener('click', function(){
    overlay.style.display = "block";
    modal.style.display = "block";
})
closeModal.addEventListener('click', function(){
    overlay.style.display = "none";
})
overlay.addEventListener('click', function(e) {
    if(e.target === overlay) {
       overlay.style.display = "none";
    }
})

closeModalMb.addEventListener('click', function(){
    overlay.style.display = "none";
    modal.style.display = "none";
})
let houseSelection, playerSelection;
let result = false;

let score = localStorage.getItem('score') ? (JSON.parse(localStorage.getItem('score'))) : 0;
gameScore.textContent = score;

// play the round when a game button is clicked
for (let elem of gameButtons) {
    elem.addEventListener('click', playRound);
}

// house selection
function computerPlay() {
    let randomSelection = Math.floor(Math.random() * gameButtons.length);
    houseSelection = gameButtons[randomSelection].className;
    return houseSelection;
}

function playRound(event) {
    playerSelection = event.currentTarget.className;
    houseSelection = computerPlay();
    getResult(playerSelection, houseSelection);
    renderResultScreen();
}

function getResult(playerSelection, houseSelection) {
    if (playerSelection === houseSelection) {
        result = undefined;
    } else if (playerSelection === 'btn-paper' && houseSelection === 'btn-rock') {
        result = true;
    } else if (playerSelection === 'btn-rock' && houseSelection === 'btn-scissors') {
        result = true;
    } else if (playerSelection === 'btn-scissors' && houseSelection === 'btn-paper') {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function printResult() {
    switch(result) {
        case undefined:
            gameResult.textContent = `IT'S A DRAW`;
            break;
        case true:
            playerBtn.classList.add('is-winner');
            gameResult.textContent = 'YOU WIN';
            score++;
            gameScore.textContent = score;
            break;
        case false:
            gameResult.textContent = 'YOU LOSE';
            houseBtn.classList.add('is-winner');
            score--;
            gameScore.textContent = score;
            break;
    }

    localStorage.setItem('score', JSON.stringify(score));
}

//  hide game screen and show result screen
function renderResultScreen() {
    main.style.display = 'none';
    resultInfo.style.display = 'grid';
    houseBtn.style.display = 'none'; 
    resultBox.style.display = 'none'; 
    playerBtn.classList.add(`${playerSelection}`);

    setTimeout(function () {
        houseBtn.classList.add(`${houseSelection}`);
        houseBtn.style.display = 'flex';
        setTimeout(function () {
            printResult();
            resultBox.style.display = 'flex';
            resultBox.style.gridTemplateArea = 'resultBox'
            
        }, 100)
    }, 100)
}
playAgain.addEventListener('click', function(){
    main.style.display = '';
    resultInfo.style.display = '';
    resultInfo.style.width = '';
    resultInfo.style.gridTemplateColumns = '';
    playerBtn.classList.remove(`${playerSelection}`);
    houseBtn.classList.remove(`${houseSelection}`);
    playerBtn.classList.remove('is-winner');
    houseBtn.classList.remove('is-winner');
})
