import React, {useState, useEffect} from 'react';
import "./NewChat.css"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import Api from "../Api"
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import firebaseConfig from "../firebaseConfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
export default ({ user, show, setShow}) => {

    const [list, setList] = useState([])
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        const getList = async() => {
            if(user !== null){
                let results = await Api.getContactList(user.id)
                setList(results)
            }
        }

        db.collection("users").doc(user.id).onSnapshot( function (doc){
            const data = doc.data()
            const avatar = data.avatar
            setAvatar(avatar)
        })

        getList();
    }, [user])

    const addNewChat = async (user2) => {

        await Api.addNewChat(user, user2, avatar);

        handleClose();
    }

    const handleClose = () => {
        setShow(false)
    }

    return(
        <div className="newChat" style={{left: show? 0:-415}}>
            <div className="newChat--head">
                <div onClick={handleClose} className="newChat--backbutton">
                    <ArrowBackIcon style={{color: "#FFF" }}/>
                </div>
                <div className="newChat--headtitle">Nova Conversa</div>
            </div>
            <div className="newChat--list">
                {list.map((item, key) => (
                    <div onClick={() => addNewChat(item)} className="newChat--item" key={key}>
                        <img className="newChat--itemavatar" src={item.avatar} alt=""/>
                        <div className="newChat--itemname">{item.name}</div>
                    </div>   
                ))}
            </div>
        </div>
    )
}