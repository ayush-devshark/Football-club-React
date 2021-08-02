import React, { useEffect, useReducer, useState } from 'react';
import { showToastError, showToastSuccess } from '../utils/tools';

import { CircularProgress } from '@material-ui/core';
import { mathchesCollection } from '../../firebase';

import LeagueTable from './Table';
import MatchesList from './MatchesList';

const TheMatches = () => {
    const [matches, setMatches] = useState(null);

    const [state, dispatch] = useReducer(
        (prevState, nextState) => {
            return { ...prevState, ...nextState };
        },
        {
            filterMatches: null,
            palyedFilter: 'All',
            resultFilter: 'All',
        }
    );

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
                    dispatch({ ...state, filterMatches: matches });
                })
                .catch(err => showToastError(err));
        }
    }, [matches, state]);

    const showPlayed = played => {
        const list = matches.filter(match => match.final === played);

        dispatch({
            ...state,
            filterMatches: played === 'All' ? matches : list,
            palyedFilter: played,
            resultFilter: 'All',
        });
    };

    const showResult = result => {
        const list = matches.filter(match => match.result === result);
        dispatch({
            ...state,
            filterMatches: result === 'All' ? matches : list,
            palyedFilter: 'All',
            resultFilter: result,
        });
    };

    console.log(state.filterMatches);

    return (
        <>
            {matches ? (
                <div className='the_matches_container'>
                    <div className='the_matches_wrapper'>
                        <div className='left'>
                            <div className='match_filters'>
                                <div className='match_filters_box'>
                                    <div className='tag'>Show Matches</div>
                                    <div className='cont'>
                                        <div
                                            className={`option ${
                                                state.palyedFilter === 'All'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                showPlayed('All');
                                            }}
                                        >
                                            All
                                        </div>
                                        <div
                                            className={`option ${
                                                state.palyedFilter === 'yes'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                showPlayed('yes');
                                            }}
                                        >
                                            Played
                                        </div>
                                        <div
                                            className={`option ${
                                                state.palyedFilter === 'no'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                showPlayed('no');
                                            }}
                                        >
                                            Not Played
                                        </div>
                                    </div>
                                </div>

                                <div className='match_filters_box'>
                                    <div className='tag'>Result game</div>
                                    <div className='cont'>
                                        <div
                                            className={`option ${
                                                state.resultFilter === 'All'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                showResult('All');
                                            }}
                                        >
                                            All
                                        </div>
                                        <div
                                            className={`option ${
                                                state.resultFilter === 'W'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                showResult('W');
                                            }}
                                        >
                                            W
                                        </div>
                                        <div
                                            className={` option ${
                                                state.resultFilter === 'L'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                showResult('L');
                                            }}
                                        >
                                            L
                                        </div>
                                        <div
                                            className={` option ${
                                                state.resultFilter === 'D'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                showResult('D');
                                            }}
                                        >
                                            D
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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
