import React, { FC } from 'react';
import { AppLayout } from 'src/containers/AppLayout/AppLayout';
import { latLng2TileUrl } from 'src/util/common';
import { LocalizedHeading } from '../LocalizedHeading';
import { ServiceCard } from '../ServiceCard/ServiceCard';

interface IProps {
    services: Service[];
    municipalities: Postal[];
}

export const ServicesList: FC<IProps> = ({ services, municipalities }) => {
    const bannerContent = <LocalizedHeading t="SERVICES.HEADING" heading="h1" />;

    return (
        <AppLayout bannerContent={bannerContent}>
            <div className="services-listing__list">
                {services.map((service, idx) => (
                    <a key={service.id} href={service.url} target="_blank" rel="noreferrer">
                        <ServiceCard
                            name={service.name}
                            image={latLng2TileUrl(service.latitude, service.longitude)}
                            address={service.address}
                            municipality={municipalities[idx].municipality}
                            phone={service.phone}
                            serviceTypeName={service.serviceTypeName}
                        />
                    </a>
                ))}
                {!services.length && <LocalizedHeading heading="h3" t="KEYWORDS.NO_RESULTS_FOUND" />}
            </div>
        </AppLayout>
    );
};
