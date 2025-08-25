import { BrowserRouter } from 'react-router-dom'
import './Style/main.scss'
import { Rotas } from './Routes/Rotas'

function App() {

  return (
    <>
      <BrowserRouter>
        <Rotas/>
      </BrowserRouter>
    </>
  );
}

export default App
