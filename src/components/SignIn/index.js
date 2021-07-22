import React, { useState } from 'react';
import { firebase } from '../../firebase';
import { CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignIn = props => {
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
                // props.history.push('/dashboard');
                return console.log('Signed In');
            })
            .catch(err => {
                setIsLoading(false);
                alert(err);
                // Todo: Show Toast
            });
    };

    return (
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
                        <div className='error_label'>{formik.errors.email}</div>
                    ) : null}

                    <input
                        type='password'
                        name='password'
                        placeholder='Your password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />

                    {formik.touched.password && formik.errors.password ? (
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
    );
};

export default SignIn;
