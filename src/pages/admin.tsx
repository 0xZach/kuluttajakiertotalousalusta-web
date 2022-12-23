import {NextPage} from 'next';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {LocalizedHeading} from 'src/components/LocalizedHeading';
import {showToast} from 'src/components/ShowToast/ShowToast';
import {AppLayout} from 'src/containers/AppLayout/AppLayout';
import {getServerSideRequest, runTimeServerConfig} from 'src/util/common';
import {request} from 'src/util/request';

interface IProps {
    showSuccess: boolean | null;
}

const AdminPage: NextPage<IProps> = ({showSuccess = null}) => {
    const router = useRouter();
    const [sheetId, setSheetId] = useState('');

    useEffect(() => {
        if (showSuccess === true) {
            showToast('Data populated successfully', {type: 'success'});
        }

        if (showSuccess === false) {
            showToast('Something went wrong', {type: 'error'});
        }

        if (router.query.sheetId) {
            router.push({pathname: router.pathname}, {}, {shallow: true});
        }
    }, [showSuccess]);

    return (
        <AppLayout
            bannerContent={<LocalizedHeading className="categories__heading" t="ADMIN_PAGE.TITLE" heading="h1" />}>
            <form
                className="admin-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    router.push({pathname: router.pathname, query: {sheetId}});
                }}>
                <label htmlFor="sheet-input">Sheet ID:</label>
                <input
                    id="sheet-input"
                    type="text"
                    placeholder="Enter sheet ID..."
                    value={sheetId}
                    onChange={(e) => setSheetId(e.target.value)}
                />
                <button disabled={!sheetId}>Submit</button>
            </form>
        </AppLayout>
    );
};

export const getServerSideProps: AppServerSideProps<IProps> = async (context) => {
    try {
        const sheetId = context.query.sheetId as string;
        let showSuccess = null;

        if (sheetId) {
            const response = await request<{sheetId: string}>(
                await getServerSideRequest({
                    path: 'populate-sheet-data',
                    method: 'POST',
                    headers: {
                        ['x-admin-secret']: runTimeServerConfig().ADMIN_SECRET,
                    },
                    context,
                    data: {
                        sheetId,
                    },
                }),
            );

            showSuccess = !response.error;
        }

        return {
            props: {showSuccess},
        };
    } catch (e) {
        console.log(e);
        return {
            props: {showSuccess: false},
        };
    }
};

export default AdminPage;
