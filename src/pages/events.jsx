import React from 'react';

const Events = () => {
  return (
    <div className="section-block alt">
      <div className="section-inner">
        <h1 style={{ marginTop: 0, fontSize: 'clamp(2.2rem,5vw,3.2rem)', letterSpacing: '-1px' }}>Upcoming Events</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: 860, lineHeight: 1.55 }}>
          Workshops, networking nights, outreach and more. Full calendar will be published here soon. Below is a preview of early semester programming.
        </p>
        <ul className="events-list">
          <li><strong>Week 2:</strong> Kickoff &amp; Member Social</li>
          <li><strong>Week 4:</strong> Resume + LinkedIn Workshop</li>
          <li><strong>Week 6:</strong> Industry Panel (STEM Professionals)</li>
          <li><strong>Week 8:</strong> Technical Project Sprint Night</li>
          <li><strong>Week 10:</strong> Community Outreach STEM Demo</li>
        </ul>
        <p style={{ fontSize: '.95rem', opacity: .75 }}>Have an event idea? Reach out to the Events Chair or submit it through our interest form on the Join page.</p>
      </div>
    </div>
  );
};

export default Events;
