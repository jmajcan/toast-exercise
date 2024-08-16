import React from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Header />
      <Container>
        <Content />
      </Container>
    </ToastProvider>
  );
}

export default App;
