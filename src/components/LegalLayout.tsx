import React, { useEffect } from 'react';
import { SITE, type AppView } from './siteConfig';
import './legal.css';

interface LegalLayoutProps {
    title: string;
    intro?: string;
    onViewChange?: (view: AppView) => void;
    children: React.ReactNode;
}

export const LegalSection: React.FC<{ heading: string; children: React.ReactNode }> = ({ heading, children }) => (
    <section>
        <h3>{heading}</h3>
        {children}
    </section>
);

export const LegalLayout: React.FC<LegalLayoutProps> = ({ title, intro, onViewChange, children }) => {
    useEffect(() => {
        const previous = document.title;
        document.title = `${title} | ${SITE.owner}`;
        window.scrollTo({ top: 0, behavior: 'auto' });
        return () => { document.title = previous; };
    }, [title]);

    return (
        <main className="wrapper" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
            <article className="card legal-page">
                {onViewChange && (
                    <button type="button" className="legal-back" onClick={() => onViewChange('home')}>
                        &larr; Back to home
                    </button>
                )}
                <h2>{title}</h2>
                <p className="legal-meta">Last updated: {SITE.legalUpdated}</p>
                {intro && <p>{intro}</p>}
                {children}
                {onViewChange && (
                    <div className="legal-nav" role="navigation" aria-label="Other legal pages">
                        <button type="button" className="legal-back" onClick={() => onViewChange('privacy')}>Privacy Policy</button>
                        <button type="button" className="legal-back" onClick={() => onViewChange('terms')}>Terms of Service</button>
                        <button type="button" className="legal-back" onClick={() => onViewChange('security')}>Security Compliance</button>
                    </div>
                )}
            </article>
        </main>
    );
};