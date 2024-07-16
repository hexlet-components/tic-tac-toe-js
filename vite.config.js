import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/tic-tac-toe-js/',
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/main.ts'),
      name: 'TicTacToe',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
})
