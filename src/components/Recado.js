import React, {useState, useEffect, Component} from 'react';
import "./SelfAccount.css"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import Api from "../Api"
import ChatListItem from "./ChatListItem"
import "./Recado.css"




export default ({show, setShow, data, user}) => {

    const handleClose = () => {
        setShow(false)
    }

    const [chatList, setChatList] = useState([])
    const [status, setStatus] = useState(true)

    useEffect(() => {
        if(user !== null){
          let unsub = Api.onChatList(user.id, setChatList)
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
                    <ChatListItem key={key} data={item} status={status} />
                ))}
            </div>
        </div>
    )
}


