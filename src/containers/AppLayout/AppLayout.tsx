import Link from 'next/link';
import React, {ReactNode} from 'react';
import {LanguageDropdown} from 'src/components/LanguageDropdown/LanguageDropdown';

interface IProps {
    bannerContent: ReactNode;
    className?: string;
    showLanguageMenu?: boolean;
}

export const AppLayout: React.FC<IProps> = ({children, bannerContent, className, showLanguageMenu = false}) => {
    return (
        <main className={`app-layout ${className}`}>
            <header>
                <div>
                    <Link href={'/'}>
                        <a>
                            <img src="/static/images/logo.png" />
                        </a>
                    </Link>
                </div>
                {showLanguageMenu && <LanguageDropdown />}
            </header>
            <section className="app-layout__banner">
                <div>{bannerContent}</div>
            </section>
            <section className="app-layout__content">{children}</section>
        </main>
    );
};
