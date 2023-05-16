import React, { FC } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { homeRoute } from 'src/util/nav-routes';
import { getServerSideRequest, redirectToErrorPage } from 'src/util/common';
import { helsinkiCoordinates } from 'src/util/constants';
import { request } from 'src/util/request';

import { AppLayout } from 'src/containers/AppLayout/AppLayout';

import { LocalizedHeading } from 'src/components/LocalizedHeading';
import { LocalizedButton } from 'src/components/LocalizedButton/LocalizedButton';
import { LocalizedText } from 'src/components/LocalizedText';
import { AddImage } from 'src/components/AddImage/AddImage';
import { Dropdown } from 'src/components/Dropdown/Dropdown';
import { useAppTranslation } from 'src/hooks/useAppTranslation';

interface ResultProps {
    itemId: number;
    categoryId: number;
    problemId: number;
}

interface SkillProps {
    skillLevels: Skill[];
}

interface TypeProps {
    contentTypes: ContentType[];
}

interface ReferenceProps extends ResultProps, SkillProps, TypeProps { }



const addTutoPage: NextPage<ReferenceProps> = ({ itemId, categoryId, problemId, skillLevels, contentTypes }) => {

    const { t: trans, lang } = useAppTranslation()

    const switchHead = (id: string, dropdown: string) => {
        var header = document.getElementsByClassName(dropdown + "-dropdown__head")[0]!!;
        var headSpan = header.getElementsByTagName("span").item(0)!!;
        var newHeadSpan = document.getElementById(id)!!;

        headSpan.innerHTML = newHeadSpan.innerHTML;
        headSpan.id = newHeadSpan.id;
    }

    const router = useRouter();

    const confirm = () => {
        router.push({
            pathname: homeRoute,
        });
    };


    const confirmCreation = (problemId: number, itemId: number, categoryId: number, lang: string) => {
        var skillLevel = document
            .getElementsByClassName("skill-dropdown__head")[0]!!
            .getElementsByTagName("span").item(0)!!
            .id
            .split("skill_")[1];
        var tutoType = document
            .getElementsByClassName("type-dropdown__head")[0]!!
            .getElementsByTagName("span").item(0)!!
            .id
            .split("type_")[1];

        var iconSRC = (document.getElementsByClassName("chosen-icon").item(0)!! as HTMLImageElement).src;

        var cost = (document.getElementsByClassName("input-cost").item(0)!! as HTMLInputElement).value;

        var estTime = (document.getElementsByClassName("input-time").item(0)!! as HTMLInputElement).value;

        var desc = (document.getElementsByClassName("input-desc").item(0)!! as HTMLInputElement).value;

        var title = (document.getElementsByClassName("tuto-title").item(0)!! as HTMLInputElement).value;

        var link = (document.getElementsByClassName("tuto-link").item(0)!! as HTMLInputElement).value;

        request({
            method: "POST",
            url: "/api/results/insert",
            data: {
                problemId: problemId,
                itemId: itemId,
                categoryId: categoryId,
                contentTypeId: tutoType,
                skillLevelId: skillLevel,
                lang: lang,
                tutorialName: title,
                tutorialIntro: desc,
                tutorialUrl: link,
                tutorialImage: iconSRC,
                minCostEuro: cost,
                minTime: estTime,
            }
        })

        confirm()

    }


    const SkillMenu: FC = () => (
        <div className="skill-dropdown__menu">
            {
                skillLevels.map((skill) => (

                    <a
                        className="skill-dropdown__item"
                        key={skill.id}
                        onClick={() => switchHead("skill_" + skill.id, "skill")}
                    >
                        <span id={"skill_" + skill.id}>{skill.label}</span>
                    </a>

                ))
            }
        </div>
    );

    const TypeMenu: FC = () => (
        <div className="type-dropdown__menu">
            {contentTypes.map((type) => (
                <a
                    className="type-dropdown__item"
                    key={type.id}
                    onClick={() => switchHead("type_" + type.id, "type")}
                >

                    <span id={"type_" + type.id}>{type.label}</span>

                </a>

            ))
            }
        </div>
    );






    //   HTML CONTENT    //




    return (
        <AppLayout
            bannerContent={
                <div className="banner-container">
                    <LocalizedHeading className="items__heading" t="TUTORIAL.TITLE" heading="h1">
                    </LocalizedHeading>
                    <div className="button-container">
                        <LocalizedButton
                            variant="hollow"
                            size="large"
                            className="confirm-button"
                            onClick={() => confirmCreation(problemId, itemId, categoryId, lang)}
                        >
                            <LocalizedText t="TUTORIAL.CONFIRM_BUTTON" className="titles" />
                        </LocalizedButton>
                    </div>
                </div>
            }>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css" />
            </Head>

            <div className="header-AddImage">

                <div className="image-side">
                    <AddImage className="chosen-icon" />
                </div>
                <div className="text-side">

                    <div className="title-side">
                        <input type="text" className="tuto-title" placeholder={trans("TUTORIAL.TITLE_PLACEHOLD")} />
                    </div>
                    <div className="extra-side">
                        <input type="text" className="tuto-link" placeholder={trans("TUTORIAL.LINK_PLACEHOLD")} />
                    </div>

                </div>

            </div>
            <div className="input-and-title">
                <LocalizedText className="input-title titles" t="TUTORIAL.SKILL_LEVEL_TITLE" />
                <div className="input">
                    <Dropdown
                        className="skill-dropdown"
                        head={
                            <div className="skill-dropdown__head">
                                <span id={"skill_" + skillLevels[0].id} className="dropdown-head-text">
                                    {
                                        skillLevels[0].label
                                    }
                                </span>
                                <i className="filled-arrow down skill-arrow"></i>
                            </div>
                        }
                        menu={
                            <SkillMenu />
                        }
                    />
                </div>
            </div>

            <div className="input-and-title">
                <LocalizedText className="input-title titles" t="TUTORIAL.TYPE_TITLE" />
                <div className="input">
                    <Dropdown
                        className="type-dropdown"
                        head={
                            <div className="type-dropdown__head">
                                <span id={"type_" + contentTypes[0].id} className="dropdown-head-text">
                                    {
                                        contentTypes[0].label
                                    }
                                </span>
                                <i className="filled-arrow down skill-arrow"></i>
                            </div>
                        }
                        menu={
                            <TypeMenu />
                        }
                    />
                </div>
            </div>

            <div className="input-and-title">
                <LocalizedText className="input-title titles" t="TUTORIAL.COST_TITLE" />
                <div className="input">
                    <input className="input-cost" type="number" min="1" step="0.01" placeholder="1.00" />
                </div>
            </div>

            <div className="input-and-title">
                <LocalizedText className="input-title titles" t="TUTORIAL.TIME_ESTIMATE_TITLE" />
                <div className="input">
                    <input className="input-time" type="number" min="0" step="1" placeholder="1" />
                </div>
            </div>

            <div className="description">
                <LocalizedText className="input-title titles" t="TUTORIAL.DESCRIPTION_TITLE" />
                <div className="input">
                    <textarea className="input-desc"
                        placeholder={trans("TUTORIAL.DESCRIPTION_PLACEHOLD")}
                        cols={10} rows={10} />
                </div>
            </div>

        </AppLayout >
    );
}

export default addTutoPage;








//   GET SERVER-SIDE PROPS    //





export const getServerSideProps: AppServerSideProps<ReferenceProps> = async (context) => {
    try {
        const problemId = typeof context.query.problemId === "string" ? Number(context.query.problemId) : 0;

        let resultsPath = `results/${problemId}/${helsinkiCoordinates.latitude}/${helsinkiCoordinates.longitude}`;
        const results = await request<void, ResultProps>(
            await getServerSideRequest({
                path: resultsPath,
                context,
            }),
        );

        let skillLevelsPath = `skill-levels`;
        const skillLevels = await request<void, SkillProps>(
            await getServerSideRequest({
                path: skillLevelsPath,
                context,
            }),
        );

        let contentTypesPath = `content-types`;
        const contentTypes = await request<void, TypeProps>(
            await getServerSideRequest({
                path: contentTypesPath,
                context,
            }),
        );

        return {
            props: {
                itemId: results.success?.data.itemId || 0,
                categoryId: results.success?.data.categoryId || '',
                problemId: problemId,
                skillLevels: skillLevels.success?.data.skillLevels || [],
                contentTypes: contentTypes.success?.data.contentTypes || [],
            } as ReferenceProps,
        };
    } catch (error) {
        console.log(`Error at getServerSideProps: results page ${error}`);
        return { redirect: redirectToErrorPage() };
    }
};