const path = require('node:path');

const buildEslintCommand = filenames =>
  `eslint --fix --quiet ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' ')}`;

module.exports = {
  '**/*.(ts|tsx)': () => 'tsc -p ./tsconfig.json --noEmit',

  '**/*.(ts|tsx|js)': ['prettier --write', buildEslintCommand],

  '**/*.{json,css,scss,md}': ['prettier --write'],
};
