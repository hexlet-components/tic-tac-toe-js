import './style.css'
import TicTacToe from './TicTacToe.ts'

const element = document.getElementById('tic-tac-toe')
if (element) {
  const game = new TicTacToe(element)
  game.start()
}
