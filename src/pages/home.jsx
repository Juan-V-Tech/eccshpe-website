import React from 'react';

const Home = () => {
    return (
        <header className="home-root" role="banner">
            <h1 style={{ fontSize: 'clamp(2.6rem,6vw,4.2rem)', lineHeight: 1.05, letterSpacing: '-2px', margin: '0 0 1rem' }}>
            Society of Hispanic Professional Engineers
            <span style={{ display: 'block', color: 'var(--accent, #20419A)', fontSize: 'clamp(1.3rem,2.3vw,1.8rem)', fontWeight: 600, marginTop: '0.75rem' }}>El Camino College Chapter</span>
            </h1>
            <p style={{ maxWidth: 720, fontSize: 'clamp(1.05rem,1.4vw,1.25rem)', lineHeight: 1.5, margin: '0 0 2.25rem' }}>
                Building community, advancing leadership, and opening pathways in STEM for Hispanic and underrepresented students. Join us for workshops, mentorship, industry connections, and collaborative engineering projects.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="/join" className="primary-btn bright" style={{ textDecoration: 'none' }}>Become a Member</a>
                <a href="/events" className="primary-btn bright" style={{ textDecoration: 'none' }}>See Events</a>
            </div>
        </header>
    );
};

export default Home;