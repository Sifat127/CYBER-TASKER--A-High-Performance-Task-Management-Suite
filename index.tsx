import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  // StrictMode can sometimes cause double-invocations which might make dnd flicker in dev,
  // but it's best practice to keep it.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
