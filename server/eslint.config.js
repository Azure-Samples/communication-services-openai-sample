// @ts-check

const globals = require('globals');
const tseslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const header = require('eslint-plugin-header');

header.rules.header.meta.schema = false;

module.exports = tseslint.config(
  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**', 'webpack.config.js']
  },

  // Base configuration for all TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      header
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow unused vars for routing functions like (req, res, next)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      eqeqeq: 'warn',
      'header/header': ['error', 'line', ' Copyright (c) Microsoft Corporation.\n Licensed under the MIT license.']
    }
  },

  // Override for test files
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx', '**/mocks/*'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },

  // Override for envHelper.ts
  {
    files: ['envHelper.ts'],
    rules: {
      // Allow requiring the appsettings.json
      '@typescript-eslint/no-var-requires': 'off'
    }
  },

  // Prettier configuration - must be last
  eslintPluginPrettierRecommended
);
