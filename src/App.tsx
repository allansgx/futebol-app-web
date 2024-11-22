import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { SelecaoTime } from './pages/SelecaoTime/SelecaoTime';
import { Jogadores } from './pages/Jogadores/Jogadores';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route Component={SelecaoTime} path='' />
          <Route Component={Jogadores} path='/jogadores' />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
