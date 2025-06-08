import js from '@eslint/js';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/restrict-template-expressions': 'off',
      'import/extensions': ['error', 'ignorePackages'],
      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-amd': 'error',
      'import/no-commonjs': 'error',
      'import/no-duplicates': 'warn',
      'import/no-empty-named-blocks': 'warn',
      'import/no-extraneous-dependencies': [
        'warn',
        {
          devDependencies: ['**/*.spec.ts', '*.config.*'],
          includeInternal: true,
        },
      ],
      'import/no-import-module-exports': 'warn',
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'off',
      'import/no-nodejs-modules': 'error',
      'import/no-unused-modules': 'warn',
      'import/order': 'warn',
      'no-console': 'warn',
      'no-param-reassign': 'warn',
      'no-plusplus': 'error',
      'no-throw-literal': 'error',
      'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }],
      'prettier/prettier': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
);
