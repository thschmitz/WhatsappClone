import React, {useState, useEffect, Component} from 'react';
import "./SelfAccount.css"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import Api from "../Api"
import firebase from "firebase/compat/app";
import ChatListItem from "./ChatListItem"
import "./Recado.css"




export default ({show, setShow, data, user}) => {

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
    

    return(
        <div className="recadoStatus" style={{left: show? 0:-415}}>
            <div className="newChat--head">
                <div onClick={handleClose} className="newChat--backbutton">
                    <ArrowBackIcon style={{color: "#FFF" }}/>
                </div>
                <div className="newChat--headtitle">Status</div>
            </div>
            <div className="body">
                {chatList.map((item, key) => (
                    <ChatListItem key={key} data={item}/>
                ))}
            </div>
        </div>
    )
}


