import React from 'react';
import Api from '../Api';
import "./Login.css"


export default ({onReceive}) => {

    const handleFacebookLogin = async() => {
        let result = await Api.fbPopup();
        if(result){
            onReceive(result.user)
        } else {
            alert("Erro desconhecido")
        }
    }

    return(
        <div className="login">
            <button onClick={handleFacebookLogin}>Logar Com Facebook</button>
        </div>
    )
}
