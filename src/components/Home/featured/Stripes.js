import React from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';

let stripeState = [
    {
        id: '123',
        background: '#98c5e9',
        left: 120,
        rotate: 25,
        top: -260,
        delay: 0,
    },
    {
        id: '23',
        background: '#ffffff',
        left: 360,
        rotate: 25,
        top: -394,
        delay: 200,
    },
    {
        id: '12',
        background: '#98c5e9',
        left: 600,
        rotate: 25,
        top: -498,
        delay: 400,
    },
];

const Stripes = () => {
    const handleShowStripes = () =>
        stripeState.map(stripe => (
            <Animate
                key={stripe.id}
                show={true}
                start={{
                    background: '#ffffff',
                    opacity: 0,
                    left: 0,
                    rotate: 0,
                    top: 0,
                }}
                enter={{
                    background: `${stripe.background}`,
                    opacity: [1],
                    left: [stripe.left],
                    rotate: [stripe.rotate],
                    top: [stripe.top],
                    timing: {
                        delay: stripe.delay,
                        duration: 200,
                        ease: easePolyOut,
                    },
                }}
            >
                {({ opacity, left, top, rotate, background }) => (
                    <div
                        className='stripe '
                        style={{
                            opacity,
                            transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`,
                            background,
                        }}
                    ></div>
                )}
            </Animate>
        ));

    return <div className='featured_stripes'>{handleShowStripes()}</div>;
};

export default Stripes;
