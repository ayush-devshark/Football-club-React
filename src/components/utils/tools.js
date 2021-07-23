import { Link } from 'react-router-dom';
import clubLogo from '../../Resources/images/logos/manchester_city_logo.png';
import { toast } from 'react-toastify';
import { firebase } from '../../firebase';

export const ClubLogo = props => {
    const template = (
        <div
            className='img_cover'
            style={{
                width: props.width,
                height: props.height,
                background: `url(${clubLogo}) no-repeat`,
            }}
        ></div>
    );

    if (props.link) {
        return (
            <Link className='link_logo' to={props.linkTo}>
                {template}
            </Link>
        );
    } else {
        return template;
    }
};

export const showToastError = msg => {
    toast.error(msg, {
        position: toast.POSITION.TOP_LEFT,
    });
};

export const showToastSuccess = msg => {
    toast.success(msg, {
        position: toast.POSITION.TOP_LEFT,
    });
};

export const logoutHandler = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            showToastSuccess('Signed out succesfully');
        })
        .catch(err => {
            showToastError(err.message);
        });
};
