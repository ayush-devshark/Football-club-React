import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import { playersCollection } from '../../../firebase';
import { showToastError } from '../../utils/tools';
import { Button } from '@material-ui/core';
import { set } from 'harmony-reflect';

const AdminPlayers = () => {
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        if (!players) {
            setLoading(true);
            playersCollection
                .limit(2)
                .get()
                .then(snapshot => {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const players = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setLastVisible(lastVisible);
                    setPlayers(players);
                })
                .catch(err => {
                    console.log(err);
                    showToastError(`${err.message}`);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [players]);
    console.log(players, { lastVisible });

    const loadMorePlayers = () => {
        if (lastVisible) {
            setLoading(true);
            playersCollection
                .startAfter(lastVisible)
                .limit(2)
                .get(2)
                .then(snapshot => {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
                    const newPlayers = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setLastVisible(lastVisible);
                    setPlayers([...players, ...newPlayers]);
                })
                .catch(err => {
                    console.log(err);
                    showToastError(`${err.message}`);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            console.log('Nothing to load');
        }
    };

    return (
        <AdminLayout title='The players'>
            <Button onClick={loadMorePlayers}>Load more</Button>
        </AdminLayout>
    );
};

export default AdminPlayers;
