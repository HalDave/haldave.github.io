import { useState } from 'react';
import { GridDensity } from '../../Types/types';

const STORAGE_KEY = 'grid-density';

const readStoredDensity = (): GridDensity => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'compact' ? 'compact' : 'comfortable';
};

const useGridDensity = () => {
  const [density, setDensityState] = useState<GridDensity>(readStoredDensity);

  const setDensity = (next: GridDensity) => {
    localStorage.setItem(STORAGE_KEY, next);
    setDensityState(next);
  };

  return { density, setDensity };
};

export default useGridDensity;
