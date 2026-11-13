import { Suspense, useEffect, useState } from 'react';
import { useDesign } from './designs/DesignContext';
import DesignSwitcher from './designs/DesignSwitcher';
import { findDesign, SHOW_DESIGN_SWITCHER } from './designs/registry';

// Renders the selected design. When the design changes, a short curtain fades
// in, the new design loads behind it, and the curtain fades back out.
const App = () => {
  const { design } = useDesign();
  const [shown, setShown] = useState(design);
  const switching = design !== shown;

  useEffect(() => {
    if (!switching) return undefined;
    const timer = window.setTimeout(() => setShown(design), 280);
    return () => window.clearTimeout(timer);
  }, [design, switching]);

  const { Component } = findDesign(shown);

  return (
    <>
      <Suspense fallback={<div className="design-curtain" data-active="" aria-hidden="true" />}>
        <Component key={shown} />
      </Suspense>
      <div className="design-curtain" data-active={switching ? '' : undefined} aria-hidden="true" />
      {SHOW_DESIGN_SWITCHER && <DesignSwitcher />}
    </>
  );
};

export default App;
