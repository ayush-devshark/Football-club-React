import React, { useEffect, useState } from 'react';
import FileUpload from '../../utils/fileUploader';
import AdminLayout from '../../../Hoc/AdminLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    showToastError,
    showToastSuccess,
    textErrorHelper,
    selectErrorHelper,
    selectIsError,
} from '../../utils/tools';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
} from '@material-ui/core';
import { playersCollection } from '../../../firebase';

const defaultValues = { name: '', lastname: '', number: '', position: '' };

const AddEditPlayer = props => {
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState('');
    const [values, setvalues] = useState(defaultValues);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            name: Yup.string().required('This input is required'),
            lastname: Yup.string().required('This input is required'),
            number: Yup.number()
                .required('This input is required')
                .min(0, 'Minimum cannot be less than 0')
                .max(99, 'Maximum must be below 100'),
            position: Yup.string().required('This input is required'),
        }),
        onSubmit: values => {
            submitForm(values);
        },
    });

    const submitForm = values => {
        let dataToSubmit = values;

        if (actionType === 'add') {
            setLoading(true);
            playersCollection
                .add(dataToSubmit)
                .then(() => {
                    showToastSuccess('Player successfully added');
                    formik.resetForm();
                    props.history.push('/admin_players');
                })
                .catch(err => {
                    showToastError(err);
                });
        } else {
            playersCollection
                .doc(props.match.params.playerId)
                .update(dataToSubmit)
                .then(() => {
                    showToastSuccess('Player updated');
                })
                .catch(err => showToastError(err))
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        const param = props.match.params.playerId;

        if (param) {
            playersCollection
                .doc(param)
                .get()
                .then(snapshot => {
                    if (snapshot.data()) {
                        setActionType('edit');
                        setvalues(snapshot.data());
                    } else {
                        showToastError('Sorry, nothing was found');
                    }
                })
                .catch(err => {
                    showToastError(err);
                });
        } else {
            setActionType('add');
            setvalues(defaultValues);
        }
    }, [props.match.params.playerId]);

    return (
        <AdminLayout
            title={actionType === 'add' ? 'Add player' : 'Edit player'}
        >
            <div className='editplayers_dialog_wrapper'>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FileUpload dir='player' />
                        </FormControl>
                        <hr />
                        <h4>Player info</h4>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    id='name'
                                    name='name'
                                    variant='outlined'
                                    placeholder='Add firstname'
                                    {...formik.getFieldProps('name')}
                                    {...textErrorHelper(formik, 'name')}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    id='lastname'
                                    name='lastname'
                                    variant='outlined'
                                    placeholder='Add lastname'
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper(formik, 'lastname')}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl>
                                <TextField
                                    type='number'
                                    id='number'
                                    name='number'
                                    variant='outlined'
                                    placeholder='Add number'
                                    {...formik.getFieldProps('number')}
                                    {...textErrorHelper(formik, 'number')}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-5'>
                            <FormControl
                                error={selectIsError(formik, 'poistion')}
                            >
                                <Select
                                    id='position'
                                    name='position'
                                    variant='outlined'
                                    displayEmpty
                                    {...formik.getFieldProps('position')}
                                >
                                    <MenuItem value='' disabled>
                                        Select a position
                                    </MenuItem>
                                    <MenuItem value='Keeper'>Keeper</MenuItem>
                                    <MenuItem value='Defence'>Defence</MenuItem>
                                    <MenuItem value='Midfield'>
                                        Midfield
                                    </MenuItem>
                                    <MenuItem value='Striker'>Striker</MenuItem>
                                </Select>
                                {selectErrorHelper(formik, 'position')}
                            </FormControl>
                        </div>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={loading}
                        >
                            {actionType === 'add'
                                ? 'Add player'
                                : 'Edit player'}
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddEditPlayer;
