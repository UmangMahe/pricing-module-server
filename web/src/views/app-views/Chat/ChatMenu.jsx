import React, { useEffect, useState } from 'react'
import ChatData from "@assets/data/chat.data.json"
import { Badge, Input } from 'antd';
import { COLOR_1 } from '@constants/ChartConstant';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { useAxiosCallback } from '../../../utils/useFetch';
import { USERS, USER_CONVERSATIONS } from '../../../constants/ApiConstants';
import UserInfo from './UserInfo';
import Loading from '../../../components/shared-components/Loading';
import { io } from 'socket.io-client';
import { env } from '../../../configs/EnvironmentConfig';

const socket = io(`${env.SOCKET_URL}`);
const ChatMenu = ({location, conversations, currentUser, ...props }) => {

	const [list, setList] = useState(conversations);
	let history = useHistory();
	console.log(socket)
	const {isLoading, callback: getConversations} = useAxiosCallback()

  useEffect(()=>{
    socket.on('updateUsers', ()=>{
      getConversations({
        method: 'get',
        url: `${USER_CONVERSATIONS}`,
        strategy: 'chat',
        success: (res)=>{
		  setList(res.data)
        }
      })
    })
    
  },[socket, currentUser])


	const searchOnChange = e => {
		const query = e.target.value;
		const data = conversations.filter(item => {
			return query === ''? item : item.name.toLowerCase().includes(query)
		})
		setList(data)
	}

	const id = parseInt(location.pathname.match(/\/([^/]+)\/?$/)[1])

	const getUserData=(item)=>{
		console.log(item)
	}

	return (
		<div className="chat-menu">
			<div className="chat-menu-toolbar">
				<Input 
					placeholder="Search" 
					onChange={searchOnChange}
					prefix={
						<SearchOutlined className="font-size-lg mr-2"/>
					}
				/>
			</div>
			<div className="chat-menu-list">

				{	list.map( (item, i) => (
						<UserInfo key={i} currentUser={currentUser} conversation={item} {...props} />
					))
				}
			</div>
		</div>
	)
}

export default ChatMenu
