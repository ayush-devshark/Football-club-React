import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Header_footer/Footer';
import Header from './components/Header_footer/Header';
import Home from './components/Home/index';
import SignIn from './components/SignIn/index';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/sign_in'>
                    <SignIn />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
