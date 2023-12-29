let boxes = document.querySelectorAll('.box');
let turnShow = document.getElementById('turnShow');
let player = ['X', 'O'];
let turn = 0;
let winMsg = document.querySelector('.winMsg');
let resetBtn = document.querySelector('#reset')

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const isWin = () => {
    for (const pattern of winPattern) {
        if ((boxes[pattern[0]].innerText === player[turn]) && (boxes[pattern[1]].innerText === player[turn]) && (boxes[pattern[2]].innerText === player[turn])) {
            for (let i = 0; i <= 2; i++) {
                boxes[pattern[i]].style.color = 'white';
            }
            return true;
        }
    }
    return false;
}

const isDraw = () => {
    for (const box of boxes) {
        if (box.innerText === '') {
            return false;
        }
    }
    return true
}

const printWinner = () => {
    winMsg.style.visibility = 'visible'
    winMsg.innerText = `${player[turn]} Win!`
}

function changeTurn() {
    if (turn === 0) {
        turn = 1;
        turnShow.innerText = `'O'`
    } else {
        turn = 0;
        turnShow.innerText = `'X'`
    }
}


boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        if (box.innerText === '') {
            box.innerText = player[turn];
            if (isWin()) {
                printWinner();
                for (const b of boxes) {
                    b.disabled = true;
                }
                resetBtn.innerText = 'New Game';
            } else if (isDraw()) {
                winMsg.innerText = `It's a Draw`;
                winMsg.style.visibility = 'visible';
                resetBtn.innerText = 'New Game';
            }
            changeTurn();
        }

    })
});

const restfun = () => {
    for (const box of boxes) {
        box.innerText = '';
        box.disabled = false;
        box.style.color = 'yellow';
    }
    resetBtn.innerText = 'Reset';
    turnShow.innerText = `'X'`;
    turn = 0;
    winMsg.style.visibility = 'hidden';
}

resetBtn.addEventListener('click', restfun)