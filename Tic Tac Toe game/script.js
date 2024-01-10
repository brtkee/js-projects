class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }
}

class Game {
    constructor() {
        this.currentPlayer = new Player("X");
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6] 
        ];
        this.gameOver = false;
        this.cells = document.querySelectorAll(".cell");
        this.cells.forEach(cell => cell.addEventListener('click', () => this.handleClick(cell)));
        this.playerText = document.querySelector("#player-text");
    }

    handleClick(cell) {
        const index = parseInt(cell.getAttribute('data-cell'))
        if(this.gameOver || this.board[index] !== '') return;

        this.board[index] = this.currentPlayer.symbol;
        cell.textContent = this.currentPlayer.symbol;

        if(this.checkDraw()){
            this.playerText.textContent = "No one won! draw!";
            this.gameOver = true;
            this.popUpModal("No one won! draw!")
            return;
        }

        if(this.checkWin()){
            this.playerText.textContent = `Player ${this.currentPlayer.symbol} won!`;
            this.gameOver = true;
            this.popUpModal(`Player ${this.currentPlayer.symbol} won!`)
            return;
        }

        this.switchPlayer()
    }

    checkDraw() {
        return this.board.every(cell => cell !== "")
    }

    checkWin() {
        return this.winningCombos.some(combo => {
            return combo.every(index => this.board[index] === this.currentPlayer.symbol);
        })
    }

    switchPlayer(){
        return this.currentPlayer = this.currentPlayer.symbol === "X"? new Player("O") : new Player("X")
    }

    // create a modal;
    popUpModal(message) {
        let date = new Date();
    
        const container = document.createElement('div'); 
        container.classList.add('popup-container'); 
        container.innerHTML = `
            <div class="background">
                <div class="pop-up-modal">
                    <h2>${date.toLocaleTimeString()}</h2>
                    <p>${message}</p>
                    <button id="play-again" onclick="location.reload()">Play again?</button>
                    <button id="remove"><ion-icon name="close-outline"></ion-icon></button>
                </div>
            </div>
        `;
    
        const modal = container.querySelector('.pop-up-modal'); 
    
        document.body.appendChild(container); 
        const delButton = modal.querySelector("#remove");
        delButton.addEventListener('click', () => {
            container.remove(); 
        });
    }
    
}

const game = new Game()
