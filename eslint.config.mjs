/* eslint-env node */

export default {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended', // added from selection
  ],
  rules: {
    'import/no-default-export': 'off',
    'no-var': 'error',
    'no-extra-semi': 'error',
    'default-param-last': ['error'],
    'no-empty': 'error',
    'no-else-return': 'error',
  },

  overrides: [
    // Cypress E2E and support files
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}',
      ],
      extends: ['plugin:cypress/recommended'],
    },
    // Reports module: allow single-word component names
    {
      files: ['src/modules/reports/**/*.@(js|vue)'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    // FICO module, composables, layouts, stores: custom Vue rules
    {
      /**
       * Custom rules for FICO module and others
       * @see https://eslint.vuejs.org/rules/
       * @see https://eslint.org/docs/rules/
       */
      files: [
        'src/composables/**/*.@(js|vue)',
        'src/modules/fico/**/*.@(js|vue)',
        'src/layouts/**/*.@(js|vue)',
        'src/stores/**/*.@(js)',
      ],
      rules: {
        'no-duplicate-imports': 'error',
        'no-empty-function': 'error',
        'vue/camelcase': 'error',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/v-on-event-hyphenation': ['error', 'always'],
        'vue/require-explicit-emits': ['error', { allowProps: false }],
        'vue/require-prop-types': 'error',
        'vue/attributes-order': 'error',
        'vue/order-in-components': 'error',
        'vue/this-in-template': 'error',
        'vue/no-static-inline-styles': 'error',
        'vue/block-order': [
          'error',
          { order: ['script', 'template', 'style'] },
        ],
        'vue/define-macros-order': [
          'error',
          {
            order: ['defineProps', 'defineEmits'],
            defineExposeLast: false,
          },
        ],
        'vue/no-unused-emit-declarations': 'error',
        'vue/no-unused-properties': 'error',
        'vue/no-unused-refs': 'error',
        'vue/padding-lines-in-component-definition': 'error',
        'vue/padding-line-between-blocks': 'error',
        'vue/padding-line-between-tags': 'error',
        'vue/block-spacing': 'error',
      },
    },
  ],
};
