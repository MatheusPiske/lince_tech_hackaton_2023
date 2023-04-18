# Lince Tech Hackaton 2023
<Projeto de desenvolvimento para o Hackaton />

/* COMANDOS PARA A CRIAÇÃO DO PROJETO */

=> npm create react-app (nome do arquivo)

/* CONCEITOS */

=> Sempre que o item que está entre parênteses do UseEffect sofrer alteração, o que está dentro do hook será executado

/* LOADER FIXO */

=> DIV LOADER: <div id="carregandoComponent" style={{display : "none", position: "absolute", top : "0", left : "0", width: "100%", height: "100%", zIndex: "2", backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "center", justifyContent : "center"}}> <CircularProgress style={{width : "70px", height : "70px"}}/></div>

=> MANIPULANDO APARIÇÃO DO LOADER: 

    const aoSubmeterLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const carregandoComponent = document.getElementById("carregandoComponent")
        if (carregandoComponent) {
            carregandoComponent.style.display = "flex"
        }

        http.get(`login`, {
            auth: {
                username: valueEmail,
                password: valueSenha
            }
        })
        .then(response => {
            sessionStorage.setItem('token', response.data.token)
            //sessionStorage.setItem('usuario', response.data.username)
            setUsuarioLogado(true)
        })
        .catch(erro => {
            setValueEmail("")
            setValueSenha("")
            const elemento = document.getElementById("mensagemErro")
            if (elemento) {
            elemento.style.display = "";
            }
            if (carregandoComponent) {
                carregandoComponent.style.display = "none"
            }
        })
    }
