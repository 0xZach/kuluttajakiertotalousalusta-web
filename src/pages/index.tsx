import {NextPage} from 'next';
import React from 'react';
import {Helmet} from 'src/components/Helmet/Helmet';
import {HomePage} from 'src/components/HomePage/HomePage';

const Homepage: NextPage = () => {
    return (
        <>
            <Helmet title="SEO.HOME.TITLE" />
            <HomePage />
        </>
    );
};

export default Homepage;
