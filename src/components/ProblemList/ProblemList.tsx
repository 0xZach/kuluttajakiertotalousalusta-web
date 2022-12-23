import React from 'react';
import {useAppTranslation} from 'src/hooks/useAppTranslation';

interface IProps {
    problems: Problem[];
}

interface ISharedProps {
    onClick: (id: number, appProblemId: number) => void;
}

const ProblemItem: React.FC<Problem & ISharedProps> = ({id, problem, appProblemId, icon, onClick}) => {
    return (
        <button className="problem-item" onClick={() => onClick(id, appProblemId)}>
            <i className={icon}></i>
            <p>{problem}</p>
        </button>
    );
};

export const ProblemList: React.FC<IProps & ISharedProps> = ({problems, onClick}) => {
    const {lang} = useAppTranslation();

    return (
        <div className="problem-list">
            <div className="problem-list__container">
                {problems
                    .filter((problem) => problem.lang === lang)
                    .map((data) => {
                        return <ProblemItem key={data.id} {...data} onClick={onClick} />;
                    })}
            </div>
        </div>
    );
};
