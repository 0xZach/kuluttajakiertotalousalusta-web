import React from 'react';
import { Image } from '../Image/Image';
type IProps = ServiceCardProps & { onCardClick?: React.MouseEventHandler<HTMLButtonElement> };

export const ServiceCard: React.FC<IProps> = ({
    name,
    address,
    municipality,
    phone,
    serviceTypeName,
    image = '/static/images/default-image.jpg',
    onCardClick,
}) => {
    return (
        <button
            className="service-card"
            onClick={(e) => {
                onCardClick?.(e);
                const targetElement = e.target as TargetElement;
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            }}>
            <Image src={image} height={150} width={150} />
            <div className="service-card__content">
                <h2 title={name} className="service-title">
                    {name}
                </h2>
                <span className="service-municipality">{municipality}</span>
                <span className="service-address">{address}</span>
                <span className="service-phone">{phone}</span>
                <span className="service-type">{serviceTypeName}</span>
            </div>
        </button>
    );
};
