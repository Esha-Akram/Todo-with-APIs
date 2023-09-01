import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './routes/animatedRoutes';


function App() {

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
