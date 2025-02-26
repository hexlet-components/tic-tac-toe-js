import { defineConfig } from 'vite'

export default defineConfig({
  base: '/tic-tac-toe-js/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
  },
})
