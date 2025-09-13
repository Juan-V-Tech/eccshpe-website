import React from 'react';

const Events = () => {
  return (
    <div className="section-block alt">
      <div className="section-inner">
        <h1 style={{ marginTop: 0, fontSize: 'clamp(2.2rem,5vw,3.2rem)', letterSpacing: '-1px' }}>Upcoming Events</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: 860, lineHeight: 1.55 }}>
          Workshops, networking nights, outreach and more. Full calendar will be published here soon. Below is a preview of early semester programming. All General Meetings 3:00 pm PT in MESA|STEM Center Nats 4 unless otherwise stated.
        </p>
        <ul className="events-list">
          <li><strong>9/17 Week 4 General Meeting 1:</strong> Blast Off! Intro to ECC SHPE</li>
          <li><strong>10/1 Week 6 General Meeting 2:</strong> 3d Printing/CAD Workshop</li>
          <li><strong>10/15 Week 8 General Meeting 3:</strong> Bridge Building Competition Workshop</li>
          <li><strong>10/29 Week 10 General Meeting 4:</strong> TBD</li>
          <li><strong>11/12 Week 12 General Meeting 5:</strong> Industry Panel (STEM Professionals)</li>
        </ul>
        <p style={{ fontSize: '.95rem', opacity: .75 }}>Have an event idea? Reach out to the Events Chair or submit it through our interest form on the Join page.</p>
      </div>
    </div>
  );
};

export default Events;
