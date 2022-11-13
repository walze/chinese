import assert from 'browser-assert';
import App from './App.svelte';

const target = document.getElementById('app');
assert(target, 'No element with id "app" found');

const app = new App({
  target,
});

export default app;
