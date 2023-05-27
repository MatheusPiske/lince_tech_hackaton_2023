import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalCallFlow from '../components/modalCallFlow'
import ModalCallReprove from '../components/modalCallReprove';
import { createRoot } from "react-dom/client";
import { Fab, Tooltip, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { callUseCases } from "../useCases/CallUseCases";
import Button from '@mui/material/Button';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const Chamados = () => {

  const [liberador, setLiberador] = useState('normal');
  const [calls, setCall] = useState([]);
  const [changed, setChanged] = useState("");

  const handleChange = (event) => {
    setLiberador(event.target.value)
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#85858524",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      //   backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const handleOpenModalCall = (evt, uuid, code) => {
    evt.preventDefault();
    const container = document.getElementById("modal-price");
    const root = createRoot(container);
    return root.render(
      <ModalCallFlow
        isOpen={true}
        callUuid={uuid}
        callCode={code}
        parentCallback={handleChangeEdit}
        userCre={liberador}
      />
    );
  };

  const handleOpenModalCallReprove = (evt, uuid, code) => {
    evt.preventDefault();
    const container = document.getElementById("modal-reprove");
    const root = createRoot(container);
    return root.render(
      <ModalCallReprove
        isOpen={true}
        callUuid={uuid}
        callCode={code}
        parentCallback={handleChangeEdit}
        userCre={liberador}
      />
    );
  }

  const handleChangeEdit = () => {
    setChanged(!changed);
  };

  const handleClick = (evt, uuid, numberCall, situation) => {
    if (liberador === "normal") {
        handleOpenModalCall(evt, uuid, numberCall);
    } else {
      callUseCases.approveCall(numberCall, situation)
    }

    if (liberador != "normal") {
      window.location.href = '/chamados';
      setLiberador("aprovador")
    }
  }

  const handleReprove = (evt, uuid, numberCall, situation) => {
    handleOpenModalCallReprove(evt, uuid, numberCall);
  }

  useEffect(() => {
    const getCallCodes = async () => {
      if (liberador == "normal") {
        const callCodes = await callUseCases.getCallCode();
        return callCodes;
      } else {
        const callCodes = await callUseCases.getCallCodeApprover();
        return callCodes;
      }
    };
    getCallCodes().then((response) => {
      setCall(response.data.call)
    });
  }, [changed, liberador]);

  return (
    <>
      <section className="home-section">
        <div className="home-content" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <i className='bx bx-menu' ></i>
            <Box sx={{ display: 'grid', height: '9vh' }}>
              <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: "22pt", fontWeight: "600", paddingTop: "15px" }}>Chamados</Typography>
              <Box sx={{ width: '2.5rem', height: '5px', marginTop: '-0.5rem', borderRadius: '5px', background: 'linear-gradient(90deg, #2a462a 0%, #2a462a 35%, #32a532 100%)' }}></Box>
            </Box>
          </div>

          <Box sx={{ minWidth: 150, padding: "20px 20px 0 0" }} id="selectLiberador">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Visualização</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={liberador}
                label="Visualização"
                onChange={handleChange}
              >
                <MenuItem value={'normal'}>Usuário</MenuItem>
                <MenuItem value={'liberador'}>Aprovador</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <TableContainer component={Paper} sx={{ padding: "20px", boxShadow: "none", borderRadius: "75px", marginBottom: "50px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Número</StyledTableCell>
                <StyledTableCell align="right">Título</StyledTableCell>
                <StyledTableCell align="right">Autor</StyledTableCell>
                <StyledTableCell align="right">Prioridade</StyledTableCell>
                
                <StyledTableCell align="right">Fluxo</StyledTableCell>
                
                <StyledTableCell align="left">Data de criação</StyledTableCell>
                <StyledTableCell align="right">Contato</StyledTableCell>
                <StyledTableCell align="right">Origem</StyledTableCell>
                <StyledTableCell align="center">Situação</StyledTableCell>
                <StyledTableCell align="center">Ação</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calls.map((row) => (
                <StyledTableRow key={row.uuid}>
                  <StyledTableCell component="th" scope="row">
                    {row.numberCall}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row.author}</StyledTableCell>
                  <StyledTableCell align="right">{row.priority}</StyledTableCell>
                  
                  <StyledTableCell align="right">{row.flow.number}</StyledTableCell>
                  
                  <StyledTableCell align="left">{(row.createDate)}</StyledTableCell>
                  <StyledTableCell align="right">{row.contact}</StyledTableCell>
                  <StyledTableCell align="right">{row.originProblemS}</StyledTableCell>
                  <StyledTableCell align="center"><Tooltip title={<span dangerouslySetInnerHTML={{__html: row.reason}}></span>}><div>{row.situation == 0 ? "Aprovado" : row.situation == 4 ? "Reprovado" : row.situation == 3 ? "Pendente de aprovação" : "Situação desconhecida"}</div></Tooltip></StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton id="situationButton" onClick={(evt) => handleClick(evt, row.uuid, row.numberCall, 0)}>{liberador === "normal" ? <EditIcon /> : <CheckCircleOutlineIcon/>}</IconButton>{liberador != "normal" ? <IconButton><CancelIcon onClick={(evt) => handleReprove(evt, row.uuid, row.numberCall)}/></IconButton> : ""}<IconButton  onClick={() => ( 
                  callUseCases.deleteFlowCall(row.numberCall, 1), 
                  window.location.href = '/chamados'
                  )}><DeleteIcon /></IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <input type="hidden" id="modal-price" />
        <input type="hidden" id="modal-reprove" />
      </section>

      <Fab sx={{
        position: 'fixed',
        bottom: 18,
        right: 18,
        fontWeight: 'bold',
        backgroundColor: '#2a462a'
      }}
        variant="extended"
        size="large"
        color="primary"
        onClick={localStorage.getItem("flow") !== "" ? (evt) => handleOpenModalCall(evt, "", -1) : (evt) => handleOpenModalCall(evt)}
      >
        Criar Chamado
      </Fab>
    </>
  )
}

export default Chamados;
