import classNames from 'classnames';
import React, { FC, ReactNode, useRef, useState } from 'react';
import { useKeyPress } from 'src/hooks/useKeyPress';
import useOnClickOutside from 'use-onclickoutside';

interface IProps {
    head: ReactNode;
    menu: ReactNode;
    className?: string;
    transition?: 'fade' | 'collapse';
    toggle?: boolean;
}

export const Dropdown: FC<IProps> = ({ head, menu, transition = 'fade', className = '', toggle = true }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setOpenMenu(false));
    useKeyPress('Escape', () => setOpenMenu(false));
    return (
        <a className={classNames('dropdown', className, transition, { open: openMenu })}>
            <button
                className="dropdown__head"
                type="button"
                ref={ref}
                onClick={() => setOpenMenu(toggle ? !openMenu : true)}>
                {head}
            </button>
            <div className={classNames('dropdown__menu', { open: openMenu })}>{menu}</div>
        </a>
    );
};
