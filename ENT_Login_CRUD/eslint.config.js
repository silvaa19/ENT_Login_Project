// filepath: /c:/Users/conferenceroom/Desktop/ENT_Login_CRUD/react-admin/eslint.config.js
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  ignores: ['node_modules', 'dist'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
});