import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Resources/css/app.css';
import { firebase } from './firebase';

const AuthApp = props => {
    return <App {...props} />;
};

firebase.auth().onAuthStateChanged(user => {
    ReactDOM.render(<AuthApp user={user} />, document.getElementById('root'));
});
