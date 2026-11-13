import { useEffect, useState } from 'react';
import { useDesign } from './DesignContext';
import { DESIGNS, findDesign } from './registry';
import './DesignSwitcher.css';

const OPEN_KEY = 'shpe-ecc-design-switcher-open';

const readOpen = () => {
  try {
    return window.localStorage.getItem(OPEN_KEY) !== 'false';
  } catch {
    return true;
  }
};

// Floating control for previewing the designs. Alt+Shift+1..4 also switches.
const DesignSwitcher = () => {
  const { design, setDesign } = useDesign();
  const [open, setOpen] = useState(readOpen);
  const current = findDesign(design);

  useEffect(() => {
    try {
      window.localStorage.setItem(OPEN_KEY, String(open));
    } catch {
      // Ignore.
    }
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (!event.altKey || !event.shiftKey) return;
      const index = Number(event.code.replace('Digit', '')) - 1;
      if (DESIGNS[index]) {
        event.preventDefault();
        setDesign(DESIGNS[index].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setDesign]);

  return (
    <div className="design-switcher" data-open={open || undefined}>
      <button
        type="button"
        className="design-switcher__toggle"
        aria-expanded={open}
        aria-controls="design-switcher-options"
        onClick={() => setOpen((o) => !o)}
        title={open ? 'Hide design switcher' : 'Show design switcher'}
      >
        <span className="design-switcher__dot" aria-hidden="true" />
        <span className="design-switcher__label">Design</span>
        {!open && (
          <span className="design-switcher__current">
            {current?.index} {current?.name}
          </span>
        )}
      </button>

      <div
        id="design-switcher-options"
        className="design-switcher__options"
        role="radiogroup"
        aria-label="Site design"
        hidden={!open}
      >
        {DESIGNS.map((d) => (
          <button
            key={d.id}
            type="button"
            role="radio"
            aria-checked={d.id === design}
            className="design-switcher__option"
            onClick={() => setDesign(d.id)}
            title={d.blurb}
          >
            <span className="design-switcher__index">{d.index}</span>
            {d.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesignSwitcher;
