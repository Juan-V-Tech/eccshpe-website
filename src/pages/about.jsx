import React from 'react';

const About = () => {
  return (
  <div className="section-block">
      <div className="section-inner">
        <h1 style={{ marginTop: 0, fontSize: 'clamp(2.2rem,5vw,3.2rem)', letterSpacing: '-1px' }}>About Our Chapter</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: 860, lineHeight: 1.55 }}>
          We are the El Camino College (Torrance, CA) student chapter of the Society of Hispanic Professional Engineers focused on empowering Hispanic and other underrepresented students in STEM. Through mentorship, technical workshops, collaborative projects, outreach and professional development, we aim to elevate academic success and launch meaningful engineering careers.
        </p>
        <p style={{ fontSize: '1.05rem', maxWidth: 860, lineHeight: 1.5 }}>
          Core pillars include: academic support, leadership development, community service, and industry exposure. Our members participate in regional conferences, design challenges, and volunteer programs inspiring the next generation of engineers.
        </p>
      </div>
    </div>
  );
};

export default About;