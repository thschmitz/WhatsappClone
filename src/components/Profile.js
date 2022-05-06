import React, {useEffect, useState} from 'react';
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import "./Profile.css"
import Api from '../Api';
import ChatListItem from "./ChatListItem"
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import firebaseConfig from "../firebaseConfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();

export default ({show, setShow, data, user}) => {

    const [recado, setRecado] = useState()
    const [avatar, setAvatar] = useState()

    const handleClose = () => {
        setShow(false)
    }

    const [chatList, setChatList] = useState([])

    useEffect(() => {
        if(user !== null){
          let unsub = Api.onChatList(data.with, setChatList)
          return unsub;
        }
      }, [user])

    db.collection("users").doc(data.with).onSnapshot(function(doc){
        const data = doc.data()
        const recado = data.recado
        const avatar = data.avatar
        setAvatar(avatar)
        setRecado(recado)
    })



    return(
        <div className="profile">
            <div className="profile--head">
                <div onClick={handleClose} className="profile--backbutton">
                    <ArrowBackIcon style={{color: "#919191" }}/>
                    <h3>Dados do contato</h3>
                </div>
            </div>
            <div className="profile--body">
                <div className="informations">
                    <div className="image">
                        <img src={avatar} />
                        <h3>{recado}</h3>
                    </div>
                    <div className="name">
                        <h3>Nome: <b>{data.title}</b></h3>
                    </div>
                    <div className="id">
                        <h3>ID do usuario: <b>{data.with}</b></h3>
                    </div>
                    <div className="celular">
                        {}
                    </div>
                    <div className="contatos">
                        <h2>Contatos</h2>
                    {chatList.map((item, key) => (
                        <ChatListItem key={key} data={item}/>
                    ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
