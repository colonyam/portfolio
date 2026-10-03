import React, { useState } from 'react';
import { SITE, type AppView } from './siteConfig';

// Optional: a form endpoint (e.g. Formspree) set in .env as VITE_PARTNER_FORM_ENDPOINT.
// When it is empty, the form falls back to opening the visitor's email app.
const ENDPOINT = import.meta.env.VITE_PARTNER_FORM_ENDPOINT as string | undefined;

type Status = 'idle' | 'sending' | 'success' | 'mailto' | 'error';

interface PartnersProps {
    onViewChange?: (view: AppView) => void;
}

const INTEREST_OPTIONS = [
    'Software development',
    'Graphic design',
    'ICT support',
    'Something else',
] as const;

export const Partners: React.FC<PartnersProps> = ({ onViewChange }) => {
    const [status, setStatus] = useState<Status>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

        // Spam trap: real visitors never see or fill this field.
        if (data.website) {
            setStatus('success');
            form.reset();
            return;
        }

        const payload = {
            name: data.name.trim(),
            organisation: data.organisation.trim(),
            email: data.email.trim(),
            phone: (data.phone ?? '').trim(),
            interest: data.interest,
            message: data.message.trim(),
            consent: true,
        };
        const subject = `Partnership enquiry from ${payload.name}${payload.organisation ? ` (${payload.organisation})` : ''}`;

        setStatus('sending');
        try {
            if (ENDPOINT) {
                const res = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({ ...payload, _subject: subject }),
                });
                if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
                setStatus('success');
                form.reset();
            } else {
                const body = [
                    `Name: ${payload.name}`,
                    `Organisation: ${payload.organisation}`,
                    `Email: ${payload.email}`,
                    payload.phone && `Phone: ${payload.phone}`,
                    `Interested in: ${payload.interest}`,
                    '',
                    payload.message,
                ].filter(Boolean).join('\n');
                window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                setStatus('mailto');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section id="partners">
            <h2>Partners</h2>
            <div className="partners-stack">
                <div className="card">
                    <h3>Partner with us</h3>
                    <p>Have a project, an organisation, or an idea you want to build together? Tell us about it and we will get back to you by email.</p>

                    <form className="partner-form" onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="partner-name">Your name</label>
                            <input id="partner-name" name="name" type="text" required maxLength={100} autoComplete="name" />
                        </div>

                        <div className="field">
                            <label htmlFor="partner-org">Organisation</label>
                            <input id="partner-org" name="organisation" type="text" required maxLength={120} autoComplete="organization" />
                        </div>

                        <div className="field">
                            <label htmlFor="partner-email">Email</label>
                            <input id="partner-email" name="email" type="email" required maxLength={254} autoComplete="email" />
                        </div>

                        <div className="field">
                            <label htmlFor="partner-phone">Phone <span className="optional">(optional)</span></label>
                            <input id="partner-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" />
                        </div>

                        <div className="field full">
                            <label htmlFor="partner-interest">What would you like to work on?</label>
                            <select id="partner-interest" name="interest" required defaultValue="">
                                <option value="" disabled>Choose one</option>
                                {INTEREST_OPTIONS.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field full">
                            <label htmlFor="partner-message">Tell us about the project</label>
                            <textarea id="partner-message" name="message" required minLength={20} maxLength={2000} rows={5} />
                        </div>

                        {/* Honeypot: hidden from people, tempting to bots */}
                        <div className="honeypot" aria-hidden="true">
                            <label htmlFor="partner-website">Leave this field empty</label>
                            <input id="partner-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                        </div>

                        <div className="field full consent">
                            <input id="partner-consent" name="consent" type="checkbox" required />
                            <label htmlFor="partner-consent">
                                I agree that my details may be used to reply to this request, as described in the{' '}
                                {onViewChange ? (
                                    <button type="button" className="form-link-btn" onClick={() => onViewChange('privacy')}>
                                        Privacy Policy
                                    </button>
                                ) : (
                                    'Privacy Policy'
                                )}
                                .
                            </label>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="portal-link" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending...' : 'Send request'}
                            </button>
                            <p
                                role="status"
                                aria-live="polite"
                                className={`form-status${status === 'error' ? ' error' : ''}`}
                            >
                                {status === 'success' && 'Thank you. Your request has been sent and we will reply by email.'}
                                {status === 'mailto' && 'Your email app should now be open with your request ready to send. Press send there to finish.'}
                                {status === 'error' && (
                                    <>Your request could not be sent. Please try again, or email {SITE.email}.</>
                                )}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};