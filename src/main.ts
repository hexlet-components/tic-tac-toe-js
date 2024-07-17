import '../public/style.css'
import TicTacToe from './TicTacToe.js'

const element = document.getElementById('tic-tac-toe')
if (element) {
  const game = new TicTacToe(element)
  game.start()
}
