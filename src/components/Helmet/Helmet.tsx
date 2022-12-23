import React, {FC} from 'react';
import Head from 'next/head';
import {useAppTranslation} from 'src/hooks/useAppTranslation';

export interface IHelmet {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const Helmet: FC<IHelmet> = ({title = 'Kimppakyydit', description, keywords, image, url}) => {
    const {t: translate} = useAppTranslation();
    const localizedTitle = translate(title);
    const localizedDescription = translate(description || '');
    const localizedKeywords = translate(keywords || '');
    return (
        <Head>
            <title>{localizedTitle}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" about="about" />
            <meta name="description" content={localizedDescription}></meta>
            <meta property="og:title" content={localizedTitle}></meta>
            <meta name="twitter:title" content={localizedTitle}></meta>
            <meta property="og:description" content={localizedDescription}></meta>
            <meta name="twitter:description" content={localizedDescription}></meta>
            <meta property="og:image" content={image}></meta>
            <meta name="twitter:image" content={image}></meta>
            <meta property="og:url" content={url}></meta>
            <meta name="twitter:url" content={url} />
            <meta name="keywords" content={localizedKeywords} />
        </Head>
    );
};

export {Helmet};
