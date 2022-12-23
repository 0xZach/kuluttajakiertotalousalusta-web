import {useRouter} from 'next/router';
import React, {FC} from 'react';
import {AppLayout} from 'src/containers/AppLayout/AppLayout';
import {useAppTranslation} from 'src/hooks/useAppTranslation';
import {categoriesRoute} from 'src/util/nav-routes';
import {LocalizedButton} from '../LocalizedButton/LocalizedButton';
import {LocalizedHeading} from '../LocalizedHeading';
import {LocalizedText} from '../LocalizedText';

export const HomePage: FC = () => {
    const router = useRouter();
    const {t} = useAppTranslation();
    const subtitles = t<string[]>('HOME_PAGE.SUBTITLES', undefined, {returnObjects: true});

    const bannerContent = (
        <div className="home-page__banner">
            <LocalizedHeading t="HOME_PAGE.HEADING" heading="h1" />
            {subtitles.map((sub, index) => {
                return <span key={index}>{sub}</span>;
            })}
        </div>
    );

    return (
        <AppLayout bannerContent={bannerContent} showLanguageMenu={true}>
            <div className="home-page__mobile-content">
                {subtitles.map((sub, index) => {
                    return <span key={index}>{sub}</span>;
                })}
            </div>
            <div className="home-page__content">
                <LocalizedButton
                    variant="hollow"
                    onClick={() => {
                        router.push(categoriesRoute);
                    }}>
                    <LocalizedText t="HOME_PAGE.WANT_TO_FIX" />
                </LocalizedButton>
            </div>
        </AppLayout>
    );
};
