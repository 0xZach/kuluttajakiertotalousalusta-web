import {useRouter} from 'next/router';
import React, {FC} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {AppLayout} from 'src/containers/AppLayout/AppLayout';
import {TranslationKeys} from 'src/hooks/useAppTranslation';
import {homeRoute} from 'src/util/nav-routes';
import {request} from 'src/util/request';
import {LocalizedButton} from '../LocalizedButton/LocalizedButton';
import {LocalizedHeading} from '../LocalizedHeading';
import {LocalizedText} from '../LocalizedText';
import {ControlledMultipleCheckboxes} from '../MultipleCheckboxes/MultipleCheckboxes';

interface IProps {
    motives: Motive[];
}

export enum MotiveType {
    WantToFix = 'want_to_fix',
    ShareExperience = 'share_experience',
    ImproveBusiness = 'improve_business',
}

export const Motive: FC<IProps> = ({motives}) => {
    const methods = useForm<MotivePayload>({
        shouldUnregister: true,
        mode: 'onChange',
    });

    const type = motives[0].motiveCategory;
    const submitButtonText = `MOTIVE.${type?.toUpperCase()}.BUTTON` as TranslationKeys;
    const subtitlesText = `MOTIVE.${type?.toUpperCase()}.SUBTITLES` as TranslationKeys;
    const router = useRouter();

    const onSubmit = async (data: MotivePayload) => {
        await request<MotivePayload, unknown>({
            path: 'update-hits',
            method: 'POST',
            data,
        });
        router.push(homeRoute);
    };

    const bannerContent = <LocalizedHeading t="MOTIVE.HEADING" heading="h1" />;
    const options = motives.map(({id, motive}) => ({
        value: id,
        label: `MOTIVE.${type?.toUpperCase()}.ITEMS.${motive.toUpperCase()}`,
    }));
    return (
        <AppLayout bannerContent={bannerContent}>
            <div className="motive__list">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} id="motive-form">
                        <ControlledMultipleCheckboxes
                            size="large"
                            options={options}
                            name="motiveIds"
                            isRequired={true}
                        />
                    </form>
                </FormProvider>
            </div>
            <div className="motive__button-container">
                <LocalizedText t={subtitlesText} />
                <LocalizedButton type="submit" variant="hollow" onClick={() => console.log('')} form="motive-form">
                    <LocalizedText t={submitButtonText} />
                </LocalizedButton>
            </div>
        </AppLayout>
    );
};
