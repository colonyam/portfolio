import React from 'react';
import { LegalLayout, LegalSection } from './LegalLayout';
import { SITE, type AppView } from './siteConfig';

interface Props { onViewChange?: (view: AppView) => void; }

export const SecurityCompliance: React.FC<Props> = ({ onViewChange }) => (
    <LegalLayout
        title="Security Compliance"
        onViewChange={onViewChange}
        intro="This page describes the security measures used to protect this website, the client portal, and the data stored in them."
    >
        <LegalSection heading="1. Authentication">
            <p>Portal sign-in uses Supabase Authentication. Passwords are hashed by the provider and never stored or visible in plain text. Sessions use short-lived tokens that expire and can be revoked.</p>
        </LegalSection>

        <LegalSection heading="2. Encryption">
            <ul>
                <li><strong>In transit:</strong> all traffic to the site and portal is served over HTTPS (TLS).</li>
                <li><strong>At rest:</strong> database records and stored files are encrypted at rest by the infrastructure provider.</li>
            </ul>
        </LegalSection>

        <LegalSection heading="3. Access control">
            <ul>
                <li>Portal users can access only the records and files that belong to them.</li>
                <li>Administrative access is limited to the site owner and protected with strong credentials.</li>
                <li>Secrets such as API keys are kept in server-side environment settings and are not exposed in the browser code.</li>
            </ul>
        </LegalSection>

        <LegalSection heading="4. Application and infrastructure practices">
            <ul>
                <li>Dependencies are reviewed and updated regularly to address known vulnerabilities.</li>
                <li>Inputs from forms and portal users are validated before they are processed or stored.</li>
                <li>Backups of portal data are maintained through the database provider.</li>
            </ul>
        </LegalSection>

        <LegalSection heading="5. Data protection compliance">
            <p>Personal data is handled in line with the Kenya Data Protection Act, 2019 (see the <button type="button" className="legal-back" style={{ display: 'inline', marginBottom: 0, textDecoration: 'underline' }} onClick={() => onViewChange?.('privacy')}>Privacy Policy</button>). This is a statement of practice, not a third-party certification: the site does not currently hold ISO 27001, SOC 2, or similar certifications, although some of my service providers do.</p>
        </LegalSection>

        <LegalSection heading="6. Incident response">
            <p>If I discover a security incident affecting personal data, I will contain it, assess the impact, and notify affected people and the {SITE.regulator.name} within the timelines the law requires.</p>
        </LegalSection>

        <LegalSection heading="7. Reporting a vulnerability">
            <p>If you find a security issue, please email <a href={`mailto:${SITE.email}?subject=Security%20report`}>{SITE.email}</a> with the details and steps to reproduce. Please give me reasonable time to fix it before disclosing it publicly, and do not access, change, or delete data that is not yours. I will acknowledge reports promptly and keep you updated.</p>
        </LegalSection>

        <LegalSection heading="8. Your part">
            <p>Use a unique, strong password, do not share your login, and sign out on shared devices. Tell me immediately if you suspect your account has been compromised.</p>
        </LegalSection>
    </LegalLayout>
);