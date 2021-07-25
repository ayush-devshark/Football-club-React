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
        onSubmit: (values, { resetForm }) => {
            setLoading(true);
            submitForm(values);
        },
    });

    const submitForm = async values => {
        try {
            const isOnList = await promotionsCollection
                .where('email', '==', values.email)
                .get();

            console.log(isOnList);

            if (isOnList.docs.length >= 1) {
                showToastError('You are already on list!');
                setLoading(false);
                return false;
            }

            await promotionsCollection.add({ email: values.email });
            formik.resetForm();
            setLoading(false);
            showToastSuccess('Congratulations, you are added 😀');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Fade>
            <div className='enroll_wrapper'>
                <form onSubmit={formik.handleSubmit}>
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
