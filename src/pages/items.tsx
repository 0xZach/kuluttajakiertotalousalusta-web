import {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';
import {CategoryList} from 'src/components/CategoryList/CategoryList';
import {Helmet} from 'src/components/Helmet/Helmet';
import {LocalizedHeading} from 'src/components/LocalizedHeading';
import {AppLayout} from 'src/containers/AppLayout/AppLayout';
import {getServerSideRequest, redirectToErrorPage} from 'src/util/common';
import {problemsRoute} from 'src/util/nav-routes';
import {request} from 'src/util/request';

interface IProps {
    items: Category[];
}

const ItemPage: NextPage<IProps> = ({items}) => {
    const router = useRouter();

    const onSelect = (appId: number) => {
        const getItemNameByLang = (lang: Locales) =>
            items.find((item) => item.appId === appId && item.lang === lang)?.name;

        router.push({
            pathname: problemsRoute,
            query: {
                appItemId: appId,
                keywordEn: `${router.query.keywordEn} ${getItemNameByLang('en-GB')}`,
                keywordFi: `${router.query.keywordFi} ${getItemNameByLang('fi-FI')}`,
            },
        });
    };

    return (
        <AppLayout
            bannerContent={<LocalizedHeading className="items__heading" t="CATEGORY.SELECT_ITEMS" heading="h1" />}>
            <Helmet title="SEO.HOME.TITLE" />
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css" />
            </Head>
            <CategoryList categories={items} onClick={onSelect} />
        </AppLayout>
    );
};

export const getServerSideProps: AppServerSideProps<IProps> = async (context) => {
    const appCategoryId = context.query.appCategoryId;

    const response = await request<void, Category[]>(
        await getServerSideRequest({
            path: `items/${appCategoryId}`,
            context,
        }),
    );
    if (response.error) return {redirect: redirectToErrorPage()};
    return {
        props: {items: response.success.data.map((data) => ({...data, appId: data.appItemId!}))},
    };
};

export default ItemPage;
