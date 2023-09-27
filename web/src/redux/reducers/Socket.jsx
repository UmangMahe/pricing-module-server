import {
    SOCKET, UNREADMSG, SINGLEUNREADMSG, ARRIVALMESSAGE
} from '../constants/Socket'


const initState = {
    socket: null,
    unreadMessages: 0,
    singleUnreadMsg: {} || 0,
    arrivalMessage: null
        
}


const socket = (state=initState, action)=>{
    switch(action.type){
        case SOCKET:
            return { 
                ...state,
                socket: action.socket
            }
        case UNREADMSG: 
            if(action.unreadMessages <=0 ){
                return {
                    ...state,
                    unreadMessages: 0
                }   
            }
            return {
                ...state,
                unreadMessages: action.unreadMessages
            }
        case SINGLEUNREADMSG:
            return {
                ...state,
                singleUnreadMsg: {
                    ...state.singleUnreadMsg,
                    [action.convId]: action.unreadMessages
                }
            }
        case ARRIVALMESSAGE:
            return {
                ...state,
                arrivalMessage: action.arrivalMessage
            }

        default: return state
        }

    }

export default socket;
