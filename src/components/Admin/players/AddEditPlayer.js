import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastError, showToastSuccess } from '../../utils/tools';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
} from '@material-ui/core';
import { playersCollection, firebase } from '../../../firebase';

const defaultValues = { name: '', lastname: '', number: '', position: '' };

const AddEditPlayer = props => {
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
                .min('0', 'Minimum cannot be less than 0')
                .max('99', 'Maximum must be below 100'),
            position: Yup.string().required('This input is required'),
        }),
    });

    useEffect(() => {
        const param = props.match.params.playerId;

        if (param) {
            setActionType('edit');
            setvalues({ name: 'Andy' });
        } else {
            setActionType('add');
            setvalues(defaultValues);
        }
    }, [props.match.params.playerId]);

    console.log(actionType, values);

    return <AdminLayout></AdminLayout>;
};

export default AddEditPlayer;
