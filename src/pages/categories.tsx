import {NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';
import {CategoryList} from 'src/components/CategoryList/CategoryList';
import {Helmet} from 'src/components/Helmet/Helmet';
import {LocalizedHeading} from 'src/components/LocalizedHeading';
import {AppLayout} from 'src/containers/AppLayout/AppLayout';
import {getServerSideRequest, redirectToErrorPage} from 'src/util/common';
import {itemsRoute} from 'src/util/nav-routes';
import {request} from 'src/util/request';

interface IProps {
    categories: Category[];
}

const CategoryPage: NextPage<IProps> = ({categories}) => {
    const router = useRouter();

    const onSelect = (appId: number) => {
        const getCategoryNameByLang = (lang: Locales) =>
            categories.find((cat) => cat.appId === appId && cat.lang === lang)?.name;

        router.push({
            pathname: itemsRoute,
            query: {
                appCategoryId: appId,
                keywordEn: getCategoryNameByLang('en-GB'),
                keywordFi: getCategoryNameByLang('fi-FI'),
            },
        });
    };

    return (
        <AppLayout
            bannerContent={
                <LocalizedHeading className="categories__heading" t="CATEGORY.SELECT_CATEGORIES" heading="h1" />
            }>
            <Helmet title="SEO.HOME.TITLE" />
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css" />
            </Head>
            <CategoryList categories={categories} onClick={onSelect} />
        </AppLayout>
    );
};

export const getServerSideProps: AppServerSideProps<IProps> = async (context) => {
    const response = await request<void, Category[]>(
        await getServerSideRequest({
            path: 'categories',
            context,
        }),
    );
    if (response.error) return {redirect: redirectToErrorPage()};
    return {
        props: {categories: response.success.data.map((data) => ({...data, appId: data.appCategoryId!}))},
    };
};

export default CategoryPage;
