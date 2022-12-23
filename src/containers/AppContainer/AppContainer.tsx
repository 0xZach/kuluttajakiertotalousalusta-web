import React from 'react';
import {Loader} from 'src/components/Loader/Loader';
import {useLoadingRouter} from 'src/hooks/useLoadingRouter';
import {usePersistLocaleCookie} from 'src/hooks/usePersistedLocaleCookie';

export const AppContainer: React.FC = ({children}) => {
    const loading = useLoadingRouter();
    usePersistLocaleCookie();

    return (
        <>
            {children}
            {loading && <Loader />}
        </>
    );
};
