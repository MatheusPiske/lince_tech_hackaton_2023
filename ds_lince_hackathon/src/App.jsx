import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import React, { useEffect, useState } from 'react';
import Rotas from './routes';

function App() {
  const [liberador, setLiberador] = useState('');

  const handleChange = (event) => {
    setLiberador(event.target.value)
  };
  
  useEffect(() => {
      const arrowClickHandler = (e) => {
          e.target.parentElement.parentElement.classList.toggle("showMenu");
      };
      document.querySelectorAll(".arrow").forEach(arrow => {
          arrow.addEventListener("click", arrowClickHandler);
      });
      
      const menuClickHandler = () => {
          //document.querySelector("#selectLiberador").classList.toggle("selectClose")
          document.querySelector(".sidebar").classList.toggle("close")

          if (localStorage.getItem("sideBarState") == "close") {
            localStorage.setItem("sideBarState", "open")
          } else {
            localStorage.setItem("sideBarState", "close")
          }
      };
      document.querySelector(".bx-menu").addEventListener("click", menuClickHandler);

      // Remove event listeners ao desmontar o componente
      return () => {
          document.querySelectorAll(".arrow").forEach(arrow => {
              arrow.removeEventListener("click", arrowClickHandler);
          });
          document.querySelector(".bx-menu").removeEventListener("click", menuClickHandler);
      };
  }, []);


  return (
  <>
      <div className="sidebar close">
      <div className="logo-details">
      <i className='bx bxl-c-plus-plus'></i>
      {/* <img src="/images/lince_tech.jpeg" className='imagemSideBar'/> */}
      <span className="logo_name">Lince Tech</span>
      </div>
      <ul className="nav-links">
      <li>
          <a href="/">
          <i className='bx bx-grid-alt' ></i>
          <span className="link_name">Home</span>
          </a>
          {/* <ul className="sub-menu blank">
          <li><a className="link_name" href="#">Chamados</a></li>
          </ul> */}
      </li>
      <li>
          <a href="/chamados">
          <i className='bx bx-collection' ></i>
          <span className="link_name">Chamados</span>
          </a>
      </li>
      {/* <li>
          <div className="iocn-link">
          <a href="/chamados">
              <i className='bx bx-collection' ></i>
              <span className="link_name">Chamados</span>
          </a>
          <i className='bx bxs-chevron-down arrow' ></i>
          </div>
          <ul className="sub-menu">
          <li><a className="link_name" href="#">Categoria</a></li>
          <li><a href="#">Projetos</a></li>
          <li><a href="#">Manutenção</a></li>
          <li><a href="#">Melhorias</a></li>
          </ul>
      </li> */}
      <li>
      {/* <div className="profile-details"> */}
      {/* <div className="profile-content"> */}
          {/* <img src="image/profile.jpg" alt="profileImg"> */}
      {/* </div> */}
      {/* <div className="name-job">
          <div className="profile_name">DS501</div>
          <div className="job">Consulta de chamados</div>
      </div> */}
      {/* <Box sx={{ minWidth: 120 }} id="selectLiberador" className="selectClose">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Liberador</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={liberador}
            label="liberador"
            onChange={handleChange}
          >
            <MenuItem value={10}>Aprovador</MenuItem>
            <MenuItem value={20}>Usuário</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
      {/* </div> */}
      </li>
      </ul>
      </div>

      <Rotas />
  </>
  )
  
  //return <Rotas />;
}

export default App;
