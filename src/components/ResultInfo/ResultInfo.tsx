import React, {FC} from 'react';
import {TranslationKeys} from 'src/hooks/useAppTranslation';
import {LocalizedContent} from '../LocalizedContent';
import {LocalizedHeading} from '../LocalizedHeading';
import {LocalizedText} from '../LocalizedText';

interface Props {
    item: string;
    problem: string;
    noResults?: boolean;
}
export const ResultInfo: FC<Props> = ({item, problem, noResults}) => {
    return (
        <div className="result-info">
            <LocalizedHeading t="KEYWORDS.DETAILS" heading="h3" />
            <div className="result-info__item">
                <LocalizedText t="KEYWORDS.ITEM" />
                <LocalizedText t={item as TranslationKeys} />
            </div>
            <div className="result-info__problem">
                <LocalizedText t="KEYWORDS.PROBLEM_TO_FIX" />
                <LocalizedText t={problem as TranslationKeys} />
            </div>
            {noResults && <LocalizedContent t="KEYWORDS.NO_RESULTS_FOUND" className="mg-t-5" />}
        </div>
    );
};
