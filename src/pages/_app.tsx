import React from 'react';
import {AppProps} from 'next/app';
import '../styles/main.scss';
import {runTimeSharedConfig} from 'src/util/common';
import Head from 'next/head';
import {AppContainer} from 'src/containers/AppContainer/AppContainer';
import {ToastContainer} from 'react-toastify';

const GTM_KEY = runTimeSharedConfig().GOOGLE_TAG_MANAGER_KEY;

let favIconType: 'dark' | 'light';
if (typeof window !== 'undefined') {
    favIconType = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
}

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <>
            <Head>
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTM_KEY}`} />
                <script>
                    {`window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GTM_KEY}');`}
                </script>
                <link rel="icon" type="image/ico" sizes="32x32" href={`/static/images/favicon-${favIconType}.ico`} />
            </Head>
            <ToastContainer />
            <AppContainer>
                <Component {...pageProps} />
            </AppContainer>
        </>
    );
};

export default MyApp;
