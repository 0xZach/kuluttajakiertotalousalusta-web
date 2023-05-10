import React, { FC } from 'react';
import { useAppTranslation } from 'src/hooks/useAppTranslation';
import { TutorialCard } from '../TutorialCard/TutorialCard';

interface IProps {
    tutorials: Result[];
    skillLevels: Skill[];
    contentTypes: ContentType[];
}

export const TutorialsList: FC<IProps> = ({ tutorials, skillLevels, contentTypes }) => {
    const { t } = useAppTranslation();

    return (
        <div className="tutorials-listing">
            <h3 className="mg-v-5">{t('TUTORIALS')}</h3>
            <div className="tutorials-listing__list">
                {tutorials.map((tutorial, idx) => (
                    <TutorialCard
                        result={tutorial}
                        skill={skillLevels[idx]}
                        type={contentTypes[idx]}
                    />
                ))}
            </div>
        </div>
    );
};
