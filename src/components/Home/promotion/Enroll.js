import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastError, showToastSuccess } from '../../utils/tools';
import { promotionsCollection } from '../../../firebase';

const Enroll = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid Email')
                .required('Your Email is required'),
        }),
        onSubmit: values => {
            setLoading(true);
        },
    });

    return (
        <Fade>
            <div className='enroll_wrapper'>
                <form onsubmit={formik.handleSubmit}>
                    <div className='enroll_title'>Enter your email</div>
                    <div className='enroll_input'>
                        <input
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder='youremail@email.com'
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <div className='error_label'>
                                {formik.errors.email}
                            </div>
                        ) : null}

                        {loading ? (
                            <CircularProgress
                                color='secondary'
                                className='progress'
                            />
                        ) : (
                            <button type='submit'>Enroll Now</button>
                        )}

                        <div className='enroll_discl '>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Commodi dolore consectetur nesciunt illum quia
                            obcaecati facilis nemo voluptates totam aut tempore
                            harum assumenda.
                        </div>
                    </div>
                </form>
            </div>
        </Fade>
    );
};

export default Enroll;
