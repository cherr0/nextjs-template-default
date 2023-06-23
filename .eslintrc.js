module.exports = {
  ...require('@cherr0/fe-config-package/eslint/next'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module'
  }
}
