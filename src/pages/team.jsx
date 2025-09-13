import React from 'react';

const officers = [
  { name: 'Co-President', person: 'Juan Ventura-Romero', focus: 'Operations & Vision', img: './JuanV.JPG' },
  { name: 'Co-President', person: 'Angel Flores', focus: 'Leadership & Vision', img: './AngelFlores.jpeg' },
  { name: 'Vice President', person: 'Steven Diaz', focus: 'Operations & Support', img: './StevenDiaz.jpg' },
  { name: 'Treasurer (Intrim) & Secretary', person: 'Destiny Mungia', focus: 'Funding & Budget', img: './DestinyMunguia_008.jpg' },
  { name: 'Inter-Club Council Representative', person: 'TBD', focus: 'Representation & Campus Connection', img: '/images/team/tbd.jpg' },
  { name: 'Social Media Representative', person: 'TBD', focus: 'Build Teams & Portfolio', img: '/images/team/tbd.jpg' }
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
            <div key={o.name + o.person} style={{ background: '#fff', border: '1px solid #dde4ef', borderRadius: 14, padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '.35rem', boxShadow: '0 4px 12px -4px rgba(0,0,0,.06)' }}>
              <img
                src={o.img}
                alt={o.person}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', marginBottom: '.5rem', background: '#f3f6fa', border: '1px solid #e3e8f0' }}
              />
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