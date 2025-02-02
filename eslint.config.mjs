import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default antfu(
  {
    react: true,
    typescript: true,
    lessOpinionated: true,
    isInEditor: false,
    stylistic: {
      semi: true,
      indent: 2,
      quotes: 'single',
    },
    formatters: {
      prettierOptions: {
        semi: true,
        singleQuote: true,
        printWidth: 80,

      },
      css: true,
    },
    ignores: ['next-env.d.ts'],
  },
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
  {
    rules: {
      'import/order': 'off',
      'sort-imports': 'off',
      'style/brace-style': ['error', '1tbs'],
      'react/prefer-destructuring-assignment': 'off',
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-array-index-key': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-new-object-as-default-prop': 'off',
      'react/jsx-no-array-index-key': 'off',
      'react/no-unstable-default-props': 'off',
      'regexp/no-useless-escape': 'off',
      'regexp/no-dupe-characters-character-class': 'off',
      'regexp/no-contradiction-with-assertion': 'off',
      'regexp/no-obscure-range': 'off',
      'regexp/prefer-w': 'off',
    },
  },
);
