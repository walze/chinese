/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App';

const root = document.querySelector('#app');
if (!root) throw new Error('Root element not found');

render(App, root);
