import {
    SOCKET, UNREADMSG, SINGLEUNREADMSG, ARRIVALMESSAGE, INCUNREADMSG
} from '../constants/Socket';


export const setSocket = (socket)=>{
    return {
        type: SOCKET,
        socket
    }
}

export const setUnreadMessages = (unreadMessages)=>{
    return {
        type: UNREADMSG,
        unreadMessages
    }
}


export const incrementUnreadMessages = ()=>{
    return {
        type: INCUNREADMSG
    }
}

export const decrementUnreadMessages = ()=>{
    return {
        type: DECUNREADMSG
    }
}

export const setSingleUnreadMessages = (convId, unreadMessages)=>{
    return {
        type: SINGLEUNREADMSG,
        convId,
        unreadMessages
    }
}

export const setArrivalMessage = (arrivalMessage)=>{
    return {
        type: ARRIVALMESSAGE,
        arrivalMessage
    }
}