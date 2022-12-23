import React, {FC, ReactNode, useRef} from 'react';

export const Slider: FC<{children: ReactNode[]}> = ({children}) => {
    const listContainerRef = useRef<HTMLDivElement>(null);

    const navForward = () => {
        if (listContainerRef.current) {
            listContainerRef.current.scrollLeft -= listContainerRef.current.clientWidth * 1.04;
        }
    };

    const navBackward = () => {
        if (listContainerRef.current) {
            listContainerRef.current.scrollLeft += listContainerRef.current.clientWidth * 1.04;
        }
    };

    return (
        <div className="slider__wrapper">
            <button onClick={navForward}>
                <img src="/static/images/icons/chevron-left.svg" />
            </button>
            <div className="slider__container slider__two-el" ref={listContainerRef}>
                {children}
            </div>
            <button onClick={navBackward}>
                <img src="/static/images/icons/chevron-right.svg" />
            </button>
        </div>
    );
};
