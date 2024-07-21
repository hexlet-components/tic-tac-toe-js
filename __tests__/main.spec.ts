import '@testing-library/jest-dom/vitest'
import { test, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import nock from 'nock'

import { TicTacToe } from '../src/index.js'

const url = 'https://wowow.ehu'
nock(url).persist().get(() => true).reply(200, {})

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

  await user.click(screen.getByTestId('cell-6'))
  expect(document.body).toHaveTextContent('user 2, you are up!')

  await user.click(screen.getByTestId('cell-5'))
  expect(document.body).toHaveTextContent('user 1, you are up!')

  await user.click(screen.getByTestId('cell-3'))
  await user.click(screen.getByTestId('cell-2'))
  await user.click(screen.getByTestId('cell-9'))

  expect(document.body).toHaveTextContent('Congratulations user 1')
  expect(document.body).toHaveTextContent('You are our winner!')

  // debug()
})

test('check game (async)', async () => {
  const user = userEvent.setup()

  const game = new TicTacToe(document.body, url)
  game.start()

  const input1 = screen.getByLabelText<HTMLInputElement>('Player 1')
  const input2 = screen.getByLabelText<HTMLInputElement>('Player 2')

  await user.type(input1, 'user 1')
  await user.type(input2, 'user 2')

  const submitButton = screen.getByText('Start Game')
  await user.click(submitButton)

  await waitFor(() => {
    expect(document.body).toHaveTextContent('user 1, you are up!')
  })

  await user.click(screen.getByTestId('cell-6'))
  expect(document.body).toHaveTextContent('user 2, you are up!')

  await user.click(screen.getByTestId('cell-5'))
  expect(document.body).toHaveTextContent('user 1, you are up!')

  await user.click(screen.getByTestId('cell-3'))
  await user.click(screen.getByTestId('cell-2'))
  await user.click(screen.getByTestId('cell-9'))

  await waitFor(() => {
    expect(document.body).toHaveTextContent('Congratulations user 1')
    expect(document.body).toHaveTextContent('You are our winner!')
  })

  // debug()
})
