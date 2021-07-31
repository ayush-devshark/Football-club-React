import React, { useEffect, useReducer, useState } from 'react';
import { showToastError, showToastSuccess } from '../utils/tools';

import { CircularProgress } from '@material-ui/core';
import { mathchesCollection } from '../../firebase';

import LeagueTable from './Table';
import MatchesList from './MatchesList';

const TheMatches = () => {
    const [matches, setMatches] = useState(null);

    useEffect(() => {
        if (!matches) {
            mathchesCollection
                .get()
                .then(snapshot => {
                    const matches = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setMatches(matches);
                })
                .catch(err => showToastError(err));
        }
    }, [matches]);

    console.log(matches);

    return (
        <>
            {matches ? (
                <div className='the_matches_container'>
                    <div className='the_matches_wrapper'>
                        <div className='left'>list</div>
                        <div className='right'>
                            <LeagueTable />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='progress'>
                    <CircularProgress />
                </div>
            )}
        </>
    );
};

export default TheMatches;
