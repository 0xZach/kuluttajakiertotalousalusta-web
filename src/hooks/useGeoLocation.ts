import {useState} from 'react';
import {useEffectOnce} from './useEffectOnce';

export const useGeoLocation = () => {
    const [coords, setCoords] = useState<Coordinates | null>(null);

    const updatelocation = () => {
        if (typeof navigator !== 'undefined') {
            navigator.geolocation?.getCurrentPosition((geolocation) => {
                const {latitude, longitude} = geolocation.coords;
                setCoords({latitude, longitude});
            });
        }
    };

    useEffectOnce(() => {
        updatelocation();
        if (typeof navigator !== 'undefined') {
            navigator.permissions?.query({name: 'geolocation'}).then((permissionStatus) => {
                permissionStatus.onchange = () => {
                    updatelocation();
                };
            });
        }
    }, []);

    return coords;
};
