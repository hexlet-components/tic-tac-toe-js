import { test, expect } from 'vitest'
import { TicTacToe } from '../index.ts'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

const getCellByNumber = (n: number) => {
  const cellElement = document.querySelectorAll<HTMLDivElement>('.board__cell')[n - 1]
  return cellElement
}

test('check game', async () => {
  const user = userEvent.setup()

  const game = new TicTacToe(document.body)
  game.start()
  const input1 = screen.getByLabelText<HTMLInputElement>('Player 1')
  const input2 = screen.getByLabelText<HTMLInputElement>('Player 2')
  await user.type(input1, 'user 1')
  await user.type(input2, 'user 2')

  const submitButton = screen.getByText('Start Game')
  await user.click(submitButton)

  expect(document.body).toHaveTextContent('user 1, you are up!')

  await user.click(getCellByNumber(5))
  expect(document.body).toHaveTextContent('user 2, you are up!')

  await user.click(getCellByNumber(4))
  expect(document.body).toHaveTextContent('user 1, you are up!')

  await user.click(getCellByNumber(2))
  await user.click(getCellByNumber(1))
  await user.click(getCellByNumber(8))

  expect(document.body).toHaveTextContent('Congratulations user 1')
  expect(document.body).toHaveTextContent('You are our winner!')

  // debug()
})
