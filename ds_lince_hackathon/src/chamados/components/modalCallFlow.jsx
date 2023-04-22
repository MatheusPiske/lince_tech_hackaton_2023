import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState, useEffect, useRef, useMemo } from "react";
import { callUseCases } from "../useCases/CallUseCases";
import Swal from 'sweetalert2'
import JoditEditor from 'jodit-react'
import _ from 'lodash';

const steps = ['Escolha um motivo', 'Informações', 'Descrição'];

const stepFlow = [{ code: 1, label: 'ERRO DE SOFTWARE' }, { code: 2, label: 'MELHORIAS' }, { code: 3, label: 'DÚVIDAS' }, { code: 4, label: 'REUNUÕES E TREINAMENTOS' }, { code: 5, label: 'PROBLEMAS EQUIPAMENTOS' }, { code: 6, label: 'PROBLEMAS DE REDE' }, { code: 7, label: 'ESPECIFICAÇÕES DE EQUIPAMENTOS' }, { code: 8, label: 'LICENÇAS' }, { code: 9, label: 'MUDANÇA DE LAYOUT' }, { code: 10, label: 'LEVANTAMENTOS/MELHORIAS' }]

const apps = [{ code: 1, label: 'SINGE' }, { code: 2, label: 'SALLE' }, { code: 3, label: 'CONNECT' }, { code: 4, label: 'DECOLA' }, { code: 4, label: 'MIAMI' }, { code: 5, label: 'OUTROS' }]

export default function ModalPriceDetail({ isOpen }) {

    const [open, setOpen] = useState(isOpen);
    const [scroll] = useState('body');

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const [flowCode, setFlowCode] = useState(0);
    const [software, setSoftware] = useState(0);
    const [erro, setErro] = useState(0);
    const [property, setProperty] = useState(0);
    const [stepFlow, setStepFlow] = useState([]);

    const editor = useRef(null)
    const [content, setContent] = useState("")

    const config = {
        height: "60vh",
        buttons: [
            'bold',
            'italic',
            'underline',
            'strike',
            'superscript',
            'subscript',
            'ul',
            'ol',
            'outdent',
            'indent',
            'font',
            'fontsize',
            'brush',
            'paragraph',
            'table',
            'unlink',
            'align',
            'undo',
            'redo',
            'selectall',
            'cut',
            'copy',
            'paste',
            'hr',
            'eraser',
            'symbol',
            'fullsize',
            'print',
            'about',
            'color',
            'source',
          ],
        uploader: {
            url: '/path/to/upload',
            method: 'POST',
            format: 'json',
            filesVariableName: 'files',
            prepareData: (formData) => formData,
            isSuccess: (response) => response.status === 200,
            getMsg: (response) => response.message,
            process: (response) => response.data,
          },
          filebrowser: {
            ajax: {
              url: '/path/to/browse',
              data: {},
            },
        },
    };
   
    const handleContentChange = _.debounce((newContent) => {
        setContent(newContent);
    }, 10000);

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {

        var error = 0;
        var menssage = '';

        if (activeStep === 0) {
            if (flowCode === null) {
                error = 1;
                menssage = 'Selecione um motivo de abertura de chamado';
            }
        }

        if (error === 0) {
            let newSkipped = skipped;
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: menssage,
            })
        }

    };

    const handleClick = async () => {
        console.log(content);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChangeFlowCode = (event, newFlowCode) => {
        setFlowCode(newFlowCode);
    };

    const handleChangeSoftware = (event) => {
        setSoftware(event.target.value);
    };

    const handleChangeErro = (event) => {
        setErro(event.target.value);
    };

    const handleChangeProperty = (event) => {
        setProperty(event.target.value);
    }

    useEffect(() => {
        const getFlowCodes = async () => {
            const flowCodes = await callUseCases.getFlowCode();
            return flowCodes;
        };
        getFlowCodes().then((response) => {
            console.log(response)
            setStepFlow(response.data.flow)
        });
    }, []);


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
                fullWidth
            >
                <DialogTitle>
                    <Box>
                        <Stepper sx={{ marginTop: '1rem' }} activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                    </Box>
                    <Box sx={{ marginTop: '1.5rem', borderBottom: 1, borderColor: 'divider' }}>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ height: '62vh' }}>
                    {activeStep === steps.length ? (
                        <Box>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                        </Box>
                    ) : (
                        <Box>
                            {activeStep === 0 && (
                                <Box sx={{ marginTop: '2rem' }}>
                                    <ToggleButtonGroup
                                        sx={{ display: "grid", gap: '25px', gridTemplateColumns: '1fr 1fr' }}
                                        orientation="vertical"
                                        color="primary"
                                        value={flowCode}
                                        exclusive
                                        onChange={handleChangeFlowCode}
                                    >
                                        {stepFlow.map((flow, index) => (

                                            <ToggleButton sx={{ padding: '15px', fontSize: '12pt' }} key={index} value={flow.number}>{flow.description}</ToggleButton>

                                            // <Paper
                                            //     sx={{ padding: '30px', fontSize: '12pt' }}
                                            //     id={index} elevation={1} value={flow.code}
                                            // >
                                            //     {flow.label}
                                            // </Paper>
                                        ))}
                                    </ToggleButtonGroup>

                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box
                                    sx={{ display: "grid", gap: '25px', gridTemplateColumns: '1fr 1fr', marginTop: '2rem' }}
                                >
                                    {flowCode === 5 || flowCode === 6 ? (
                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                                            <InputLabel id="demo-select-medium-label">Erro</InputLabel>
                                            <Select
                                                labelId="demo-select-medium-label"
                                                id="demo-select-medium"
                                                value={erro}
                                                label="Erro"
                                                onChange={handleChangeErro}
                                            >
                                                <MenuItem value={1}>EQUIPAMENTO</MenuItem>
                                                <MenuItem value={2}>PROBLEMA</MenuItem>
                                            </Select>
                                        </FormControl>
                                    ) : flowCode === 7 || flowCode === 8 || flowCode === 9 || flowCode === 10 ? (
                                        <FormControl sx={{ m: 1 }} size="medium"> <TextField id="outlined-basic" label="Informações" variant="outlined" /> </FormControl>
                                    ) : (
                                        <FormControl sx={{ m: 1 }} size="medium">
                                            <InputLabel id="demo-select-medium-label">Software</InputLabel>
                                            <Select
                                                labelId="demo-select-medium-label"
                                                id="demo-select-medium"
                                                value={software}
                                                label="Software"
                                                onChange={handleChangeSoftware}
                                            >
                                                {apps.map((app, index) => (
                                                    <MenuItem key={index} value={app.code}>{app.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}

                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                                        <InputLabel id="demo-select-medium-label">Prioridade</InputLabel>
                                        <Select
                                            labelId="demo-select-medium-label"
                                            id="demo-select-medium"
                                            value={property}
                                            label="Prioridade"
                                            onChange={handleChangeProperty}
                                        >
                                            <MenuItem value={1}>PADRÃO</MenuItem>
                                            <MenuItem value={2}>URGENTE</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField id="outlined-basic" label="Telefone para Contato" variant="outlined" /> </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField id="outlined-basic" label="Título" variant="outlined" /> </FormControl>

                                </Box>
                            )}

                            {activeStep === 2 && (
                                <div>
                                    <JoditEditor 
                                    ref={editor} 
                                    value={content} 
                                    config={config}
                                    onBlur={(newContent) => setContent(newContent)}
                                    onChange={handleContentChange}
                                    />
                                    <button onClick={handleClick}>Salvar</button>
                                </div>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {activeStep === 0 ? (
                            <Button
                                color="inherit"
                                onClick={handleClose}
                            >
                                Fechar
                            </Button>) :
                            (
                                <Button
                                    color="inherit"
                                    onClick={handleBack}
                                >
                                    Voltar
                                </Button>
                            )}

                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Enviar' : 'Próximo'}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    )

}