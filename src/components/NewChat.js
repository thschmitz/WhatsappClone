import React, {useState} from 'react';
import "./NewChat.css"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

export default () => {

    const [list, setList] = useState([
        {id: 123, avatar: "https://www.w3schools.com/howto/img_avatar.png", name: "Thomas Schmitz"},
        {id: 123, avatar: "https://www.w3schools.com/howto/img_avatar.png", name: "Thomas Schmitz"},
        {id: 123, avatar: "https://www.w3schools.com/howto/img_avatar.png", name: "Thomas Schmitz"},
        {id: 123, avatar: "https://www.w3schools.com/howto/img_avatar.png", name: "Thomas Schmitz"}
    ])

    return(
        <div className="newChat">
            <div className="newChat--head">
                <div className="newChat--backbutton">
                    <ArrowBackIcon style={{color: "#FFF" }}/>
                </div>
                <div className="newChat--headtitle">Nova Conversa</div>
            </div>
            <div className="newChat--list">
                {list.map((item, key) => (
                    <div className="newChat--item" key={key}>
                        <img className="newChat--itemavatar" src={item.avatar} alt=""/>
                        <div className="newChat--itemname">{item.name}</div>
                    </div>   
                ))}
            </div>
        </div>
    )
}