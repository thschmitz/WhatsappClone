import React, {useState, useEffect} from 'react';
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

export default () => {

  const handleNewChat = () => {
    setShowNewChat(true)
  }

  const [chatList, setChatList] = useState([])
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null); 
  const [showNewChat, setShowNewChat] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    if(user !== null){
      let unsub = Api.onChatList(user.id, setChatList)
      return unsub;
    }
  }, [user])

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };
    await Api.addUser(newUser)
    setUser(newUser); 
  }

  if(user===null){
    return(<Login onReceive={handleLoginData} />)
  }

  return(
    <div className="app-window">
      <div className="sidebar">

        <NewChat chatlist={chatList} user={user} show={showNewChat} setShow={setShowNewChat} />
        <header>
          <img className="header--avatar" src={user.avatar} alt="" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{color: "#919191"}} />
            </div>
            <div onClick={handleNewChat} className="header--btn">
              <ChatIcon style={{color: "#919191"}} />
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{color: "#919191"}} />
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
            <ChatListItem key={key} data={item} active={activeChat.chatId === chatList[key].chatId} onClick={()=>setActiveChat(chatList[key])}/>
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
