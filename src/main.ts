// import assert from 'browser-assert';
import App from './App.svelte';

function assert(
  value: unknown,
  message?: string | Error,
): asserts value;
function assert(
  value: unknown,
  message?: string | Error,
): asserts value is true {
  if (!value) {
    throw new Error(message?.toString() ?? 'Assertion failed');
  }
}

const target = document.getElementById('app');
assert(target, 'No element with id "app" found');

const app = new App({
  target,
});

export default app;
