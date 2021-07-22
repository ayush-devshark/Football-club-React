import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Header_footer/Footer';
import Header from './components/Header_footer/Header';
import Home from './components/Home/index';
import SignIn from './components/SignIn/index';
import Dashboard from './components/Admin/Dashboard';
import AuthGuard from './Hoc/Auth';

function App({ user }) {
    return (
        <BrowserRouter>
            <Header user={user} />
            <Switch>
                <Route
                    path='/dashboard'
                    exact
                    component={AuthGuard(Dashboard)}
                />
                <Route
                    path='/sign_in'
                    exact
                    component={props => <SignIn {...props} user={user} />}
                />
                <Route path='/' exact component={Home} />
            </Switch>
            <ToastContainer />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
