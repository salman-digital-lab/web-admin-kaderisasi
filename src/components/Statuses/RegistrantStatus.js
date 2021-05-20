import { Chip } from '@material-ui/core';

export const RegistrantStatus = (props) => {
    switch (props.status) {
        case 'rejected':
        return <Chip className="error" label={props.status}/>;
        case 'failed':
        return <Chip className="secondary" label={props.status}/>;
        case 'registered':
        return <Chip className="waiting" label={props.status}/>;
        case 'passed':
        return <Chip className="success" label={props.status}/>;
        default:
        return <Chip color="primary" label={props.status}/>;
    }
};