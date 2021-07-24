import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { mathchesCollection } from '../../../firebase';
import MatchesBlock from '../../utils/matches_block';

const Blocks = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        if (!matches.length > 0) {
            mathchesCollection
                .get()
                .then(snapshot => {
                    const matches = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setMatches(matches);
                })
                .catch(err => console.log(err));
        }
    }, [matches]);

    const showMatches = matches => {
        if (matches) {
            return matches.map(match => (
                <Slide bottom key={match.id} className='item' triggerOnce>
                    <div>
                        <div className='wrapper'>
                            <MatchesBlock match={match} />
                        </div>
                    </div>
                </Slide>
            ));
        }
    };

    return <div className='home_matches'>{showMatches(matches)}</div>;
};

export default Blocks;
