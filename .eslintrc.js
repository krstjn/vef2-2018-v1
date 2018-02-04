module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'log', 'warn', 'error'] }],
    'linebreak-style': 0,
  }
};