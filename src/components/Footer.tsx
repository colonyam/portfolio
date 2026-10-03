import React, { useCallback } from 'react';
import type { AppView } from './siteConfig';
import { SITE } from './siteConfig';
import './legal.css';

interface FooterProps {
    onViewChange: (view: AppView) => void;
}

const NAV_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'what-i-do', label: 'What I Do' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
] as const;

const LEGAL_LINKS: { view: AppView; label: string }[] = [
    { view: 'privacy', label: 'Privacy Policy' },
    { view: 'terms', label: 'Terms of Service' },
    { view: 'security', label: 'Security Compliance' },
];

const iconProps = {
    width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
    'aria-hidden': true, focusable: false as const,
};

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
    const year = new Date().getFullYear();

    // Works from any view: switch to the home view first, then scroll once the section exists.
    const goToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        onViewChange('home');
        const scroll = (attempt = 0) => {
            const el = id === 'home' ? document.body : document.getElementById(id);
            if (el) {
                if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
                else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.replaceState(null, '', `#${id}`);
            } else if (attempt < 10) {
                window.setTimeout(() => scroll(attempt + 1), 50);
            }
        };
        window.setTimeout(scroll, 0);
    }, [onViewChange]);

    return (
        <footer>
            <div className="footer-container">
                <div className="footer-col">
                    <h4>{SITE.owner}</h4>
                    <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>
                        Professional software development, graphic design, and ICT support services tailored for production systems.
                    </p>
                </div>

                <div className="footer-col" role="navigation" aria-label="Footer navigation">
                    <h4>Navigation</h4>
                    <ul>
                        {NAV_LINKS.map(({ id, label }) => (
                            <li key={id}>
                                <a href={`#${id}`} onClick={(e) => goToSection(e, id)}>{label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col" role="navigation" aria-label="Legal">
                    <h4>Legal and Privacy</h4>
                    <ul>
                        {LEGAL_LINKS.map(({ view, label }) => (
                            <li key={view}>
                                <button type="button" className="footer-link-btn" onClick={() => onViewChange(view)}>
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {year} {SITE.owner}. All rights reserved.</p>
                <div className="social-icons">
                    <a href="https://github.com/colonyam" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub (opens in a new tab)">
                        <svg {...iconProps}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    </a>
                    <a href="https://linkedin.com/in/colonyam" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn (opens in a new tab)">
                        <svg {...iconProps}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                    </a>
                    <a href="https://twitter.com/colonyam" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="X / Twitter (opens in a new tab)">
                        <svg {...iconProps}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100054294135544" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook (opens in a new tab)">
                        <svg {...iconProps}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    </a>
                    <a href={`mailto:${SITE.email}`} className="social-icon-link" aria-label="Send an email">
                        <svg {...iconProps}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};