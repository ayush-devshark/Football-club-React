import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';
import { playersCollection } from '../../../firebase';
import { showToastError } from '../../utils/tools';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';

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
            showToastError('Nothing to load');
        }
    };

    return (
        <AdminLayout title='The players'>
            <div className='mb-5'>
                <Button
                    disableElevation
                    variant='outlined'
                    component={Link}
                    to='/admin_players/add_player'
                >
                    Add player
                </Button>
            </div>

            <Paper className='mb-5'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>Last name</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Position</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players
                            ? players.map(player => (
                                  <TableRow key={player.id}>
                                      <TableCell>
                                          <Link
                                              to={`/admin_players/edit_player/${player.id}`}
                                          >
                                              {player.name}
                                          </Link>
                                      </TableCell>
                                      <TableCell>
                                          <Link
                                              to={`/admin_players/edit_player/${player.id}`}
                                          >
                                              {player.lastname}
                                          </Link>
                                      </TableCell>
                                      <TableCell>{player.number}</TableCell>
                                      <TableCell>{player.position}</TableCell>
                                  </TableRow>
                              ))
                            : null}
                    </TableBody>
                </Table>
            </Paper>

            <Button
                variant='contained'
                color='primary'
                disabled={loading}
                onClick={loadMorePlayers}
            >
                Load more
            </Button>
        </AdminLayout>
    );
};

export default AdminPlayers;
