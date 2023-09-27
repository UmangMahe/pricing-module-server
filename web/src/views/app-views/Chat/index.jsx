import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import InnerAppLayout from "../../../layouts/inner-app-layout";
import ChatContent from "./ChatContent";
import ChatMenu from "./ChatMenu";
import Conversation from "./Conversation";

import {io} from "socket.io-client";

import "react-chat-widget/lib/styles.css";

import ChatMain from "./ChatMain";
import { useSelector } from "react-redux";
import { useAxiosCallback } from "../../../utils/useFetch";
import { USER_CONVERSATIONS } from "../../../constants/ApiConstants";
import Loading from "../../../components/shared-components/Loading";
import { env } from "../../../configs/EnvironmentConfig";

// const socket = io.connect("http://localhost:3001");

const Chat = (props) => {
//   console.log(props);



// console.log(socket)

//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");
//   const [showChat, setShowChat] = useState(false);

  
//   const joinRoom = () => {
//     if (username !== "" && room !== "") {
//       socket.emit("join_room", room);
//       setShowChat(true);
//     }
//   }

  

  const {chat_user} = useSelector((state)=>state.auth)
  
  const {isLoading, callback: getConversations} = useAxiosCallback()
  const [conversations, setConversations] = useState([])

  useEffect(()=>{
    
      getConversations({
        method: 'get',
        url: `${USER_CONVERSATIONS}`,
        strategy: 'chat',
        success: (res)=>{
          setConversations(res.data)
        }
      })
    
    
  },[chat_user])

  return (
    <div className="chat">
      {!isLoading? (
        <InnerAppLayout
      
        sideContent={<ChatMenu {...props} conversations={conversations} currentUser={chat_user} />}
        mainContent={<ChatContent {...props} />}
        sideContentWidth={450}
        sideContentGutter={false}
        border
      />
      ):
      <Loading cover='content' />
      }
      

{/* {!showChat ? (
        <div className="joinChatContainer">
          <h3>Demo Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatMain socket={socket} username={username} room={room} />
      )} */}
      {/* <Switch>
			<Route path={`${props.match.url}/:id`} component={Conversation} />
			</Switch> */}
    </div>
  );
};

export default Chat;
