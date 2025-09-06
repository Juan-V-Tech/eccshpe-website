import React from 'react';

const officers = [
  { name: 'President', person: 'TBD', focus: 'Leadership & Vision' },
  { name: 'Vice President', person: 'TBD', focus: 'Operations & Support' },
  { name: 'Treasurer', person: 'TBD', focus: 'Funding & Budget' },
  { name: 'Events Chair', person: 'TBD', focus: 'Programming & Logistics' },
  { name: 'Outreach Chair', person: 'TBD', focus: 'Community & Schools' },
  { name: 'Technical Projects Lead', person: 'TBD', focus: 'Build Teams & Portfolio' },
];

const Team = () => {
  return (
    <div className="section-block">
      <div className="section-inner">
        <h1 style={{ marginTop: 0, fontSize: 'clamp(2.2rem,5vw,3.2rem)', letterSpacing: '-1px' }}>Our Leadership</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: 820, lineHeight: 1.5 }}>
          Dedicated student leaders coordinating programs, partnerships, mentorship, and member growth. Want to help lead? Officer applications open each semester.
        </p>
        <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', marginTop: '2.5rem' }}>
          {officers.map(o => (
            <div key={o.name} style={{ background: '#fff', border: '1px solid #dde4ef', borderRadius: 14, padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '.35rem', boxShadow: '0 4px 12px -4px rgba(0,0,0,.06)' }}>
              <strong style={{ fontSize: '0.95rem', letterSpacing: '.5px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>{o.name}</strong>
              <span style={{ fontSize: '1.15rem', fontWeight: 600 }}>{o.person}</span>
              <span style={{ fontSize: '.85rem', opacity: .75 }}>{o.focus}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;