import React from 'react';
import { LegalLayout, LegalSection } from './LegalLayout';
import { SITE, type AppView } from './siteConfig';

interface Props { onViewChange?: (view: AppView) => void; }

export const TermsOfService: React.FC<Props> = ({ onViewChange }) => (
    <LegalLayout
        title="Terms of Service"
        onViewChange={onViewChange}
        intro="By using this website or the client portal, you agree to these terms. If you do not agree, please do not use them."
    >
        <LegalSection heading="1. About this site">
            <p>This is the portfolio and client portal of {SITE.owner}, offering software development, graphic design, and ICT support services. Information on the site is for general purposes and is not an offer that can be accepted without a written quote or agreement.</p>
        </LegalSection>

        <LegalSection heading="2. Services and client agreements">
            <p>Paid work is governed by a separate written agreement, quote, or statement of work that sets out scope, timelines, fees, and payment terms. If that document conflicts with these terms, it takes priority for that project.</p>
        </LegalSection>

        <LegalSection heading="3. Intellectual property">
            <ul>
                <li>The site's design, text, code, and portfolio material are owned by {SITE.owner} unless stated otherwise, and may not be copied or reused without written permission.</li>
                <li>Ownership of deliverables for client projects passes to the client as set out in the project agreement, usually on full payment. Until then I retain all rights.</li>
                <li>I may show completed work in my portfolio unless we agree otherwise in writing.</li>
                <li>Third-party names, logos, and open-source components remain the property of their respective owners and licensors.</li>
            </ul>
        </LegalSection>

        <LegalSection heading="4. Portal accounts">
            <ul>
                <li>Keep your login details confidential and tell me promptly if you suspect unauthorised access.</li>
                <li>You are responsible for activity under your account and for the accuracy of what you submit.</li>
                <li>Only upload content you have the right to share.</li>
                <li>I may suspend or close accounts that are inactive, breach these terms, or put the system at risk.</li>
            </ul>
        </LegalSection>

        <LegalSection heading="5. Acceptable use">
            <p>You must not:</p>
            <ul>
                <li>attempt to gain unauthorised access to the site, portal, or other users' data;</li>
                <li>scan, probe, or test security without my written permission (see the Security Compliance page for how to report issues responsibly);</li>
                <li>upload malware or unlawful, infringing, or abusive content;</li>
                <li>overload or interfere with the site, or use bots to scrape it.</li>
            </ul>
        </LegalSection>

        <LegalSection heading="6. Third-party links and services">
            <p>The site links to external services such as GitHub, LinkedIn, X, and Facebook. I do not control them and am not responsible for their content or privacy practices.</p>
        </LegalSection>

        <LegalSection heading="7. Disclaimers">
            <p>The site is provided "as is" and "as available". I work to keep it accurate and online, but I do not guarantee that it will be uninterrupted, error-free, or that every portfolio description is complete or current.</p>
        </LegalSection>

        <LegalSection heading="8. Limitation of liability">
            <p>To the extent the law allows, I am not liable for indirect or consequential loss, or loss of profit or data, arising from use of this website. Nothing in these terms limits liability that cannot be limited by law. Liability for paid services is governed by the relevant project agreement.</p>
        </LegalSection>

        <LegalSection heading="9. Privacy">
            <p>How I handle personal data is described in the <button type="button" className="legal-back" style={{ display: 'inline', marginBottom: 0, textDecoration: 'underline' }} onClick={() => onViewChange?.('privacy')}>Privacy Policy</button>.</p>
        </LegalSection>

        <LegalSection heading="10. Governing law">
            <p>These terms are governed by the laws of {SITE.governingLaw}. Disputes will first be raised in good faith with me, and if unresolved, will be subject to the courts of {SITE.governingLaw}.</p>
        </LegalSection>

        <LegalSection heading="11. Changes and contact">
            <p>I may update these terms; continued use after an update means you accept the new version. Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        </LegalSection>
    </LegalLayout>
);