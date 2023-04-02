const boxes = document.querySelectorAll(".container");
const turnX = document.querySelector("#x");
const turnO = document.querySelector("#o");
const scorePlayer1 = document.querySelector("#score-1 p");
const scorePlayer2 = document.querySelector("#score-2 p");
const buttonMode = document.querySelectorAll(".button-mode");
const buttonReset = document.querySelector(".button-reset");
const msgText = document.querySelector(".message");
const msgContainer = document.querySelector("#container-message");

let gameMode = "mode-friend";

let win = false;

let player1 = 0;
let player2 = 0;

console.log(gameMode);
console.log(player2);
console.log(player1);

for (let box of boxes) {
    box.addEventListener("click", () => {
        
        if (!box.hasChildNodes()) {
        let turn;

            if (player1 === player2) {
                turn = turnX;
                player1++;
            } else {
                turn = turnO;
                player2++;
            }
        
          let copyOfTurn = turn.cloneNode(true);
          box.appendChild(copyOfTurn);
            
          verifyWin();
        }
    });
}

buttonReset.addEventListener("click", () => {
    resetScore();
})

function verifyWin() {
    const winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        const boxA = document.querySelector(`#square-${a}`);
        const boxB = document.querySelector(`#square-${b}`);
        const boxC = document.querySelector(`#square-${c}`);

        if (boxA.hasChildNodes() && boxB.hasChildNodes() && boxC.hasChildNodes()) {
            const boxAContent = boxA.firstElementChild.textContent;
            const boxBContent = boxB.firstElementChild.textContent;
            const boxCContent = boxC.firstElementChild.textContent;

            if (boxAContent === boxBContent && boxBContent === boxCContent) {
                console.log(`Combinação vencedora: ${combination.join(', ')} pontuou ${boxAContent}`);
                setWinner(boxAContent);
                highlightBox(boxA, boxB, boxC);
                win = true;
                break;
            } else if (player1 + player2 === 9) {
                setWinner();
            }
        }
    }
}


function resetScore() {
    scorePlayer1.innerHTML = "0";
    scorePlayer2.innerHTML = "0";

    player1 = 0;
    player2 = 0;
    let icons = document.querySelectorAll(".container > .icon")
    for (const icon of icons) {
        icon.parentNode.removeChild(icon);
    }
}

function highlightBox(box1, box2, box3) {
    box1.classList.add("highlight");
    box2.classList.add("highlight");
    box3.classList.add("highlight");

    setTimeout(() => {
        box1.classList.remove("highlight");
        box2.classList.remove("highlight");
        box3.classList.remove("highlight");
    }, 5000);
}

function setWinner(winner) {
    let message;

    if (winner === "X") {
        scorePlayer1.textContent = parseInt(scorePlayer1.textContent) + 1;
        message = 'O jogador 1(X) ganhou!';
    } else if (winner === "O") {
        scorePlayer2.textContent = parseInt(scorePlayer2.textContent) + 1;
        message = 'O jogador 2(O) ganhou!';
    } else {
        message = 'O jogo empatou!';
    }

    win = false;

    msgText.innerHTML = message;
    msgContainer.classList.remove("hidden");

    player1 = 0;
    player2 = 0;

    setTimeout(() => {
        msgContainer.classList.add("hidden");

        let icons = document.querySelectorAll(".container > .icon")
        for (const icon of icons) {
            icon.parentNode.removeChild(icon);
        }
    }, 5000);
}
