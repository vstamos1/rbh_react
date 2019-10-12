import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import todosReducer from './todosReducer';
import jobsReducer from './jobsReducer';

export default combineReducers({
  auth: authReducer,
  todos: todosReducer,
  jobs: jobsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
