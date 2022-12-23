import React from 'react';
import {getDomainFromURL} from 'src/util/common';
import {Image} from '../Image/Image';

export const TutorialCard: React.FC<TutorialCardProps> = ({name, intro, url, contentType, minSkill, image}) => {
    return (
        <a className="tutorial-card" href={url} target="_blank" rel="noreferrer">
            <Image src={image || '/static/images/default-image.jpg'} height={150} width={150} />
            <div className="tutorial-card__content">
                <h2 title={name} className="tutorial-title">
                    {name}
                </h2>
                <span className="tutorial-intro">{intro}</span>
                <span className="tutorial-domain">
                    <span>{getDomainFromURL(url)}</span>
                    <span>{minSkill}</span>
                </span>
                <span className="tutorial-type">{contentType}</span>
            </div>
        </a>
    );
};
