import React, {useState, useEffect, useRef} from 'react';
import "./App.css"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchIcon from "@material-ui/icons/Search"
import ChatIntro from "./components/ChatIntro"
import ChatListItem from "./components/ChatListItem"
import ChatWindow from "./components/ChatWindow"
import NewChat from "./components/NewChat"
import Login from "./components/Login"
import Api from './Api';
import Profile from "./components/Profile"
import Popover from "@material-ui/core/Popover"
import SelfAccount from "./components/SelfAccount"
import Recado from "./components/Recado"
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import firebaseConfig from "./firebaseConfig"

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
export default () => {
  const [chatList, setChatList] = useState([])
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null); 
  const [showNewChat, setShowNewChat] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showBars, setShowBars] = useState(false)
  const [showSelfAccount, setShowSelfAccount] = useState(false)
  const [showRecado, setShowRecado] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const ref = useRef(null)


  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      email: u.email,
      criado: u.metadata.creationTime,
    };
    await Api.addUser(newUser)
    setUser(newUser); 
  }

  useEffect(() => {
    if(user !== null){
      db.collection("users").doc(user.id).onSnapshot((doc) => {
        const data = doc.data()
        const avatar = data.avatar
        setAvatar(avatar)
      })
      let unsub = Api.onChatList(user.id, setChatList)
      return unsub;
    }
  }, [user])



  if(user===null){
    return(<Login onReceive={handleLoginData} setUser={setUser} />)
  }
  const handleNewChat = () => {
    setShowNewChat(true)
  }

  const handleOpenBars = () => {
    setShowBars(true)
  }

  const handleCloseBars = () => {
    setShowBars(false)
  }

  const deslogar = () => {
    setUser(null)
    setShowBars(false)
  }


  const handleOpenSelfAccount = () => {
    setShowSelfAccount(true)
  }

  const handleOpenRecado = () => {
    setShowRecado(true)
  }


  return(
    <div className="app-window">
      <div className="sidebar">

        <NewChat chatlist={chatList} user={user} show={showNewChat} setShow={setShowNewChat} />
        <SelfAccount user={user} data={activeChat} setAvatar={setAvatar} avatar={avatar} show={showSelfAccount} setShow={setShowSelfAccount}/>
        <Recado user={user} data={activeChat} show={showRecado} setShow={setShowRecado} />
        <header>
          <img className="header--avatar" onClick={handleOpenSelfAccount} src={avatar} alt="" />
          <div className="header--buttons">
            <div className="header--btn">
              <a><DonutLargeIcon onClick={handleOpenRecado} style={{color: "#919191"}} /></a>
            </div>
            <div onClick={handleNewChat} className="header--btn">
              <a><ChatIcon style={{color: "#919191"}} /></a>
            </div>
            <div className="header--btn">
              <a><MoreVertIcon className="menu" onClick={handleOpenBars} ref={ref} style={{color: "#919191"}} /></a>
              <Popover className="menu--btn" anchorEl={ref.current} open={showBars} onClose={handleCloseBars} anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            >
              <p>Status de outras pessoas</p>
              <p>Conta</p>
              <p onClick={deslogar}>Deslogar</p>
            </Popover>
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize="small" style={{color: "#919191"}} />
            <input type="search" placeholder="Procurar ou comecar uma nova conversa" /> 
          </div>
        </div>

        <div className="chatlist">
          {chatList.map((item, key) => (
            <ChatListItem user={user} key={key} data={item} active={activeChat.chatId === chatList[key].chatId} onClick={()=>setActiveChat(chatList[key])}/>
          ))}
        </div>

      </div>

      <div className="contentarea">

        {activeChat.chatId !== undefined &&
          <ChatWindow setShow={setShowProfile} user={user} data={activeChat}/>
        }

        {activeChat.chatId === undefined && 
          <ChatIntro/>        
        }
      </div>
        {
          (showProfile)?
          <Profile setShow={setShowProfile} data={activeChat} user={user}/>
          :
          ""
        }

    </div>
  )
}
