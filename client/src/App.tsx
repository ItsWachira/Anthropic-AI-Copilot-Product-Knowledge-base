import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { KnowledgeBase } from './components/KnowledgeBase';
import '@mantine/core/styles.css';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <KnowledgeBase />
    </MantineProvider>
  );
}