import React, {FC} from 'react';
import {useAppTranslation} from 'src/hooks/useAppTranslation';
import {TutorialCard} from '../TutorialCard/TutorialCard';

interface IProps {
    tutorials: Result[];
}

export const TutorialsList: FC<IProps> = ({tutorials}) => {
    const {t} = useAppTranslation();

    return (
        <div className="tutorials-listing">
            <h3 className="mg-v-5">{t('TUTORIALS')}</h3>
            <div className="tutorials-listing__list">
                {tutorials.map((tutorial) => (
                    <TutorialCard
                        key={tutorial.id}
                        name={tutorial.tutorialName}
                        intro={tutorial.tutorialName}
                        url={tutorial.tutorialUrl}
                        minSkill={tutorial.minSkill}
                        image={tutorial.tutorialImage}
                        contentType={tutorial.contentType}
                    />
                ))}
            </div>
        </div>
    );
};
