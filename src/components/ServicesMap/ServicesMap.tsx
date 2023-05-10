import React, { FC, useRef } from 'react';
import { LocalizedHeading } from '../LocalizedHeading';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet, { Map, Marker as EMarker } from 'leaflet';
import { latLng2TileUrl, runTimeSharedConfig } from 'src/util/common';
import { Slider } from '../Slider/Slider';
import { ServiceCard } from '../ServiceCard/ServiceCard';
import { useRouter } from 'next/router';
import { useAppTranslation } from 'src/hooks/useAppTranslation';
import { request } from 'src/util/request';

interface IProps {
    centerCoordinates: Coordinates;
    zoom?: number;
    services: Service[];
    municipalities: Postal[];
}

const ServicesMap: FC<IProps> = ({ centerCoordinates, zoom = 10, services, municipalities }) => {
    const mapRef = useRef<Map | null>(null);
    const markersRef = useRef<EMarker[]>([]);
    const router = useRouter();
    const { t } = useAppTranslation();

    const flyToLocation = (marker?: EMarker) => {
        const map = mapRef.current;

        if (marker) {
            map?.flyTo?.(marker.getLatLng(), 16);
            marker.openPopup();
        }
    };




    /*
     * Goal: create logs of the actions in the result page and send them
     * with a post request to the database.
     *
     */
    const logsPostReq = (resultId: number) => {

        // get today's date in the format "yyyy-mm-dd"
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var date = yyyy + "-" + mm + "-" + dd;

        // send the post request
        request({
            method: "POST",
            data: {
                logTimestamp: date,
                serviceOrTutorial: "service",
                resultId: resultId,
            },

            url: '/api/logs/insert',
        });
    }
    return (
        <div className="results-map">
            <div className="results-map__heading">
                <LocalizedHeading t="KEYWORDS.SERVICES" heading="h3" />
                <button onClick={() => router.push({ pathname: '/services', query: router.query })}>
                    {t('LIST_VIEW')}
                </button>
            </div>
            <MapContainer
                ref={mapRef}
                center={[Number(centerCoordinates.latitude), Number(centerCoordinates.longitude)]}
                zoom={zoom}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={runTimeSharedConfig().OSM_TILES_SERVER} />
                {services.map((service, idx) => (
                    <Marker
                        ref={(element) => (markersRef.current[idx] = element as EMarker)}
                        key={idx}
                        title={service.name}
                        icon={Leaflet.icon({
                            iconUrl: '/static/images/icons/location-marker.svg',
                            iconSize: [32, 32],
                        })}
                        position={[Number(service.latitude), Number(service.longitude)]}>
                        <Popup>
                            <a href={service.url} target="__blank"
                                onClick={
                                    () => logsPostReq(service.id)
                                } >
                                {service.name}
                            </a>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {
                services.length > 0 && (
                    <Slider>
                        {services.map((service, idx) => (
                            <ServiceCard
                                key={idx}
                                name={service.name}
                                address={service.address}
                                municipality={municipalities[idx].municipality}
                                serviceTypeName={service.serviceTypeName}
                                phone={service.phone}
                                image={latLng2TileUrl(service.latitude, service.longitude)}
                                onCardClick={() => {
                                    flyToLocation(markersRef.current[idx]);
                                }}
                            />
                        ))}
                    </Slider>
                )
            }
        </div >
    );
};




export default ServicesMap;
