export default () => {
  return `<div>
    <h1 class="header">Tic Tac Toe</h1>
  </div>
  <div class="enter-players">

    <form class="player-form">
      <div class="player-container">
        <label for="player1">Player 1</label>
        <input type="text" placeholder="enter name" name="player1" id="player1" class="input-field" />
      </div>
      <div class="player-container">
        <label for="player2">Player 2</label>
        <input type="text" placeholder="enter name" name="player2" id="player2" class="input-field" />
      </div>

      <input type="submit" class="submit-btn" value="Start Game" />
    </form>
  </div>

  <div class="board__main hide-container">
    <div class="board___player-turn"></div>

    <div class="board__container">
      <div class="board__cell">
        <div class="letter" data-id="0" data-testid="cell-1"></div>
      </div>
      <div class="board__cell">
        <div class="letter" data-id="1" data-testid="cell-2"></div>
      </div>
      <div class="board__cell">
        <div class="letter" data-id="2" data-testid="cell-3"></div>
      </div>

      <div class="board__cell">
        <div class="letter" data-id="3" data-testid="cell-4"></div>
      </div>
      <div class="board__cell">
        <div class="letter" data-id="4" data-testid="cell-5"></div>
      </div>
      <div class="board__cell">
        <div class="letter" data-id="5" data-testid="cell-6"></div>
      </div>

      <div class="board__cell">
        <div class="letter" data-id="6" data-testid="cell-7"></div>
      </div>
      <div class="board__cell">
        <div class="letter" data-id="7" data-testid="cell-8"></div>
      </div>
      <div class="board__cell">
        <div class="letter" data-id="8" data-testid="cell-9"></div>
      </div>
    </div>
  </div>

  <div class="reset reset--hidden">
    <div class="reset__text">
    </div>
    <button class="replay-btn" value="replay">
      <span class="clear-board">Clear Board</span>
    </button>
  </div>`
}
