import React from 'react';

export const WhatIDo: React.FC = () => {
    return (
        <section id="what-i-do">
            <h2>What I Do</h2>
            <div className="grid">
                <div className="card">
                    <h3>Software Development</h3>
                    <p>Writing clean backend logic with Node.js and building solid web architectures.</p>
                </div>
                <div className="card">
                    <h3>Graphic Design</h3>
                    <p>Designing visual concepts, layouts, and brand assets that stand out in production environments.</p>
                </div>
                <div className="card">
                    <h3>ICT Support</h3>
                    <p>Real world experience managing factory hardware, smart cards, and database registrations.</p>
                </div>
            </div>
        </section>
    );
};