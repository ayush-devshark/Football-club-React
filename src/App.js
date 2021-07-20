import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Header_footer/Footer';
import Header from './components/Header_footer/Header';
import Home from './components/Home/index';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/users' component=''></Route>
                <Route path='/'></Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
