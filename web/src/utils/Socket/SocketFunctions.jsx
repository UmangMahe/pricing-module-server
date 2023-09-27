import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useLocation } from "react-router-dom";
import { APP_PREFIX_PATH } from "../../configs/AppConfig";
import { USER_CONVERSATIONS } from "../../constants/ApiConstants";
import {
  setArrivalMessage,
  setSingleUnreadMessages,
  setUnreadMessages,
} from "../../redux/actions/Socket";
import { useAxiosCallback } from "../useFetch";

function SocketFunctions(props) {

  
  const {socket} = useSelector((state) => state.socket);

  console.log(socket)
  const { chat_user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const match = matchPath(location.pathname, {
    path: APP_PREFIX_PATH + "/chat",
  });

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", chat_user._id);
      socket.on("getUsers", (users) => {
        console.log(users);
      });
    }
  }, [socket, chat_user]);

  const { callback: getUnseenMessages } = useAxiosCallback();

  useEffect(() => {
    
    getUnseenMessages({
      method: "get",
      url: `${USER_CONVERSATIONS}`,
      strategy: "chat",
      success: (res) => {
        const totalUnreadCount = res.data
          .map((item) => item.unseenMessages)
          .reduce((a, b) => a + b, 0);

        dispatch(setUnreadMessages(totalUnreadCount));
      },
    });
  }, []);

  const { unreadMessages, singleUnreadMsg } = useSelector(
    (state) => state.socket
  );

  useEffect(() => {
  
      socket?.on("getMessage", (data) => {
        const { senderId, convId } = data;
        
        if (!match || !location.pathname.includes(convId)) {
          message.info("You have new messages");
          dispatch(setUnreadMessages(unreadMessages + 1));
          dispatch(setSingleUnreadMessages(senderId, singleUnreadMsg[senderId] + 1));
          
        } else {
          const arrivalMessage = {
            _id: data.id,
            sender: data.senderId,
            message: data.message,
            createdAt: Date.now(),
          };
          dispatch(setArrivalMessage(arrivalMessage));
        }
      });

    

    return () => {
      socket?.off("getMessage");
    };
  });

  return <></>;
}

export default SocketFunctions;
