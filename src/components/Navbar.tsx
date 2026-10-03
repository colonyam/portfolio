import React, { useEffect, useRef, useState } from 'react';

interface NavbarProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    currentView?: string; // lets the active-link highlight reset when a legal page opens
}

const LINKS = [
    { href: '#home', label: 'Home' },
    { href: '#what-i-do', label: 'What I Do' },
    { href: '#courses', label: 'Courses' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#partners', label: 'Partners' },
    { href: '#insights', label: 'Insights' },
    { href: '#contact', label: 'Contact' },
] as const;

const SECTION_IDS = LINKS.map((l) => l.href.slice(1));
const ACTIVE_OFFSET = 120; // px below the top of the screen where a section counts as "current"

/** The section the visitor is reading, or '' when none of the home sections are on the page. */
const findActiveSection = (): string => {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (nearBottom) {
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
            if (document.getElementById(SECTION_IDS[i])) return SECTION_IDS[i];
        }
        return '';
    }
    let current = '';
    for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
    }
    return current;
};

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, currentView }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeId, setActiveId] = useState('');
    const navRef = useRef<HTMLElement>(null);

    // Shadow once the page scrolls, and highlight the section being read.
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            setScrolled(window.scrollY > 8);
            setActiveId(findActiveSection());
        };
        const schedule = () => {
            if (!frame) frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        window.addEventListener('hashchange', schedule);
        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            window.removeEventListener('hashchange', schedule);
        };
    }, [currentView]);

    // Close the mobile menu with Escape or by tapping outside the navbar.
    useEffect(() => {
        if (!menuOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        const onPointerDown = (e: PointerEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        document.addEventListener('pointerdown', onPointerDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('pointerdown', onPointerDown);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav ref={navRef} className={scrolled ? 'scrolled' : undefined} aria-label="Main">
            <div className="logo-container">
                <a href="#home" className="nav-logo-link" onClick={closeMenu} aria-label="Collins Nyamari, back to top">
                    <img
                        src={`${import.meta.env.BASE_URL}logo.webp`}
                        alt=""
                        className="nav-logo"
                        height={40}
                        decoding="async"
                    />
                </a>
            </div>

            <ul id="primary-menu" className={`nav-menu${menuOpen ? ' open' : ''}`}>
                {LINKS.map(({ href, label }) => (
                    <li key={href}>
                        <a
                            href={href}
                            onClick={closeMenu}
                            aria-current={activeId === href.slice(1) ? 'location' : undefined}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="nav-btns">
                <button
                    type="button"
                    className="icon-toggle-btn"
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                >
                    {theme === 'dark' ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>

                <button
                    type="button"
                    className="icon-toggle-btn menu-toggle"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    aria-controls="primary-menu"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {menuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M3 6h18M3 12h18M3 18h18" />
                        )}
                    </svg>
                </button>
            </div>
        </nav>
    );
};