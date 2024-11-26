import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CopilotKit } from '@copilotkit/react-core';
import '@copilotkit/react-ui/styles.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <CopilotKit runtimeUrl={`${API_BASE_URL}/copilotkit`}>
      <App />
    </CopilotKit>
  </StrictMode>
);