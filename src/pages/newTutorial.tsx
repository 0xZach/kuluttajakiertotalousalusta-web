import React from 'react';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { homeRoute } from 'src/util/nav-routes';
import { getServerSideRequest, redirectToErrorPage } from 'src/util/common';
import { helsinkiCoordinates } from 'src/util/constants';
import { request } from 'src/util/request';

import { AppLayout } from 'src/containers/AppLayout/AppLayout';

import { LocalizedHeading } from 'src/components/LocalizedHeading';
import { LocalizedButton } from 'src/components/LocalizedButton/LocalizedButton';
import { LocalizedText } from 'src/components/LocalizedText';





interface ReferenceProps {
    itemId: number;
    itemName: string;
    problemId: number;
}


const addTutoPage: NextPage<ReferenceProps> = ({ itemId, itemName, problemId }) => {
    const router = useRouter();
    console.log("| " + itemId + " | " + itemName + " | " + problemId);

    const confirm = () => {
        router.push({
            pathname: homeRoute,
        });
    };

    return (
        <AppLayout
            bannerContent={
                <LocalizedHeading className="items__heading" t="TUTORIAL.TITLE" heading="h1">
                    <LocalizedButton variant="hollow" onClick={confirm}>
                        <LocalizedText t="TUTORIAL.ADD_NEW" />
                    </LocalizedButton>
                </LocalizedHeading>
            }>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css" />
            </Head>
            <input type="text"></input>
            <div className="home-page__content">

            </div>

        </AppLayout >
    );
}

export default addTutoPage;

export const getServerSideProps: GetServerSideProps<ReferenceProps> = async (context) => {
    try {
        const problemId = typeof context.query.problemId === "string" ? +context.query.problemId : 0;

        let resultsPath = `results/${problemId}/${helsinkiCoordinates.latitude}/${helsinkiCoordinates.longitude}`;
        const results = await request<void, ReferenceProps>(
            await getServerSideRequest({
                path: resultsPath,
                context,
            }),
        );

        return {
            props: {
                itemId: results.success?.data.itemId || 0,
                itemName: results.success?.data.itemName || '',
                problemId: problemId,
            },
        };
    } catch (error) {
        console.log(`Error at getServerSideProps: results page ${error}`);
        return { redirect: redirectToErrorPage() };
    }
};