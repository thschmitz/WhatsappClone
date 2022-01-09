import React from 'react';
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import "./Profile.css"

export default ({show, setShow, data, user}) => {

    const handleClose = () => {
        setShow(false)
    }

    return(
        <div className="profile">
            <div className="profile--head">
                <div onClick={handleClose} className="profile--backbutton">
                    <ArrowBackIcon style={{color: "#919191" }}/>
                    <h3> Dados do contato</h3>
                </div>
                <div className="informations">
                    <div className="image">
                        <img src={data.image} />
                    </div>
                    <div className="name">
                        <h3>Nome: {data.title}</h3>
                    </div>
                    <div className="id">
                        <h3>ID do usuario: {user.id}</h3>
                    </div>
                    <div className="celular">
                        {}
                    </div>
                </div>
            </div>
        </div>
    )
}
