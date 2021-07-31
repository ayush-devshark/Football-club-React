import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Header_footer/Footer';
import Header from './components/Header_footer/Header';
import Home from './components/Home/index';
import SignIn from './components/SignIn/index';
import TheTeam from './components/theTeam';
import TheMatches from './components/theMatches';

import AuthGuard from './Hoc/Auth';

import Dashboard from './components/Admin/Dashboard';
import AdminPlayers from './components/Admin/players';
import AdminMatches from './components/Admin/matches';
import AddEditMatch from './components/Admin/matches/AddEditMatch';
import AddEditPlayer from './components/Admin/players/AddEditPlayer';

function App({ user }) {
    return (
        <BrowserRouter>
            <Header user={user} />
            <Switch>
                <Route
                    path='/admin_matches/edit_match/:matchId'
                    exact
                    component={AuthGuard(AddEditMatch)}
                />
                <Route
                    path='/admin_matches/add_match'
                    exact
                    component={AuthGuard(AddEditMatch)}
                />
                <Route
                    path='/admin_matches'
                    exact
                    component={AuthGuard(AdminMatches)}
                />

                <Route
                    path='/admin_players/edit_player/:playerId'
                    exact
                    component={AuthGuard(AddEditPlayer)}
                />
                <Route
                    path='/admin_players/add_player'
                    exact
                    component={AuthGuard(AddEditPlayer)}
                />
                <Route
                    path='/admin_players'
                    exact
                    component={AuthGuard(AdminPlayers)}
                />

                <Route path='/dashboard' component={AuthGuard(Dashboard)} />
                <Route path='/the_matches' component={TheMatches} />
                <Route path='/the_team' component={TheTeam} />

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
