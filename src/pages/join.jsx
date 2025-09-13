import React from 'react';

const Join = () => {
  return (
    <div className="section-block">
      <div className="section-inner">
        <h1 style={{ marginTop: 0, fontSize: 'clamp(2.2rem,5vw,3.2rem)', letterSpacing: '-1px' }}>Join SHPE @ El Camino College</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: 880, lineHeight: 1.55 }}>
          Empowering Hispanic engineers through community, leadership, and professional growth. Becoming a member connects you to peers, mentors, projects, conferences and national SHPE resources.
        </p>
        <ol className="join-steps">
          <li>Be an active MESA|ASEM Student at El Camino College</li>
          <li>Fill out the interest form.</li>
          <li>Attend a general meeting or event.</li>
          <li>Inquire on how to get a SHPE national membership provided to you, or purchase your own. (Limited Free Memberships Available)</li>
        </ol>
        <button
          className="primary-btn"
          onClick={() =>
            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSenSL6sZjHDJ513nezwQxuGshaj6BJhD6ujEYZzTYB7A-PLrA/viewform?pli=1',
              '_blank',
              'noopener,noreferrer'
            )
          }
        >
          Interest Form
        </button>
      </div>
    </div>
  );
};

export default Join;
