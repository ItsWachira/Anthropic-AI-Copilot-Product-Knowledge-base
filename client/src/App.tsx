import { MantineProvider } from '@mantine/core';
import { KnowledgeBase } from './components/KnowledgeBase';
import '@mantine/core/styles.css';

export default function App() {
  return (
    <MantineProvider >
      <KnowledgeBase />
    </MantineProvider>
  );
}