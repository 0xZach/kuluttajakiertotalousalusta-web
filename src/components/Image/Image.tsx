import React, {FC} from 'react';
import NextImage, {ImageProps} from 'next/image';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;
export const Image: FC<Props> = ({alt = '', ...props}) => {
    return <img alt={alt} {...props} />;
};

export const OptimizedImage: FC<ImageProps> = ({alt = '', ...props}) => {
    return <NextImage alt={alt} {...props} />;
};
