import {NextPage} from 'next';
import React from 'react';
import {Helmet} from 'src/components/Helmet/Helmet';
import {Motive} from 'src/components/Motive/Motive';
import {getServerSideRequest, redirectToErrorPage} from 'src/util/common';
import {request} from 'src/util/request';

interface IProps {
    motives: Motive[];
}

const MotivePage: NextPage<IProps> = ({motives}) => {
    return (
        <>
            <Helmet title="SEO.HOME.TITLE" />
            <Motive motives={motives} />
        </>
    );
};

export const getServerSideProps: AppServerSideProps<IProps> = async (context) => {
    const type = context.query.type;

    const response = await request<void, Motive[]>(
        await getServerSideRequest({
            path: `motives/${type}`,
            context,
        }),
    );
    if (response.error) return {redirect: redirectToErrorPage()};
    return {
        props: {motives: response.success?.data},
    };
};

export default MotivePage;
