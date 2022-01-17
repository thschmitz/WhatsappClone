import React, {useEffect, useState} from 'react';
import "./ChatListItem.css"
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import firebaseConfig from "../firebaseConfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();

export default ({onClick, active, data, status, user}) => {

    const [time, setTime] = useState("")
    const [recado, setRecado] = useState()

    useEffect(() => {
        if(data.lastMessageDate > 0){
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours()
            let minutes = d.getMinutes();
            hours = hours < 10? "0"+hours : hours;
            minutes = minutes < 10? "0"+minutes : minutes;
            setTime(`${hours}:${minutes}`)
        }
    }, [data])

    db.collection("users").doc(data.with).onSnapshot(function(doc){
        const data = doc.data()
        const recado = data.recado
        setRecado(recado)
    })

    return(
        <div className={`chatListItem ${active? "active": ""}`} onClick={onClick}>
            <img className="chatListItem--avatar" src={data.image} alt="" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">{data.title}</div>
                    <div className="chatListItem--date">{time}</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        {
                            status?
                            <p>{recado}</p>
                            :
                            <p>{data.lastMessage}</p>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}