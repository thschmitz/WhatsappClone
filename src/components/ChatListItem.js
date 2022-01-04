import React from 'react';
import "./ChatListItem.css"

export default ({onClick, active}) => {
    return(
        <div className={`chatListItem ${active? "active": ""}`} onClick={onClick}>
            <img className="chatListItem--avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">Thomas Schmitz</div>
                    <div className="chatListItem--date">19:00</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        <p>Opa, tudo bem?Opa, tudo bem?Opa, tudo bem?Opa, tudo bem?Opa, tudo bem?Opa, tudo bem?Opa, tudo bem?Opa, tudo bem?Opa, tudo bem?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}