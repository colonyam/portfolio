import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIDo } from './components/WhatIDo';
import { Courses } from './components/Courses';
import { EducationExperience } from './components/EducationExperience';
import { Projects } from './components/Projects';
import { Partners } from './components/Partners';
import { Insights } from './components/Insights';
import { Contact } from './components/Contact';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { SecurityCompliance } from './components/SecurityCompliance';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import type { AppView } from './components/siteConfig';

function scrollToSection(id: string, attempt = 0) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (attempt < 10) {
        // Home sections may not be mounted yet right after a view switch.
        window.setTimeout(() => scrollToSection(id, attempt + 1), 50);
    }
}

export function App() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [currentView, setCurrentView] = useState<AppView>('home');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    const handleNavigate = useCallback((view: AppView) => {
        if (view !== 'home') {
            // Clear the old #hash so clicking the same navbar link again still fires "hashchange".
            window.history.replaceState(null, '', window.location.pathname);
        }
        setCurrentView(view);
        // Instant jump to top; Footer/navbar handle their own smooth scroll to a section afterwards.
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    // Navbar anchors only change the URL hash. If a legal page is open, go back home and scroll.
    useEffect(() => {
        if (currentView === 'home') return;

        const onHashChange = () => {
            const id = window.location.hash.replace('#', '');
            if (!id) return;
            setCurrentView('home');
            window.setTimeout(() => scrollToSection(id), 0);
        };

        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, [currentView]);

    return (
        <div>
            <Navbar
                theme={theme}
                toggleTheme={toggleTheme}
                currentView={currentView}
            />

            {currentView === 'home' && (
                <>
                    <Hero />
                    <div className="wrapper">
                        <WhatIDo />
                        <Courses />
                        <EducationExperience />
                        <Projects />
                        <Partners onViewChange={handleNavigate} />
                        <Insights />
                        <Contact />
                    </div>
                </>
            )}

            {currentView === 'privacy' && <PrivacyPolicy onViewChange={handleNavigate} />}
            {currentView === 'terms' && <TermsOfService onViewChange={handleNavigate} />}
            {currentView === 'security' && <SecurityCompliance onViewChange={handleNavigate} />}

            <Footer onViewChange={handleNavigate} />

            <WhatsAppFloat />
        </div>
    );
}

export default App;