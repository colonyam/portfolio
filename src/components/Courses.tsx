import React from 'react';

export const Courses: React.FC = () => {
    return (
        <section id="courses">
            <h2>Courses and Skills</h2>
            <div className="card">
                <p style={{ marginBottom: '1rem', opacity: 0.85 }}>Core technical stack and professional coursework credentials.</p>
                <div className="tags">
                    <span className="tag">Software Development</span>
                    <span className="tag">Graphic Design</span>
                    <span className="tag">Node.js</span>
                    <span className="tag">JavaScript</span>
                    <span className="tag">IT Support</span>
                    <span className="tag">Database Management</span>
                </div>
            </div>
        </section>
    );
};