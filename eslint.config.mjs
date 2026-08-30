import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  files: ['**/*.vue'],
  languageOptions: {
    parserOptions: {
      templateTokenizer: { pug: 'vue-eslint-parser-template-tokenizer-pug' },
    },
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/html-self-closing': 'off',
  },
});
