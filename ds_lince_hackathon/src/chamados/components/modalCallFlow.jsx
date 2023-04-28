import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState, useEffect, useRef } from "react";
import { callUseCases } from "../useCases/CallUseCases";
import Swal from 'sweetalert2'
import JoditEditor from 'jodit-react'
import _ from 'lodash';
import ReactInputMask from "react-input-mask";

const steps = ['Escolha um motivo', 'Informações', 'Descrição'];

const apps = [{ code: 1, label: 'SINGE' }, { code: 2, label: 'SALLE' }, { code: 3, label: 'CONNECT' }, { code: 4, label: 'DECOLA' }, { code: 4, label: 'MIAMI' }, { code: 5, label: 'OUTROS' }]

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export default function ModalPriceDetail({ callUuid, callCode, isOpen, userCre, parentCallback }) {

    const [open, setOpen] = useState(isOpen);
    const [scroll] = useState('body');

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const [flowCode, setFlowCode] = useState(0);
    // const [software, setSoftware] = useState(0);
    // const [erro, setErro] = useState(0);
    const [priority, setPriority] = useState(0);
    const [contact, setContact] = useState("");
    const [title, setTitle] = useState("");
    const [information, setInformation] = useState("");

    const [stepFlow, setStepFlow] = useState([]);
    const [flowCall, setFlowCall] = useState([]);

    const editor = useRef(null)
    const [content, setContent] = useState("")

    const [situation, setSituation] = useState(3);

    const config = {
        language: "pt_br",
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
            //url: '/path/to/upload',
            method: 'POST',
            format: 'json',
            //filesVariableName: 'files',
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
        localStorage.setItem("content", newContent)
        setContent(newContent);
    }, 10000);

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {

        var error = 0;
        var menssage = '';

        if (activeStep === 0) {
            if (flowCode === 0 || flowCode === null) {
                error = 1;
                menssage = 'Selecione um motivo de abertura de chamado';
            }
        }

        if (activeStep === 1) {

            if (flowCode === 1 || flowCode === 2 || flowCode === 3 || flowCode === 4) {
                if (information === '' || title === '' || priority === 0 || contact === '') {
                    error = 1;
                }
            }

            if (flowCode === 5 || flowCode === 6) {
                if (information === '' || title === '' || priority === 0 || contact === '') {
                    error = 1;
                }
            }

            if (flowCode === 7 || flowCode === 8 || flowCode === 9 || flowCode === 10) {
                if (information === '' || title === '' || priority === 0 || contact === '') {
                    error = 1;
                }
            }

            if (error === 1) {
                menssage = 'Preencha todos os campos para prosseguir';
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

    // const handleClick = async () => {
    //     console.log(content);
    // };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChangeFlowCode = (event, newFlowCode) => {
        setFlowCode(newFlowCode);
        localStorage.setItem("flow", newFlowCode)
    };

    // const handleChangeSoftware = (event) => {
    //     setSoftware(event.target.value);
    // };

    // const handleChangeErro = (event) => {
    //     setErro(event.target.value);
    // };

    const handleChangePriority = (event) => {
        setPriority(event.target.value);
        localStorage.setItem("priority", event.target.value)
    }

    const handleChangeContact = (event) => {
        setContact(event.target.value);
        localStorage.setItem("contact", event.target.value)
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
        localStorage.setItem("title", event.target.value)
    }

    const handleChangeInformation = (event) => {
        setInformation(event.target.value);
        localStorage.setItem("information", event.target.value)
        console.log(event.target.value)
    }

    const handleCall = async (callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate, content, situation) => {
        if (localStorage.getItem("information") || localStorage.getItem("title") || localStorage.getItem("flow") || localStorage.getItem("contact") || localStorage.getItem("priority") || setContent(localStorage.getItem("content"))) {
            localStorage.removeItem("information")
            localStorage.removeItem("title")
            localStorage.removeItem("flow")
            localStorage.removeItem("contact")
            localStorage.removeItem("priority")
            localStorage.removeItem("content")
            setContent("")
        }
        
        const response = await callUseCases.postCreateCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate, content, userCre, situation);

        if (!response.status) {
            return Swal.fire({
                icon: "error",
                confirmButtonText: "OK",
                text: "Connection error",
            });
        } else {
            parentCallback(true);
            handleClose();
            return Toast.fire({
                icon: "success",
                text: "Registro criado!",
            });
        }
    }

    useEffect(() => {
        const getFlowCodes = async () => {
            const flowCodes = await callUseCases.getFlowCode();
            return flowCodes;
        };
        getFlowCodes().then((response) => {
            setStepFlow(response.data.flow)
        });

        if (callCode > 0) {
            const getFlowCalls = async () => {
                const flowCall = await callUseCases.getFlowCall(callCode);
                return flowCall;
            };
            getFlowCalls().then((response) => {
                // setFlowCall(response.data.call)
                setInformation(response.data.call.originProblemS)
                setTitle(response.data.call.title);
                setFlowCode(response.data.call.flow.uuid);
                setContact(response.data.call.contact);
                setPriority(response.data.call.priority);
                setContent(response.data.call.richText);
            });
        } else if (callCode < 0) {
            setInformation(localStorage.getItem("information"))
            setTitle(localStorage.getItem("title"));
            setFlowCode(localStorage.getItem("flow"));
            setContact(localStorage.getItem("contact"));
            setPriority(localStorage.getItem("priority"));
            //setContent(localStorage.getItem("content"));
        }

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
                <DialogContent sx={{ height: '63vh' }}>
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

                                            <ToggleButton sx={{ padding: '15px', fontSize: '12pt' }} key={index} value={flow.uuid}>{flow.description}</ToggleButton>

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
                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField inputProps={{ maxLength: 255 }} id="outlined-basic" label="Título" variant="outlined" value={information} onChange={handleChangeInformation} /> </FormControl>
                                    ) : flowCode === 7 || flowCode === 8 || flowCode === 9 || flowCode === 10 ? (
                                        <FormControl sx={{ m: 1 }} size="medium"> <TextField id="outlined-basic" label="Informações" variant="outlined" value={information} onChange={handleChangeInformation} /> </FormControl>
                                    ) : (
                                        <FormControl sx={{ m: 1 }} size="medium">
                                            <InputLabel id="demo-select-medium-label">Software</InputLabel>
                                            <Select
                                                labelId="demo-select-medium-label"
                                                id="demo-select-medium"
                                                value={information}
                                                label="Software"
                                                onChange={handleChangeInformation}
                                            >
                                                {apps.map((app, index) => (
                                                    <MenuItem key={index} value={app.label}>{app.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}

                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                                        <InputLabel id="demo-select-medium-label">Prioridade</InputLabel>
                                        <Select
                                            labelId="demo-select-medium-label"
                                            id="demo-select-medium"
                                            value={priority}
                                            label="Prioridade"
                                            onChange={handleChangePriority}
                                        >
                                            <MenuItem value={1}>PADRÃO</MenuItem>
                                            <MenuItem value={2}>URGENTE</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <ReactInputMask
                                        mask="+ (999) 9 99999-9999"
                                        maskChar=""
                                        onChange={handleChangeContact}
                                        value={contact}
                                    >
                                        {() => (
                                            <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField id="outlined-basic" label="Contato" variant="outlined" /> </FormControl>
                                        )}
                                    </ReactInputMask>

                                    {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField id="outlined-basic" label="Telefone para Contato" variant="outlined" value={contact} onChange={handleChangeContact} /> </FormControl> */}
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium"> <TextField inputProps={{ maxLength: 60 }} id="outlined-basic" label="Título" variant="outlined" value={title} onChange={handleChangeTitle} /> </FormControl>

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
                                        id="richText"
                                    />
                                    {/* <button onClick={handleClick}>Salvar</button> */}
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

                        {activeStep === steps.length - 1 ? (<Button onClick={() => handleCall(callUuid, flowCode, information, priority, contact, title, content, situation)}>Enviar</Button>) : (<Button onClick={handleNext}>Próximo</Button>)}
                        {/* <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Enviar' : 'Próximo'}
                        </Button> */}
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    )

}