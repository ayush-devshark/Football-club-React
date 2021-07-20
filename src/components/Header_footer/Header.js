import React from 'react';
import { Toolbar, AppBar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ClubLogo } from '../utils/tools';

const Header = () => {
    return (
        <AppBar
            position='fixed'
            style={{
                backgroundColor: '#98c5e9',
                boxShadow: 'none',
                padding: '10px 0px',
                borderBottom: '2px solid #00285e',
            }}
        >
            <Toolbar style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                    <div className='header_logo'>
                        <ClubLogo
                            link={true}
                            linkTo={'/'}
                            width='70px'
                            height='70px'
                        />
                    </div>
                </div>

                <Link to='/the_team'>
                    <Button color='inherit'>The team</Button>
                </Link>
                <Link to='/the_matches'>
                    <Button color='inherit'>Matches</Button>
                </Link>
                <Link to='/dashboard'>
                    <Button color='inherit'>Dashboard</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
