import React from 'react';
import { getDomainFromURL } from 'src/util/common';
import { request } from 'src/util/request';
import { Image } from '../Image/Image';

export const TutorialCard: React.FC<TutorialCardProps> = ({ name, intro, url, contentType, minSkill, image }) => {

    /*
     * Goal: create logs of the actions in the result page and send them
     * with a post request to the database.
     *
     */
    const logsPostReq = (nextUrl: string, name: string, type: string) => {

        // get today's date in the format "yyyy-mm-dd"
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()
        var date = yyyy + "-" + mm + "-" + dd

        // fetch the keywords from the current url
        var paramsUrl = new URLSearchParams(window.location.search)
        var keyEn = paramsUrl.get("keywordEn")
        var keyFi = paramsUrl.get("keywordFi")

        // send the post request
        request({
            method: "POST",
            data: {
                logsTime: date,
                keywordEn: keyEn,
                keywordFi: keyFi,
                destinationUrl: nextUrl,
                serviceName: name,
                serviceTypeName: type,
            },
            url: '/api/logs/insert',
        })
    }


    return (
        <a className="tutorial-card" href={url} target="_blank" rel="noreferrer"
            onClick={
                () => logsPostReq(url, name, (contentType !== undefined) ? contentType : "") // pass string|undefined as string
            }>
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
