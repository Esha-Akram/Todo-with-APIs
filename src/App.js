import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registor from './components/User/Registor';
import Login from './components/User/Login';
import View from './components/Task/View';
import Add from './components/Task/Add';
import { AuthRoute } from './components/Auth';
import { Start } from './components/User/Start';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Start />} />
          <Route path='/login' element={<Login />} />
          <Route path="/registor" element={<Registor />} />
          <Route element={<AuthRoute />}>
            <Route path="/view" element={<View />} />
            <Route path="/add" element={<Add />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
