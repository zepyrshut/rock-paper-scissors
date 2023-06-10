class Game {
    constructor() {
        this.player = new Player();
        this.computer = new Computer();
        this.rounds = 0;
    }

    playRound = (e) => {

        if (this.rounds === 10) {
            const hiddenRestartButton = document.querySelector('#hiddenRestartButton')
            hiddenRestartButton.classList.remove('hidden')
            this.restartGame()
            return
        }

        this.computer.choice = this.computer.generateComputerChoice()
        this.player.choice = e.target.id

        this.checkChoices()
        this.updatePanels()
        if (this.rounds === 0) {
            this.showHiddenElements();
        }

        this.rounds++
    }

    checkChoices = () => {
        if (this.player.choice === 'rock' && this.computer.choice === 'paper') {
            this.computer.score++
        }
        if (this.player.choice === 'rock' && this.computer.choice === 'scissors') {
            this.player.score++
        }
        if (this.player.choice === 'paper' && this.computer.choice === 'rock') {
            this.player.score++
        }
        if (this.player.choice === 'paper' && this.computer.choice === 'scissors') {
            this.computer.score++
        }
        if (this.player.choice === 'scissors' && this.computer.choice === 'rock') {
            this.computer.score++
        }
        if (this.player.choice === 'scissors' && this.computer.choice === 'paper') {
            this.player.score++
        }
    }

    showHiddenElements = () => {
        const hiddenPanel = document.querySelector('#hiddenPanel')
        hiddenPanel.classList.remove('hidden')
    }

    updatePanels = () => {
        this.player.writePlayerPanel()
        this.computer.writeComputerPanel()
    }

    restartGame = () => {
        const restartButton = document.querySelector('#restartGame')
        restartButton.addEventListener('click', () => {
            location.reload()
        })
    }
}

class Player {
    constructor() {
        this.score = 0;
        this.choice = null;
    }

    writePlayerPanel = () => {
        const playerChoice = document.querySelector('#yourChoice')
        playerChoice.textContent = this.choice

        const playerScore = document.getElementById('playerScore')
        playerScore.innerText = this.score.toString()
    }
}

class Computer {
    constructor() {
        this.score = 0;
        this.choice = null;
    }

    generateComputerChoice = () => {
        let selectedValue = ''
        let randomNumber = Math.floor(Math.random() * 3)
        switch (randomNumber) {
            case 0:
                selectedValue = 'rock'
                break
            case 1:
                selectedValue = 'paper'
                break
            default:
                selectedValue = 'scissors'
                break
        }

        return selectedValue
    }

    writeComputerPanel = () => {
        const computerChoice = document.querySelector('#computerChoice')
        computerChoice.textContent = this.choice

        const computerScore = document.getElementById('computerScore')
        computerScore.innerText = this.score.toString()
    }
}

const game = new Game();
const choiceButtons = document.querySelectorAll('.choices')
choiceButtons.forEach(button => button.addEventListener('click', game.playRound))
