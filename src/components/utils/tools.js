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

export const Tag = props => {
    const template = (
        <div
            style={{
                background: props.bck ? props.bck : '#ffffff',
                fontSize: props.size ? props.size : '15px',
                color: props.color ? props.color : '#000000',
                padding: '5px 10px',
                display: 'inline-block',
                fontFamily: 'Righteous',
                ...props.add,
            }}
        >
            {props.children}
        </div>
    );

    if (props.link) {
        return <Link to={props.linkTo}>{template}</Link>;
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
