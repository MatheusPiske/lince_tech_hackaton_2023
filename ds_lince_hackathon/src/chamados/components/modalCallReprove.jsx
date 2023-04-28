import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState, useEffect, useRef } from "react";
import { callUseCases } from "../useCases/CallUseCases";
import Swal from 'sweetalert2'
import JoditEditor from 'jodit-react'
import _ from 'lodash';

const steps = ['Descreva o motivo da reprovação'];

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

export default function ModalCallReprove({ callUuid, callCode, isOpen, userCre, parentCallback }) {

    const [open, setOpen] = useState(isOpen);
    const [scroll] = useState('body');

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const [flowCode, setFlowCode] = useState(0);

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

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChangeFlowCode = (event, newFlowCode) => {
        setFlowCode(newFlowCode);
    };

    const handleChangePriority = (event) => {
        setPriority(event.target.value);
    }

    const handleChangeContact = (event) => {
        setContact(event.target.value);
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeInformation = (event) => {
        setInformation(event.target.value);
        console.log(event.target.value)
    }

    const handleCall = async (callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate, content, situation) => {
        //console.log(content)

        const response = await callUseCases.postReproveCall(callUuid, flowCodeCreate, firstFieldCreate, priorityCreate, contactCreate, titleCreate, "", userCre, 4, content);

        // if (!response.status) {
        //     return Swal.fire({
        //         icon: "error",
        //         confirmButtonText: "OK",
        //         text: "Connection error",
        //     });
        // } else {
            parentCallback(true);
            handleClose();
            //window.location.href = '/chamados';
            // return Toast.fire({
            //     icon: "success",
            //     text: "Successfully registered",
            // });
        // }
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
                //setInformation(response.data.call.originProblemS)
                //setTitle(response.data.call.title);
                //setFlowCode(response.data.call.flow.uuid);
                //setContact(response.data.call.contact);
                //setPriority(response.data.call.priority);
                //setContent(response.data.call.richText);
            });
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
                            <Step key={"Descreva o motivo da reprovação"}>
                                <StepLabel>{"Descreva o motivo da reprovação"}</StepLabel>
                            </Step>  
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
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                onBlur={(newContent) => setContent(newContent)}
                                onChange={handleContentChange}
                            /> 
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
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    )

}