import React, {useState, useEffect} from 'react';
import "./SelfAccount.css"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import Api from "../Api"

export default ({ user, show, setShow, data}) => {

    const [list, setList] = useState([])

    useEffect(() => {
        const getList = async() => {
            if(user !== null){
                let results = await Api.getContactList(user.id)
                setList(results)
            }
        }

        getList();
    }, [user])


    const handleClose = () => {
        setShow(false)
    }
    console.log(user)
    return(
        <div className="selfAccount" style={{left: show? 0:-415}}>
            <div className="profile--head">
                <div onClick={handleClose} className="profile--backbutton">
                    <ArrowBackIcon style={{color: "#919191" }}/>
                    <h3> Dados pessoais</h3>
                </div>
            </div>
            <div className="profile--body">
                <div className="informations">
                    <div className="image">
                        <img src={user.avatar} />
                    </div>
                    <div className="name">
                        <h3>Nome: <b>{user.name}</b></h3>
                    </div>
                    <div className="id">
                        <h3>Meu ID: <b>{user.id}</b></h3>
                    </div>
                    <div className="email">
                        <h3>Email: <b>{user.email}</b></h3>
                    </div>
                    <div className="criado">
                        <h3>Criado em: <b>{user.criado}</b></h3>
                    </div>

                </div>
            </div>
        </div>
    )
}