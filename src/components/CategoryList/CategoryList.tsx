import React from 'react';
import {useAppTranslation} from 'src/hooks/useAppTranslation';

interface IProps {
    categories: Category[];
}

interface ISharedProps {
    onClick: (appCategoryId: number) => void;
}

const CategoryItem: React.FC<Category & ISharedProps> = ({name, appId, icon, onClick}) => {
    return (
        <button className="category-item" onClick={() => onClick(appId)}>
            <i className={icon}></i>
            <p>{name}</p>
        </button>
    );
};

export const CategoryList: React.FC<IProps & ISharedProps> = ({categories, onClick}) => {
    const {lang} = useAppTranslation();
    return (
        <div className="category-list">
            <div className="category-list__container">
                {categories
                    .filter((cat) => cat.lang === lang)
                    .map((data) => {
                        return <CategoryItem key={data.id} {...data} onClick={onClick} />;
                    })}
            </div>
        </div>
    );
};
