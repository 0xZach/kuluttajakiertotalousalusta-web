import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Helmet } from 'src/components/Helmet/Helmet';
import { ServicesList } from 'src/components/ServicesList/ServicesList';
import { getIpFromNextRequest, getServerSideRequest, redirectToErrorPage, runTimeSharedConfig } from 'src/util/common';
import { helsinkiCoordinates } from 'src/util/constants';
import { request } from 'src/util/request';

interface ResultProps {
    results: Result[];
    services: Service[];
    itemName: string;
    problemName: string;
    municipalities: Postal[];
}

interface IProps {
    services: Service[];
    municipalities: Postal[];
}

const ServicesPage: NextPage<IProps> = ({ services, municipalities }) => {
    return (
        <>
            <Helmet title="SERVICES.TITLE" />
            <ServicesList services={services} municipalities={municipalities} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
    try {
        const problemId = context.query.problemId;

        const ip = getIpFromNextRequest(context.req);

        const ipLocation = await request<ApiRequest, IPLocationResponse>({
            url: `${runTimeSharedConfig().APP_URL}/api/ip-location/${ip}`,
            method: 'GET',
        });

        let resultsPath = `results/${problemId}/${helsinkiCoordinates.latitude}/${helsinkiCoordinates.longitude}`;

        if (ipLocation.success) {
            resultsPath = `results/${problemId}/${ipLocation.success.data.latitude}/${ipLocation.success.data.longitude}`;
        }

        const results = await request<void, ResultProps>(
            await getServerSideRequest({
                path: resultsPath,
                context,
            }),
        );

        return {
            props: {
                services: results.success?.data.services || [],
                municipalities: results.success?.data.municipalities || [],
            },
        };
    } catch (error) {
        console.log(`Error at getServerSideProps: results page ${error}`);
        return { redirect: redirectToErrorPage() };
    }
};

export default ServicesPage;
