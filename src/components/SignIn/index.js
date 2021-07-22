import React, { useState } from 'react';
import { firebase } from '../../firebase';
import { CircularProgress } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastError, showToastSuccess } from '../utils/tools';

const SignIn = props => {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: 'adam@email.com',
            password: 'qwerty12',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('The email is required'),
            password: Yup.string().required('The password is required'),
        }),
        onSubmit: values => {
            setIsLoading(true);
            submitForm(values);
        },
    });

    const submitForm = values => {
        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                showToastSuccess('Welcome!');
                history.push('/dashboard');

                // console.log('Signed In');
                // return;
            })
            .catch(err => {
                setIsLoading(false);
                showToastError(err.message);
                // Todo: Show Toast
            });
    };

    return (
        <>
            {' '}
            {!props.user ? (
                <div className='container'>
                    <div className='signin_wrapper' style={{ margin: '100px' }}>
                        <form onSubmit={formik.handleSubmit}>
                            <h2>Login</h2>
                            <input
                                name='email'
                                placeholder='john@email.com'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />

                            {formik.touched.email && formik.errors.email ? (
                                <div className='error_label'>
                                    {formik.errors.email}
                                </div>
                            ) : null}

                            <input
                                type='password'
                                name='password'
                                placeholder='Your password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />

                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div className='error_label'>
                                    {formik.errors.password}
                                </div>
                            ) : null}

                            {isLoading ? (
                                <CircularProgress
                                    color='secondary'
                                    className='progress'
                                />
                            ) : (
                                <button type='submit'>Log In</button>
                            )}
                        </form>
                    </div>
                </div>
            ) : (
                <Redirect to='/dashboard' />
            )}
        </>
    );
};

export default SignIn;
