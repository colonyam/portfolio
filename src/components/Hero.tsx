import React, { useState } from 'react';

const PROFILE_SRC = `${import.meta.env.BASE_URL}profile.png`;

export const Hero: React.FC = () => {
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <header id="home" className="hero-section">
            <div className="hero-content">
                <h1>Collins Nyamari</h1>
                <p className="hero-subtitle">Software Developer and Graphic Designer</p>
                <p className="hero-bio">
                    Building robust software architectures, clean backend logic, and production ready visual design assets.
                </p>
                <div className="hero-actions">
                    <a href="#projects" className="portal-link">View Projects</a>
                    <a href="#contact" className="icon-toggle-btn" style={{ width: 'auto', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Get in Touch</a>
                </div>
            </div>
            <div className="hero-image-container">
                {imageFailed ? (
                    <div className="image-placeholder card">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span>Profile photo unavailable</span>
                    </div>
                ) : (
                    <img
                        src={PROFILE_SRC}
                        alt="Portrait of Collins Nyamari"
                        className="profile-image card"
                        width={640}
                        height={640}
                        decoding="async"
                        fetchPriority="high"
                        onError={() => setImageFailed(true)}
                    />
                )}
            </div>
        </header>
    );
};