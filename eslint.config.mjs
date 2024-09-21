import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import airbnb from 'eslint-config-airbnb' // Import Airbnb config

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        ignores: ['dist'],
    },
    {
        languageOptions: {
            ecmaVersion: 2021, // Align with ES2021
            globals: {
                ...globals.browser, // Include browser globals
                ...globals.jest, // Include Jest globals
            },
            parser: tsParser, // Use TypeScript parser
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    airbnb, // Extend Airbnb config
    {
        plugins: {
            react: pluginReact,
            '@typescript-eslint': tseslint,
            'react-hooks': reactHooks,
            prettier: prettierPlugin,
            import: importPlugin,
        },
        rules: {
            'no-use-before-define': 'off', // Disable the base rule
            '@typescript-eslint/no-use-before-define': ['error'], // Use TS version

            'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }], // Restrict JSX to .tsx
            'import/extensions': [
                'error',
                'ignorePackages',
                { ts: 'never', tsx: 'never' },
            ],

            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': ['error'],

            '@typescript-eslint/explicit-function-return-type': [
                'error',
                { allowExpressions: true },
            ],

            'max-len': [
                'warn',
                { code: 100, ignoreComments: true, ignoreUrls: true },
            ],

            'react-hooks/rules-of-hooks': 'error', // Ensure React Hooks rules
            'react-hooks/exhaustive-deps': 'warn',

            'import/prefer-default-export': 'off', // Custom rule
            'react/prop-types': 'off', // Disable prop-types for TypeScript
            'prettier/prettier': ['error', { endOfLine: 'auto' }], // Prettier integration
        },
        settings: {
            'import/resolver': {
                typescript: {}, // Resolve imports for TypeScript
            },
        },
    },
    prettierConfig, // Ensure Prettier config is applied last
]
