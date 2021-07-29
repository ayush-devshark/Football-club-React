import React, { useEffect, useState } from 'react';
import PlayerCard from '../utils/PlayerCard';
import { Slide } from 'react-awesome-reveal';
import { firebase, playersCollection } from '../../firebase';
import { showToastError } from '../utils/tools';
import { Promise } from 'core-js';

const TheTeam = () => {
    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        if (!players) {
            playersCollection
                .get()
                .then(snapshot => {
                    const players = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    let promises = [];

                    players.forEach((player, index) => {
                        promises.push(
                            new Promise((resolve, reject) => {
                                firebase
                                    .storage()
                                    .ref('players')
                                    .child(player.image)
                                    .getDownloadURL()
                                    .then(url => {
                                        players[index].url = url;
                                        resolve();
                                    })
                                    .catch(err => {
                                        reject();
                                    });
                            })
                        );
                    });

                    Promise.all(promises).then(() => setPlayers(players));
                })
                .catch(err => {
                    showToastError('Please try again later');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [players]);

    return <div></div>;
};

export default TheTeam;
