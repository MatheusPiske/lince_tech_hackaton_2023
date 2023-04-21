import Home from './home/pages';
import { Route, Routes } from "react-router-dom";
import Chamados from './chamados/pages';

const Rotas = () => (
  <Routes>
      <Route path="/" element={<Home />}/> 
      <Route path="/chamados" element={<Chamados />}/> 
  </Routes>
);

export default Rotas;
