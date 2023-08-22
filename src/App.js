import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registor from './components/User/Registor';
import Login from './components/User/Login';
import View from './components/Task/View';
import Add from './components/Task/Add';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index element= {< Login />} />
        <Route path="/register" element={<Registor />} />
        <Route path='/view' element={<View />} />
        <Route path='/add' element={< Add />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
