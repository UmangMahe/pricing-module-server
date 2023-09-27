import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Route, Switch, } from 'react-router-dom';
import Conversation from './Conversation';
import {useAxiosCallback} from '@utils/useFetch'
import { CHAT_API_URL } from '../../../configs/AppConfig';
import { USER_CONVERSATIONS } from '../../../constants/ApiConstants';

const ConversationEmpty = () => (
  <div className="chat-content-empty">
    <div className="text-center">
      <img src="/img/others/img-11.png" alt="Start a Conversation" />
      <h1 className="font-weight-light">Start a conversation</h1>
    </div>
  </div>
)

const ChatContent = ({match}) => {
  
  

    return (
    <Switch>
      <Route path={`${match.url}/:id`} component={Conversation} />
      <Route path={`${match.url}`} component={ConversationEmpty} />
    </Switch>
  )
}

export default ChatContent
