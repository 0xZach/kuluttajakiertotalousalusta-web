import React from 'react';
import { getDomainFromURL } from 'src/util/common';
import { request } from 'src/util/request';
import { Image } from '../Image/Image';

export const TutorialCard: React.FC<TutorialCardProps> = ({ result, skill, type }) => {

    /*
     * Goal: create logs of the actions in the result page and send them
     * with a post request to the database.
     *
     */
    const logsPostReq = (resultId: number) => {

        // get today's date in the format "yyyy-mm-dd"
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()
        var date = yyyy + "-" + mm + "-" + dd

        // send the post request
        request({
            method: "POST",
            data: {
                logTimestamp: date,
                serviceOrTutorial: "tutorial",
                resultId: resultId,
            },
            url: '/api/logs/insert',
        })
    }


    return (
        <a className="tutorial-card" href={result.tutorialUrl} target="_blank" rel="noreferrer"
            onClick={
                () => logsPostReq(result.id) // pass string|undefined as string
            }>
            <Image src={result.tutorialImage || '/static/images/default-image.jpg'} height={150} width={150} />
            <div className="tutorial-card__content">
                <h2 title={result.tutorialName} className="tutorial-title">
                    {result.tutorialName}
                </h2>
                <span className="tutorial-intro">{result.tutorialIntro}</span>
                <span className="tutorial-domain">
                    <span>{getDomainFromURL(result.tutorialUrl)}</span>
                    <span>{skill.label}</span>
                </span>
                <span className="tutorial-type">{type!!.label}</span>
            </div>
        </a>
    );
};
