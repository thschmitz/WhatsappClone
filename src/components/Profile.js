import React from 'react';


export default () => {
    return(
        <div className="profile" style={{left: show? 0:-415}}>
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
