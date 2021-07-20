import React from 'react';
import { ClubLogo } from '../utils/tools';

const Footer = () => {
    return (
        <footer className='bck_blue'>
            <div className='footer_logo'>
                <ClubLogo
                    link={false}
                    linkTo={'/'}
                    width='70px'
                    height='70px'
                />
            </div>
            <div className='footer_desc1'>
                Manchester city 2021 &copy; All Rights Reserved.{' '}
            </div>
        </footer>
    );
};

export default Footer;
