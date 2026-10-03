import React, { useState } from 'react';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        // Simulating dispatch/submission (You can integrate Formspree, EmailJS, or Supabase here)
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    return (
        <section id="contact">
            <h2>Contact</h2>
            <div className="card">
                <p>Get in touch for projects, design work, or technical collaborations.</p>
                <p style={{ marginTop: '0.8rem', marginBottom: '1.5rem' }}>
                    <strong>Email:</strong> <a href="mailto:nyamaricollins14@gmail.com" style={{ color: 'var(--text)', textDecoration: 'underline' }}>nyamaricollins14@gmail.com</a>
                </p>

                {status === 'success' ? (
                    <div style={{ padding: '1rem', background: 'rgba(40, 167, 69, 0.1)', border: '1px solid #28a745', borderRadius: '4px', color: '#28a745', textAlign: 'center' }}>
                        <p style={{ margin: 0 }}>Thank you! Your message has been sent successfully. I will get back to you soon.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Your Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="John Doe" 
                                required 
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} 
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="john@example.com" 
                                required 
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} 
                            />
                        </div>
                        <div style={{ marginBottom: '1.2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Message</label>
                            <textarea 
                                name="message" 
                                value={formData.message} 
                                onChange={handleChange} 
                                placeholder="Tell me about your project or inquiry..." 
                                rows={4} 
                                required 
                                style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', resize: 'vertical' }} 
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={status === 'submitting'}
                            className="portal-link" 
                            style={{ width: '100%', border: 'none', cursor: 'pointer', textAlign: 'center', opacity: status === 'submitting' ? 0.7 : 1 }}
                        >
                            {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};