import { createContext, useContext } from 'react';

export const DesignContext = createContext({ design: 'mission', setDesign: () => {} });

export const useDesign = () => useContext(DesignContext);
