import React from 'react';
import ArrowBackIcon from "@material-ui/icons/ArrowBack"


export default ({show, setShow}) => {

    const handleClose = () => {
        setShow(false)
    }

    return(
        <div className="profile">
            <div className="profile--head">
                <div onClick={handleClose} className="profile--backbutton">
                    <ArrowBackIcon style={{color: "#FFF" }}/>
                </div>
                <div className="profile--headtitle">Perfil</div>
            </div>
            <div className="profile--informations"/>
        </div>
    )
}
