import AvatarStatus from "@components/shared-components/AvatarStatus";
import { Badge } from "antd";
import { COLOR_1 } from "@constants/ChartConstant";
import { useAxiosCallback } from "@utils/useFetch";

import { USERS } from "@constants/ApiConstants";
import React, { useEffect, useState } from "react";
import Utils from "@utils";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setArrivalMessage,
  setSingleUnreadMessages,
  setUnreadMessages,
} from "../../../../redux/actions/Socket";

const UserInfo = ({ conversation, currentUser, match }) => {
  const { isLoading, callback: getConversationUser } = useAxiosCallback();

  const [user, setUser] = useState([]);
  const [unReadCount, setUnreadCount] = useState(0);

  const dispatch = useDispatch();
  const { singleUnreadMsg, unreadMessages } = useSelector((state) => state.socket);

  const getTheOtherId = (conversation) => {
    return conversation.members.find((id) => id !== currentUser.id);
  };

  useEffect(() => {
    const theOtherId = getTheOtherId(conversation);
    getConversationUser({
      method: "GET",
      strategy: "chat",
      url: `${USERS}?userId=${theOtherId}`,
      success: (res) => {
        setUser(res.user);
      },
    });

    
    dispatch(setSingleUnreadMessages(theOtherId, conversation.unseenMessages));
    // dispatch(setUnreadMessages(unreadMessages - conversation.unseenMessages));
    return () => {
      // getConversationUser.cancel()
    };
  }, [conversation, currentUser]);

  const history = useHistory();

  const openChat = (id) => {
    dispatch(setSingleUnreadMessages(getTheOtherId(conversation), 0));
    dispatch(setUnreadMessages(unreadMessages - conversation.unseenMessages));
    
    history.push(`${match.url}/${id}`);
  };

  return (
    <div
      key={`chat-item-${conversation._id}`}
      onClick={() => {
        openChat(conversation._id);
       
      }}
      className={`chat-menu-list-item`}
      // className={`chat-menu-list-item ${i === (item.length - 1) ? 'last' : ''} ${item._id === id ? 'selected' : ''}`}
    >
      <AvatarStatus
        loading={isLoading}
        src={user?.image || Utils.getAvatar(user?.name)}
        name={user?.name}
      />
      <div className="text-right">
        <Badge
        title="Unread Messages"
          count={singleUnreadMsg[getTheOtherId(conversation)]}
          style={{ backgroundColor: COLOR_1 }}
        />
      </div>
    </div>
  );
};

export default UserInfo;
