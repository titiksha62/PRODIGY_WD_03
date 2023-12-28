let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const board = document.getElementById('board');
const message = document.getElementById('message');

// Create cells dynamically
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => cellClick(i));
    board.appendChild(cell);
}

function cellClick(index) {
    // Check if the cell is already filled or the game is over
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateCell(index);
        
        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            message.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function updateCell(index) {
    const cell = document.getElementsByClassName('cell')[index];
    cell.textContent = currentPlayer;
    cell.style.backgroundColor = '#fff'; // Set the background color to white
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach((cell, index) => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });

    message.textContent = "Player X's Turn";
}
