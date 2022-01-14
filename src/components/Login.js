import Api from '../Api';
import "./Login.css"
import { TextField, Button } from "@material-ui/core"
import React, {useState, useEffect} from "react"
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { Stepper, Step, StepLabel } from '@material-ui/core'

export default ({onReceive, setUser}) => {
    const [etapaAtual, setEtapaAtual] = useState();
    const [id, setId] = useState();


    function funcoes(){
        document.querySelector(`#nomeCriar`).value = "";
        document.querySelector(`#emailCriar`).value = "";
        document.querySelector(`#senhaCriar`).value = "";
    }
    
    const handleFacebookLogin = async() => {
        let result = await Api.fbPopup();
        if(result){
            onReceive(result.user)
            console.log(result.user)
        } else {
            alert("Erro desconhecido")
        }
    }

    function abreModalLogin(e){
        e.preventDefault();
        funcoes()
        document.querySelector(".modalCriarConta").style.display = "none";
        document.querySelector(".modalLoginConta").style.display = "block";
    }

    function voltar(e){
        e.preventDefault();
        document.querySelector(".modalCriarConta").style.display = "block";
        document.querySelector(".modalLoginConta").style.display = "none";
    }

    
    const createUser = async() => {


        const nome = document.getElementById("nomeCriar").value;
        const email = document.getElementById("emailCriar").value;
        const senha = document.getElementById("senhaCriar").value;

        if(nome || email || senha != ""){
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, "0");
            var mes = String(data.getMonth() + 1).padStart(2, "0");
            var ano = data.getFullYear();
            var hora = String(data.getHours())
            var minutos = String(data.getMinutes())
            var segundos = String(data.getSeconds())
    
            const criado = dia + "/" + mes + "/" + ano + " as " + hora + ":" + minutos + ":" + segundos
    
            console.log(criado)
    
    
    
            let result = await Api.createUser(email, senha, nome, setId)
            if(result){
                console.log(result.user)
                alert("Conta criada com sucesso")
                let newUser = {
                    id: result.user.id,
                    name: nome,
                    avatar: null,
                    email: email,
                    criado: criado,
                };
                setUser(newUser)
            }

        } else{
            alert("Todos os campos sao requeridos")
        }
    }



    return(
        <div className="login">
            <div className="telaUsuario">
                <form className="modalCriarConta">  
                    <div className="titulo">
                        <h1>Formulario criar conta</h1>
                    </div>
                    <div className="formularioLogin">
                        <Stepper className="passo" activeStep={etapaAtual}>
                            <Step><StepLabel>Criar Conta</StepLabel></Step>
                            <Step><StepLabel>Applicativo</StepLabel></Step>
                        </Stepper>
                    </div>
                    <div className="formularioDados">
                        <TextField id="nomeCriar" autoFocus required label="Nome" type="nome" InputProps={{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            ),
                        }}
                        required margin="normal" fullWidth variant="outlined"/>
                        <TextField id="emailCriar" label="Email" type="email" required margin="normal" fullWidth variant="outlined" autoComplete="email"/>
                        <TextField id="senhaCriar" label="Senha" type="password" required margin="normal" fullWidth variant="outlined" autoComplete="current-password" />
                        <div className="botao">
                            <Button id="botaoCriar" onClick={createUser} type="submit" variant="contained" color="default">Criar conta</Button>
                            <Button type="submit" variant="contained" onClick={(e)=>abreModalLogin(e)} color="default">Ja tem uma conta?!</Button>
                        </div>
                        
                    </div>
                </form>
                <form className="modalLoginConta"> 
                    <div className="titulo">
                        <h1>Formulario login</h1>
                    </div>
                        <div className="formularioLogin">
                            <Stepper activeStep={etapaAtual}>
                                <Step><StepLabel>Login</StepLabel></Step>
                                <Step><StepLabel>Applicativo</StepLabel></Step>
                            </Stepper>
                        </div>
                        <div className="formularioDados">
                            <TextField id="emailLogin" label="Email" type="email" required margin="normal" fullWidth variant="outlined"/>
                            <TextField id="senhaLogin" label="Senha" type="password" required margin="normal" fullWidth variant="outlined"/>
                            <div className="botao">
                                <Button type="submit" onClick={(e)=>voltar(e)} variant="contained" color="default">Voltar</Button>
                                <Button type="submit" variant="contained" color="default">Login</Button>
                            </div>
                        </div>
                </form>
                <div className="buttonFacebook">
                    <Button onClick={handleFacebookLogin} type="submit" variant="contained" color="primary">Login com o Facebook</Button>
                </div>

            </div>
        </div>
    )
}
