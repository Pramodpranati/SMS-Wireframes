import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// import 'preline'
import './index.css';


declare global {
  interface Window {
    HSOverlay?: {
      autoInit: () => void;
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
document.addEventListener('DOMContentLoaded', () => {
  // This is needed for things like modals, dropdowns, etc.
  Window.HSOverlay?.autoInit();
});
