import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Socket from './Socket'

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    socket: Socket 
});

export default reducers;