import {GetServerSideProps, NextPage} from 'next';
import {useRouter} from 'next/router';
import React from 'react';
import {Helmet} from 'src/components/Helmet/Helmet';
import {LocalizedHeading} from 'src/components/LocalizedHeading';
import {ResultInfo} from 'src/components/ResultInfo/ResultInfo';
import dynamic from 'next/dynamic';
import {AppLayout} from 'src/containers/AppLayout/AppLayout';
import {getIpFromNextRequest, getServerSideRequest, redirectToErrorPage, runTimeSharedConfig} from 'src/util/common';
import {getLocaleCode, helsinkiCoordinates} from 'src/util/constants';
import {request} from 'src/util/request';
import {TutorialsList} from 'src/components/TutorialsList/TutorialsList';
import {useAppTranslation} from 'src/hooks/useAppTranslation';
import {CountryFlag} from 'src/components/LanguageDropdown/LanguageDropdown';
import {countryCodes} from 'src/util/language';

interface ResultProps {
    results: Result[];
    services: Service[];
    itemName: string;
    problemName: string;
}
interface IProps extends ResultProps {
    ipLocation: Coordinates;
}

const Results: NextPage<IProps> = ({ipLocation, results, itemName, problemName, services}) => {
    const router = useRouter();
    const {t} = useAppTranslation();

    const getSearchUrlByLang = (lang: Locales) =>
        `https://www.google.com/search?q=${encodeURI(
            `${router.query[lang === 'en-GB' ? 'keywordEn' : 'keywordFi']}?`,
        )}&hl=${getLocaleCode(lang)}&lr=lang_${getLocaleCode(lang)}`;

    const ServicesMap = dynamic(() => import('../components/ServicesMap/ServicesMap'), {ssr: false});

    return (
        <AppLayout
            className="results-page"
            bannerContent={<LocalizedHeading className="problems__heading" t="KEYWORDS.RESULT" heading="h1" />}>
            <Helmet title="SEO.HOME.TITLE" />
            <ResultInfo item={itemName} problem={problemName} noResults={results.length === 0} />
            <ServicesMap centerCoordinates={ipLocation} services={services} />
            <div className="results-page__search-buttons">
                <a target="_blank" rel="noreferrer" href={getSearchUrlByLang('en-GB')}>
                    <span>{t('MAKE_GOOGLE_SEARCH')}</span>
                    <CountryFlag lang={countryCodes['en']} />
                </a>
                <a target="_blank" rel="noreferrer" href={getSearchUrlByLang('fi-FI')}>
                    <span>{t('MAKE_GOOGLE_SEARCH')}</span>
                    <CountryFlag lang={countryCodes['fi']} />
                </a>
            </div>
            <TutorialsList tutorials={results} />
        </AppLayout>
    );
};

export default Results;

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
    try {
        const problemId = context.query.problemId;

        const ip = getIpFromNextRequest(context.req);

        const ipLocation = await request<ApiRequest, IPLocationResponse>({
            url: `${runTimeSharedConfig().APP_URL}/api/ip-location/${ip}`,
            method: 'GET',
        });

        let resultsPath = `results/${problemId}/${helsinkiCoordinates.latitude}/${helsinkiCoordinates.longitude}`;

        let location = {
            latitude: helsinkiCoordinates.latitude,
            longitude: helsinkiCoordinates.longitude,
        };

        if (ipLocation.success) {
            resultsPath = `results/${problemId}/${ipLocation.success.data.latitude}/${ipLocation.success.data.longitude}`;

            location = {
                latitude: ipLocation.success.data.latitude,
                longitude: ipLocation.success.data.longitude,
            };
        }

        const results = await request<void, ResultProps>(
            await getServerSideRequest({
                path: resultsPath,
                context,
            }),
        );

        return {
            props: {
                ipLocation: location,
                results: results.success?.data.results || [],
                services: results.success?.data.services || [],
                itemName: results.success?.data.itemName || '',
                problemName: results.success?.data.problemName || '',
            },
        };
    } catch (error) {
        console.log(`Error at getServerSideProps: results page ${error}`);
        return {redirect: redirectToErrorPage()};
    }
};
