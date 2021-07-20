import { Link } from 'react-router-dom';
import clubLogo from '../../Resources/images/logos/manchester_city_logo.png';

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
