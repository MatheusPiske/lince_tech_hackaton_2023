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
import { createRoot } from "react-dom/client";
import { Fab, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { callUseCases } from "../useCases/CallUseCases";
import Button from '@mui/material/Button';

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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

  const handleDeleteItem = () => {

  }

  const handleChangeEdit = () => {
    setChanged(!changed);
  };

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
              <Box sx={{ width: '2.5rem', height: '5px', marginTop: '-0.5rem', borderRadius: '5px', background: 'linear-gradient(90deg, #154360 0%, #1F618D 35%, #2980B9 100%)' }}></Box>
            </Box>
          </div>

          <Box sx={{ minWidth: 150, padding: "20px 20px 0 0" }} id="selectLiberador">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Liberador</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={liberador}
                label="liberador"
                onChange={handleChange}
              >
                <MenuItem value={'normal'}>Usuário</MenuItem>
                <MenuItem value={'liberador'}>Aprovador</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <TableContainer component={Paper} sx={{ padding: "20px", boxShadow: "none", borderRadius: "75px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Número</StyledTableCell>
                <StyledTableCell align="right">Título</StyledTableCell>
                <StyledTableCell align="right">Autor</StyledTableCell>
                <StyledTableCell align="right">Prioridade</StyledTableCell>
                <StyledTableCell align="right">Aprovador</StyledTableCell>
                <StyledTableCell align="right">Fluxo</StyledTableCell>
                <StyledTableCell align="right">Último usuário</StyledTableCell>
                <StyledTableCell align="left">Data de criação</StyledTableCell>
                <StyledTableCell align="right">Contato</StyledTableCell>
                <StyledTableCell align="right">Origem</StyledTableCell>
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
                  <StyledTableCell align="right">{ }</StyledTableCell>
                  <StyledTableCell align="right">{row.flow.number}</StyledTableCell>
                  <StyledTableCell align="right">{ }</StyledTableCell>
                  <StyledTableCell align="left">{(row.createDate)}</StyledTableCell>
                  <StyledTableCell align="right">{row.contact}</StyledTableCell>
                  <StyledTableCell align="right">{row.originProblemS}</StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton onClick={(evt) => handleOpenModalCall(evt, row.uuid, row.numberCall)}>{liberador === "normal" ? <EditIcon /> : <CheckCircleOutlineIcon/>}</IconButton>&nbsp;&nbsp;<IconButton  onClick={() => callUseCases.deleteFlowCall(row.numberCall, 1)}><DeleteIcon /></IconButton></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <input type="hidden" id="modal-price" />
      </section>

      <Fab sx={{
        position: 'absolute',
        bottom: 18,
        right: 18,
        fontWeight: 'bold',
        backgroundColor: '#002754'
      }}
        variant="extended"
        size="large"
        color="primary"
        onClick={(evt) => handleOpenModalCall(evt)}
      >
        Criar Chamado
      </Fab>
    </>
  )
}

export default Chamados;
