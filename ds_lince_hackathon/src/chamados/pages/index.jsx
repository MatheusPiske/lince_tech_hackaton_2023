import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import shadows from '@mui/material/styles/shadows';

const Chamados = () => { 
    const [liberador, setLiberador] = React.useState('');

    const handleChange = (event) => {
        setLiberador(event.target.value)
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#00408b",
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
      function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

    return (
    <>
        <section className="home-section">
            <div className="home-content" style={{justifyContent : "space-between"}}>
            <i className='bx bx-menu' ></i>
            <h1 className="home-content-title">Chamados</h1>

            <Box sx={{ minWidth: 150, padding : "20px 20px 0 0" }} id="selectLiberador">
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
            </Box>
            </div>

            <TableContainer component={Paper} sx={{padding : "20px", boxShadow : "none"}}>
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
                        <StyledTableCell align="right">Contato</StyledTableCell>
                        <StyledTableCell align="right">Origem</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </section>
    </>
    )
}

export default Chamados;
