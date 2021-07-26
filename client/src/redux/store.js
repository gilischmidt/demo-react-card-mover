import {combineReducers, createStore} from 'redux'

import cardReducer from './slices/cardSlice';
import userReducer from './slices/userSlice';
import sessionReducer from './slices/sessionSlice';

export const store = createStore(combineReducers({
    card: cardReducer,
    users: userReducer,
    session: sessionReducer,
}))