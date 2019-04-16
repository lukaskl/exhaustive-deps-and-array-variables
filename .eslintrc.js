module.exports = {
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': ['warn'],
    'react/prop-types': false,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
