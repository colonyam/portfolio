import React from 'react';

export const Insights: React.FC = () => {
    return (
        <section id="insights">
            <h2>Insights</h2>
            <div className="grid">
                <div className="card">
                    <h3>Design Meets Code</h3>
                    <p>Why aesthetic design improves user retention in modern software applications.</p>
                </div>
                <div className="card">
                    <h3>Field IT Operations</h3>
                    <p>Reflections on handling hardware deployments and agricultural registry workflows.</p>
                </div>
            </div>
        </section>
    );
};
