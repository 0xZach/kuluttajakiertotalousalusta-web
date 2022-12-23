import {NextPage} from 'next';
import React from 'react';
import {Helmet} from 'src/components/Helmet/Helmet';

interface IProps {
    statusCode: number;
}

const Error: NextPage<IProps> = (props): JSX.Element => {
    return (
        <>
            <Helmet title="SEO.ERROR_PAGE.TITLE" />
            <p>
                {props.statusCode ? `An error ${props.statusCode} occurred on server` : 'An error occurred on client'}
            </p>
        </>
    );
};

Error.getInitialProps = ({res, err}) => {
    let statusCode = 404;
    if (res) {
        statusCode = res.statusCode;
    } else if (err) {
        statusCode = err.statusCode || 404;
    }
    return {statusCode};
};

export default Error;
