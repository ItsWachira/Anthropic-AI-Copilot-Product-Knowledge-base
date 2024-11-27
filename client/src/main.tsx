import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CopilotKit } from '@copilotkit/react-core';
import '@copilotkit/react-ui/styles.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;





createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <CopilotKit runtimeUrl={`${API_BASE_URL}/copilotkit`}>
      <App />
    </CopilotKit>
  </StrictMode>
)
