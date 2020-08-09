import authReducer from './authReducer';
import todoReducer from './todoReducer';
import categoryReducer from './categoryReducer'
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; 
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    todos: todoReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    categories: categoryReducer
});

export default rootReducer