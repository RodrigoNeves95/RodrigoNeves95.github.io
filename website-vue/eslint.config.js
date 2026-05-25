import js from '@eslint/js';
import prettier from '@vue/eslint-config-prettier';
import typescript from '@vue/eslint-config-typescript';
import vue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['dist', 'node_modules', '.vite'],
  },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...typescript(),
  prettier,
  {
    files: ['src/**/*.{ts,vue}'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
