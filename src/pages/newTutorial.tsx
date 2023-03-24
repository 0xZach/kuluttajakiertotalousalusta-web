import React from 'react';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
//import { useRouter } from 'next/router';

//import { homeRoute } from 'src/util/nav-routes';
import { getServerSideRequest, redirectToErrorPage } from 'src/util/common';
import { helsinkiCoordinates } from 'src/util/constants';
import { request } from 'src/util/request';

import { AppLayout } from 'src/containers/AppLayout/AppLayout';

import { LocalizedHeading } from 'src/components/LocalizedHeading';
//import { LocalizedButton } from 'src/components/LocalizedButton/LocalizedButton';
//import { LocalizedText } from 'src/components/LocalizedText';
import { AddImage } from 'src/components/AddImage/AddImage';





interface ReferenceProps {
    itemId: number;
    itemName: string;
    problemId: number;
}


const addTutoPage: NextPage<ReferenceProps> = ({ itemId, itemName, problemId }) => {
    //const router = useRouter();
    console.log("| " + itemId + " | " + itemName + " | " + problemId);

    /*const confirm = () => {
        router.push({
            pathname: homeRoute,
        });
    };*/

    return (
        <AppLayout
            bannerContent={
                <LocalizedHeading className="items__heading" t="TUTORIAL.TITLE" heading="h1">
                </LocalizedHeading>
            }>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css" />
            </Head>
            <div className="header-AddImage">

                <div className="image-side">
                    <AddImage />
                </div>
                <div className="text-side">

                    <div className="title-side">
                        <input type="text" className="tuto-title" placeholder="Title" />
                    </div>
                    <div className="extra-side">
                        <input type="text" className="tuto-link" placeholder="link" />
                    </div>

                </div>

            </div>
            <div className="input-and-title">
                <p className="input-title">Cost in €</p>
                <div className="input">
                    <input className="input-cost" type="number" min="1" step="0.01" placeholder="1.00" />
                </div>
            </div>

            <div className="input-and-title">
                <p className="input-title">Estimated Time</p>
                <div className="input">
                    <input className="input-time" type="text" placeholder="0h 00m" />
                </div>
            </div>

            <div className="description">
                <p className="input-title">Description</p>
                <div className="input">
                    <textarea className="input-desc"
                        placeholder="Add a description." cols={10} rows={10} />
                </div>
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