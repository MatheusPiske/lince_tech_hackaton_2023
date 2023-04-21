import Home from './paginas/Home';
import { Route, Routes } from "react-router-dom";

const Rotas = () => (
  <Routes>
      <Route path="/" element={<Home />}/> 
  </Routes>
);

export default Rotas;
