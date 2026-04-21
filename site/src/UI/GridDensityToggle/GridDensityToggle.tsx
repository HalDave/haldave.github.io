import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { GridDensity } from '../../Types/types';

interface Props {
  density: GridDensity;
  onChange: (density: GridDensity) => void;
}

const GridDensityToggle = ({ density, onChange }: Props) => {
  const handleChange = (_e: React.MouseEvent, value: GridDensity | null) => {
    if (value) onChange(value);
  };

  return (
    <ToggleButtonGroup
      value={density}
      exclusive
      onChange={handleChange}
      size="small"
      aria-label="Card grid density"
    >
      <ToggleButton value="comfortable" aria-label="Comfortable view">
        <Tooltip title="Comfortable">
          <ViewModuleIcon fontSize="small" />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="compact" aria-label="Compact view">
        <Tooltip title="Compact">
          <ViewComfyIcon fontSize="small" />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default GridDensityToggle;
