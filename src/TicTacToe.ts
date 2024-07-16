import html from './html'

// TODO: use xState

class TicTacToe {
  rootElement: HTMLElement
  gameBoard = ['', '', '', '', '', '', '', '', '']
  turn = 0 // Keeps track if X or O player's turn
  winner = false
  playerX = { name: '' }
  playerY = { name: '' }

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement
  }

  handleAddPlayers(event: SubmitEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const name1 = String(formData.get('player1'))
    const name2 = String(formData.get('player2'))
    if (name1 == '' || name2 == '') {
      alert('You Must Enter a Name for Each Field')
      return
    }

    this.playerX.name = name1
    this.playerY.name = name2

    const playerFormContainer = document.querySelector<HTMLDivElement>('.enter-players')
    const boardMain = document.querySelector<HTMLDivElement>('.board__main')
    playerFormContainer!.classList.add('hide-container')
    boardMain!.classList.remove('hide-container')

    this.buildBoard()
    this.onResize()
  }

  buildBoard() {
    const resetContainer = document.querySelector<HTMLDivElement>('.reset')
    resetContainer!.classList.remove('reset--hidden')

    this.addCellClickListener()
    this.changeBoardHeaderNames()
  }

  handleResetBoard() {
    console.log('resetting')

    this.gameBoard = ['', '', '', '', '', '', '', '', '']

    const cellToAddToken = this.rootElement.querySelectorAll<HTMLDivElement>('.letter')
    cellToAddToken.forEach((square: HTMLDivElement): void => {
      square.textContent = ''
      square.parentElement!.classList.remove('board__cell--winner')
    })

    this.turn = 0
    this.winner = false

    const currentPlayerText = this.rootElement.querySelector<HTMLElement>('.board___player-turn')
    currentPlayerText!.innerHTML = `
    <span class="name--style">${this.playerX.name}</span>, you are up!
    <div class="u-r-winner"></div>
  `

    this.addCellClickListener()
  }

  addCellClickListener() {
    const cells = this.rootElement.querySelectorAll('.board__cell')
    cells.forEach((cell) => {
      cell.addEventListener('click', e => this.handleMakeMove(e))
    })
  }

  onResize() {
    const allCells = this.rootElement.querySelectorAll<HTMLDivElement>('.board__cell')
    const cellHeight = allCells[0].offsetWidth

    allCells.forEach((cell) => {
      cell.style.height = `${cellHeight}px`
    })
  }

  handleMakeMove(event: Event) {
    // @ts-expect-error fix it
    const currentCell = parseInt(event.currentTarget!.firstElementChild!.dataset.id)
    const cellToAddToken = document.querySelector<HTMLElement>(`[data-id='${currentCell}']`)

    if (!cellToAddToken) {
      return
    }

    if (cellToAddToken.innerHTML !== '') {
      console.log('This cell is already taken.')
      return
    }
    else {
      if (this.currentPlayer() === 'X') {
        cellToAddToken.textContent = this.currentPlayer()
        this.gameBoard[currentCell] = 'X'
      }
      else {
        cellToAddToken.textContent = this.currentPlayer()
        this.gameBoard[currentCell] = 'O'
      }
    }

    this.isWinner()

    this.turn++

    this.changeBoardHeaderNames()
  }

  checkIfTie() {
    if (this.turn > 7) {
      alert('game over a tie')
    }
  }

  isWinner() {
    const winningSequences = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    winningSequences.forEach((winningCombos) => {
      const cell1 = winningCombos[0]
      const cell2 = winningCombos[1]
      const cell3 = winningCombos[2]
      if (
        this.gameBoard[cell1] === this.currentPlayer()
        && this.gameBoard[cell2] === this.currentPlayer()
        && this.gameBoard[cell3] === this.currentPlayer()
      ) {
        const cells = document.querySelectorAll<HTMLDivElement>('.board__cell')

        cells.forEach((cell) => {
          // @ts-expect-error fix it
          const cellId = cell.firstElementChild!.dataset.id

          if (cellId == cell1 || cellId == cell2 || cellId == cell3) {
            cell.classList.add('board__cell--winner')
          }
        })

        const currentPlayerText = document.querySelector<HTMLElement>('.board___player-turn')
        if (this.currentPlayer() === 'X') {
          currentPlayerText!.innerHTML = `
          <div class="congratulations">Congratulations ${this.playerX.name}</div>
          <div class="u-r-winner">You are our winner!</div>
        `
          this.winner = true
          this.removeCellClickListener()
          return true
        }
        else {
          currentPlayerText!.innerHTML = `
          <div class="congratulations">Congratulations ${this.playerY.name}</div>
          <div class="u-r-winner">You are our winner!</div>
        `
          this.winner = true
          this.removeCellClickListener()
          return true
        }
      }
    })

    if (!this.winner) {
      this.checkIfTie()
    }

    return false
  }

  currentPlayer() {
    return this.turn % 2 === 0 ? 'X' : 'O'
  }

  changeBoardHeaderNames() {
    if (!this.winner) {
      const currentPlayerText = document.querySelector('.board___player-turn')
      if (this.currentPlayer() === 'X') {
        currentPlayerText!.innerHTML = `
        <span class="name--style">${this.playerX.name}</span>, you are up!
        <div class="u-r-winner"></div>
      `
      }
      else {
        currentPlayerText!.innerHTML = `
        <span class="name--style">${this.playerY.name}</span>, you are up!
        <div class="u-r-winner"></div>
      `
      }
    }
  }

  removeCellClickListener() {
    const allCells = this.rootElement.querySelectorAll('.board__cell')
    allCells.forEach((cell) => {
      cell.removeEventListener('click', e => this.handleMakeMove(e))
    })
  }

  start() {
    this.rootElement.innerHTML = html()
    const addPlayerForm = this.rootElement.querySelector<HTMLFormElement>('.player-form')
    addPlayerForm!.addEventListener('submit', e => this.handleAddPlayers(e))
    //
    const replayButton = this.rootElement.querySelector<HTMLButtonElement>('.replay-btn')
    replayButton!.addEventListener('click', () => this.handleResetBoard())
  }
}

export default TicTacToe
