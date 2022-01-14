import Api from '../Api';
import "./Login.css"
import { TextField, Button } from "@material-ui/core"
import React, {useState, useEffect} from "react"
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { Stepper, Step, StepLabel } from '@material-ui/core'

export default ({onReceive}) => {
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
                        <TextField id="nomeCriar" label="Nome" type="nome" InputProps={{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            ),
                        }}
                        required margin="normal" fullWidth variant="outlined"/>
                        <TextField id="emailCriar" label="Email" type="email" required margin="normal" fullWidth variant="outlined"/>
                        <TextField id="senhaCriar" label="Senha" type="password" required margin="normal" fullWidth variant="outlined"/>
                        <div className="botao">
                            <Button id="botaoCriar" type="submit" variant="contained" color="default">Criar conta</Button>
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
