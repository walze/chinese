import '../tailwind.scss';
import '../app.sass';

import { StrictMode } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const root$ = document.querySelector('#app');
if (!root$) throw new Error('Root element not found');

createRoot(root$).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
