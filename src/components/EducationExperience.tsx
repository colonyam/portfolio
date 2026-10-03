import React, { useMemo, useState } from 'react';

type Kind = 'experience' | 'education';
type Filter = 'all' | Kind;

interface Entry {
    kind: Kind;
    title: string;               // role or qualification
    place: string;               // organisation or institution
    start?: string;              // 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD'
    end?: string;                // same formats, or 'present' if still going
    description?: string;
    highlights?: string[];       // bullet points: what you did or achieved
    skills?: string[];           // tags shown under the entry
}

// Add, edit or remove entries here. Order does not matter: the logic below sorts them.
const ENTRIES: Entry[] = [
    {
        kind: 'experience',
        title: 'ICT Department',
        place: 'Kapasara Tea Factory',
        start: '2025-05-05',
        end: '2025-07-31',
        description:
            'Worked in the ICT department handling smart card initialization and PDA farmer registrations in the system.',
        highlights: [
            'Initialized smart cards used in the factory system.',
            'Registered farmers on PDAs and captured their records in the system.',
            'Looked after factory ICT hardware.',
            'Handled database registrations.',
        ],
        skills: ['Smart cards', 'PDA registration', 'Factory hardware', 'Database records'],
    },
    {
        kind: 'education',
        title: 'Bachelor of Science in Mathematics and Computer Science',
        place: 'Maseno University',
        start: '2023',
        end: '2026',
        // TODO: add detail, for example:
        // description: 'One or two sentences about the programme or your final-year project.',
        // highlights: ['Final-year project: ...', 'Key units: ...'],
        // skills: ['Mathematics', 'Programming', 'Databases'],
    },
];

const GROUPS: { kind: Kind; heading: string }[] = [
    { kind: 'experience', heading: 'Experience' },
    { kind: 'education', heading: 'Education' },
];

const FILTERS: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'experience', label: 'Experience' },
    { value: 'education', label: 'Education' },
];

const NOW = Date.now();
const MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30.4375;

interface ParsedDate {
    time: number;
    precision: 'year' | 'month' | 'day';
    isPresent: boolean;
}

/** Turns '2025-05-05', '2025-05', '2023' or 'present' into a comparable date. */
const parseDate = (value?: string): ParsedDate | null => {
    if (!value) return null;
    if (value === 'present') return { time: NOW, precision: 'day', isPresent: true };
    const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(value);
    if (!m) return null;
    return {
        time: Date.UTC(+m[1], m[2] ? +m[2] - 1 : 0, m[3] ? +m[3] : 1),
        precision: m[3] ? 'day' : m[2] ? 'month' : 'year',
        isPresent: false,
    };
};

const formatDate = (d: ParsedDate) => {
    if (d.isPresent) return 'Present';
    const date = new Date(d.time);
    return d.precision === 'year'
        ? String(date.getUTCFullYear())
        : date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
};

/** "May 2025 - Jul 2025", "2023 - 2026", "2022 - Present", or '' when no dates are set. */
const formatPeriod = (entry: Entry) => {
    const start = parseDate(entry.start);
    const end = parseDate(entry.end);
    if (start && end) {
        const a = formatDate(start);
        const b = formatDate(end);
        return a === b ? a : `${a} - ${b}`;
    }
    const only = start ?? end;
    return only ? formatDate(only) : '';
};

/** "3 months", "1 year 2 months", "Less than a month", or '' when it cannot be worked out. */
const formatDuration = (entry: Entry) => {
    const start = parseDate(entry.start);
    const end = parseDate(entry.end);
    if (!start || !end || end.time < start.time) return '';
    const months = Math.round((end.time - start.time) / MS_PER_MONTH);
    if (months < 1) return 'Less than a month';
    const years = Math.floor(months / 12);
    const rest = months % 12;
    const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
    if (years === 0) return plural(rest, 'month');
    return rest === 0 ? plural(years, 'year') : `${plural(years, 'year')} ${plural(rest, 'month')}`;
};

/** Ongoing when the end is "present" or still in the future; otherwise completed. */
const getStatus = (entry: Entry): 'Ongoing' | 'Completed' | null => {
    const start = parseDate(entry.start);
    const end = parseDate(entry.end);
    if (!start || !end) return null;
    return end.isPresent || end.time > NOW ? 'Ongoing' : 'Completed';
};

/** Newest first ("present" on top); entries without dates go last. */
const byMostRecent = (a: Entry, b: Entry) => {
    const key = (e: Entry) => {
        const end = parseDate(e.end);
        const start = parseDate(e.start);
        return {
            end: end ? (end.isPresent ? Infinity : end.time) : -Infinity,
            start: start ? start.time : -Infinity,
        };
    };
    const ka = key(a);
    const kb = key(b);
    if (ka.end !== kb.end) return ka.end > kb.end ? -1 : 1;
    if (ka.start !== kb.start) return ka.start > kb.start ? -1 : 1;
    return 0;
};

export const EducationExperience: React.FC = () => {
    const [filter, setFilter] = useState<Filter>('all');

    const groups = useMemo(
        () =>
            GROUPS
                .filter((g) => filter === 'all' || g.kind === filter)
                .map((g) => ({
                    ...g,
                    entries: ENTRIES.filter((e) => e.kind === g.kind).sort(byMostRecent),
                }))
                .filter((g) => g.entries.length > 0),
        [filter],
    );

    return (
        <section id="experience">
            <h2>Education and Experience</h2>

            <div className="filter-bar" role="group" aria-label="Filter entries">
                {FILTERS.map(({ value, label }) => (
                    <button
                        key={value}
                        type="button"
                        className="filter-btn"
                        aria-pressed={filter === value}
                        onClick={() => setFilter(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {groups.length === 0 && <p>Nothing to show here yet.</p>}

            {groups.map(({ kind, heading, entries }) => (
                <div key={kind}>
                    <h3 className="timeline-heading">{heading}</h3>
                    <ul className="timeline-list">
                        {entries.map((entry) => {
                            const period = formatPeriod(entry);
                            // Duration is shown for jobs only; a degree just shows its years.
                            const duration = entry.kind === 'experience' ? formatDuration(entry) : '';
                            const status = getStatus(entry);
                            const meta = [entry.place, period, duration].filter(Boolean).join(', ');
                            return (
                                <li className="card" key={`${entry.kind}-${entry.place}-${entry.title}`}>
                                    <div className="entry-head">
                                        <h4>{entry.title}</h4>
                                        {status && (
                                            <span className={`badge ${status === 'Ongoing' ? 'badge-live' : ''}`}>{status}</span>
                                        )}
                                    </div>
                                    <p className="entry-meta">{meta}</p>
                                    {entry.description && <p>{entry.description}</p>}
                                    {entry.highlights && entry.highlights.length > 0 && (
                                        <ul className="entry-points">
                                            {entry.highlights.map((point) => (
                                                <li key={point}>{point}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {entry.skills && entry.skills.length > 0 && (
                                        <div className="tags entry-skills">
                                            {entry.skills.map((skill) => (
                                                <span className="tag" key={skill}>{skill}</span>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </section>
    );
};