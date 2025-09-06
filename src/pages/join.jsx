import React from 'react';

const Join = () => {
  return (
    <div className="section-block">
      <div className="section-inner">
        <h1 style={{ marginTop: 0, fontSize: 'clamp(2.2rem,5vw,3.2rem)', letterSpacing: '-1px' }}>Join SHPE @ ECC</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: 880, lineHeight: 1.55 }}>
          Empowering Hispanic engineers through community, leadership, and professional growth. Becoming a member connects you to peers, mentors, projects, conferences and national SHPE resources.
        </p>
        <ol className="join-steps">
          <li>Fill out the interest form (coming soon).</li>
          <li>Attend a general meeting or event.</li>
          <li>Join a committee or project team to build experience.</li>
        </ol>
        <button className="primary-btn" onClick={() => alert('Interest form coming soon!')}>Get Notified</button>
      </div>
    </div>
  );
};

export default Join;
