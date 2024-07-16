// import { includeIgnoreFile } from '@eslint/compat'
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
// import path from 'path'

// const gitignorePath = path.resolve(import.meta.dirname, '.gitignore')

export default [
  // includeIgnoreFile(gitignorePath),
  { ignores: ['dist'] },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs['recommended-flat'],
]
