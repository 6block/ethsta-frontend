module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': ['warn', 'as-needed'],
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-vars': ['warn'],
    'no-console': ['off'],
    'space-before-function-paren': ['error', 'never'],
    'vue/no-unused-components': ['warn'],
    'vue/html-self-closing': ['warn', {
      html: {
        void: 'never',
        normal: 'never',
        component: 'always',
      },
    }],
    'vue/require-default-prop': 'off',
    'vue/valid-template-root': 'off',
    'vue/order-in-components': 'off',
    'vue/no-v-html': 'off',
  },
}
