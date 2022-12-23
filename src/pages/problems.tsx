import {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';
import {Helmet} from 'src/components/Helmet/Helmet';
import {LocalizedHeading} from 'src/components/LocalizedHeading';
import {ProblemList} from 'src/components/ProblemList/ProblemList';
import {AppLayout} from 'src/containers/AppLayout/AppLayout';
import {getServerSideRequest, redirectToErrorPage} from 'src/util/common';
import {resultsRoute} from 'src/util/nav-routes';
import {request} from 'src/util/request';

interface IProps {
    problems: Problem[];
}

const ProblemPage: NextPage<IProps> = ({problems}) => {
    const router = useRouter();

    const onSelect = (id: number, appProblemId: number) => {
        const getProblemByLang = (lang: Locales) =>
            problems.find((problem) => problem.appProblemId === appProblemId && problem.lang === lang);

        const problemEn = getProblemByLang('en-GB');
        const problemFi = getProblemByLang('fi-FI');

        router.push({
            pathname: resultsRoute,
            query: {
                problemId: id,
                keywordEn: `${problemEn?.searchTerms} ${router.query.keywordEn} ${problemEn?.problem}`,
                keywordFi: `${problemFi?.searchTerms} ${router.query.keywordFi} ${problemFi?.problem}`,
            },
        });
    };
    return (
        <AppLayout
            bannerContent={<LocalizedHeading className="problems__heading" t="CATEGORY.SELECT_PROBLEM" heading="h1" />}>
            <Helmet title="SEO.HOME.TITLE" />
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css" />
            </Head>
            <ProblemList problems={problems} onClick={onSelect} />
        </AppLayout>
    );
};

export const getServerSideProps: AppServerSideProps<IProps> = async (context) => {
    const appItemId = context.query.appItemId;

    const response = await request<void, Problem[]>(
        await getServerSideRequest({
            path: `problems/${appItemId}`,
            context,
        }),
    );
    if (response.error) return {redirect: redirectToErrorPage()};
    return {
        props: {problems: response.success.data},
    };
};

export default ProblemPage;
