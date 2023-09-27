import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { env } from "../../configs/EnvironmentConfig";
import { setSocket } from "../../redux/actions/Socket";
import SocketFunctions from "./SocketFunctions";

const Socket = (props) => {

    const dispatch = useDispatch()
  const {currentUser, token_chat } = useSelector((state) => state.auth);
  const[allowSocket, setAllowSocket] = useState(false)

  useEffect(() => {
    
    if (currentUser.is_admin && token_chat) {
      dispatch(setSocket(io(`${env.SOCKET_URL}`)))
      setTimeout(()=>setAllowSocket(true), 0) 
    }
  }, [token_chat, currentUser, dispatch]);


  return (
  <>
  {allowSocket && 
    <SocketFunctions {...props} />
  }
  </>
  )
};

export default Socket;
