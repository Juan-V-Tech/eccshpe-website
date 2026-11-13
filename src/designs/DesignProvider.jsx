import { useCallback, useEffect, useMemo, useState } from 'react';
import { DesignContext } from './DesignContext';
import { DEFAULT_DESIGN, findDesign } from './registry';

const STORAGE_KEY = 'shpe-ecc-design';

// Pick the design from ?design=<id>, then the last choice, then the default.
const readInitialDesign = () => {
  const fromUrl = new URLSearchParams(window.location.search).get('design');
  if (findDesign(fromUrl)) return fromUrl;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (findDesign(saved)) return saved;
  } catch {
    // Storage can be blocked (private mode). Fall through to the default.
  }
  return DEFAULT_DESIGN;
};

const DesignProvider = ({ children }) => {
  const [design, setDesignState] = useState(readInitialDesign);

  const setDesign = useCallback((id) => {
    if (!findDesign(id)) return;
    setDesignState(id);
    const url = new URL(window.location.href);
    url.searchParams.set('design', id);
    window.history.replaceState(window.history.state, '', url);
  }, []);

  // Remember the active design, including one opened from a ?design= link.
  useEffect(() => {
    document.documentElement.dataset.design = design;
    try {
      window.localStorage.setItem(STORAGE_KEY, design);
    } catch {
      // Ignore: the choice just won't be remembered.
    }
  }, [design]);

  const value = useMemo(() => ({ design, setDesign }), [design, setDesign]);

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
};

export default DesignProvider;
