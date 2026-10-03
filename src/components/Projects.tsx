import React, { useEffect, useRef, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

interface ProjectDetails {
    overview: string;
    highlights: string[];
}

interface Project {
    title: string;
    image: string;
    description: string;
    url?: string;            // live site: "View Site" opens it in a new tab
    details?: ProjectDetails; // no live site: "View Site" opens a details window
}

const PROJECTS: Project[] = [
    {
        title: 'Domas Little Voices',
        image: 'domas.webp',
        description:
            'A licensed mobile speech and language therapy platform delivering evidence-based clinical programs, home visits, and telehealth support across Nairobi.',
        url: 'https://domaslittlevoicesspeechtherapyhub.org/',
    },
    {
        title: 'Putu Travel Concierge',
        image: 'PutuTravels.webp',
        description:
            'A tailored travel booking and itinerary management interface designed to deliver seamless guest logistics and coast experiences.',
        url: 'https://www.pututravels.co.ke/',
    },
    {
        title: 'Protocol Promotion',
        image: 'protocolpromotions.webp',
        description:
            'A streamlined tool for corporate event planning and tracking promotional data.',
        // TODO: replace this text with the real project details.
        details: {
            overview:
                'A streamlined tool built for corporate event planning and for tracking promotional data in one place, so teams can organise events and review how their promotions perform.',
            highlights: [
                'Corporate event planning',
                'Promotional data tracking',
            ],
        },
    },
];

// "https://www.example.com/path" -> "example.com"
const displayHost = (url: string) => {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
};

export const Projects: React.FC = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [active, setActive] = useState<Project | null>(null);

    // Open the native dialog once a project is selected.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (active && dialog && !dialog.open) dialog.showModal();
    }, [active]);

    // Stop the page behind the dialog from scrolling.
    useEffect(() => {
        if (!active) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previous; };
    }, [active]);

    const closeDialog = () => dialogRef.current?.close();

    return (
        <section id="projects">
            <h2>Projects</h2>
            <div className="grid">
                {PROJECTS.map((project) => {
                    const { title, image, description, url, details } = project;
                    return (
                        <div className="card project-card" key={title}>
                            <img
                                src={`${BASE}${image}`}
                                alt={`${title} project preview`}
                                className="project-image"
                                width={640}
                                height={360}
                                loading="lazy"
                                decoding="async"
                            />
                            <h3>{title}</h3>
                            <p>{description}</p>

                            {url ? (
                                <div className="project-actions">
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="portal-link"
                                        aria-label={`View ${title} site (opens in a new tab)`}
                                    >
                                        View Site
                                    </a>
                                    <span className="project-url">{displayHost(url)}</span>
                                </div>
                            ) : details ? (
                                <div className="project-actions">
                                    <button
                                        type="button"
                                        className="portal-link"
                                        aria-haspopup="dialog"
                                        aria-label={`View ${title} project details`}
                                        onClick={() => setActive(project)}
                                    >
                                        View Site
                                    </button>
                                    <span className="project-url">Project details</span>
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>

            <dialog
                ref={dialogRef}
                className="project-dialog"
                aria-labelledby="project-dialog-title"
                onClose={() => setActive(null)}
                onClick={(e) => {
                    // A click on the dialog element itself (not its content) is a backdrop click.
                    if (e.target === e.currentTarget) closeDialog();
                }}
            >
                {active && (
                    <div className="project-dialog-body">
                        <button
                            type="button"
                            className="icon-toggle-btn project-dialog-close"
                            onClick={closeDialog}
                            aria-label="Close project details"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={`${BASE}${active.image}`}
                            alt={`${active.title} project preview`}
                            className="project-image"
                        />
                        <h3 id="project-dialog-title">{active.title}</h3>
                        <p>{active.details?.overview ?? active.description}</p>
                        {active.details && active.details.highlights.length > 0 && (
                            <ul>
                                {active.details.highlights.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </dialog>
        </section>
    );
};