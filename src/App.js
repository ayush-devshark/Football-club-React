import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Header_footer/Footer';
import Header from './components/Header_footer/Header';
import Home from './components/Home/index';
import SignIn from './components/SignIn/index';

function App({ user }) {
    return (
        <BrowserRouter>
            <Header user={user} />
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/sign_in'>
                    <SignIn />
                </Route>
            </Switch>
            <ToastContainer />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
