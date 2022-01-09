import React, {useEffect, useState} from 'react';
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import "./Profile.css"
import Api from '../Api';
import ChatListItem from "./ChatListItem"

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
        <div className="profile">
            <div className="profile--head">
                <div onClick={handleClose} className="profile--backbutton">
                    <ArrowBackIcon style={{color: "#919191" }}/>
                    <h3> Dados do contato</h3>
                </div>
            </div>
            <div className="profile--body">
                <div className="informations">
                    <div className="image">
                        <img src={data.image} />
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
