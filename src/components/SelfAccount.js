import React, {useState, useEffect, Component} from 'react';
import "./SelfAccount.css"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import Api from "../Api"
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import firebaseConfig from "../firebaseConfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();




export default ({ user, show, setShow}) => {

    const [recado, setRecado] = useState()

    const handleClose = () => {
        setShow(false)
    }

    const handleRecadoClick = () => {
        const message = document.getElementById("campoRecado").value
        db.collection("users").doc(user.id).set({
            recado: message
        }, {merge: true})
        document.getElementById("campoRecado").value = ""
    }

    db.collection("users").doc(user.id).onSnapshot(function(doc){
        const data = doc.data()
        const recado = data.recado
        setRecado(recado)
    })


    return(
        <div className="selfAccount" style={{left: show? 0:-415}}>
            <div className="profile--head">
                <div onClick={handleClose} className="profile--backbutton">
                    <ArrowBackIcon style={{color: "#919191" }}/>
                    <h3> Dados pessoais</h3>
                </div>
            </div>
            <div className="profile--body">
                <div className="informations">
                    <div className="image">
                        <img src={user.avatar} />
                        <h3>{recado}</h3>
                    </div>
                    <div className="name">
                        <h3>Nome: <b>{user.name}</b></h3>
                    </div>
                    <div className="id">
                        <h3>Meu ID: <b>{user.id}</b></h3>
                    </div>
                    <div className="email">
                        <h3>Email: <b>{user.email}</b></h3>
                    </div>
                    <div className="criado">
                        <h3>Criado em: <b>{user.criado}</b></h3>
                    </div>
                    <div className="recado">
                        <h3>Digite um recado:</h3>
                        <input id="campoRecado" className="campoRecado" type="text" placeholder="Todos poderao ver seu recado" />
                        <div className="buttonRecado">
                            <button onClick={handleRecadoClick} className="botaoRecado">Aplicar</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


