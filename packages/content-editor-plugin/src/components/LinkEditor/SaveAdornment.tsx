import React from 'react';
import { Button, Icon } from '@jpmorganchase/mosaic-components';
import type { ButtonProps } from '@jpmorganchase/mosaic-components';
import { StaticInputAdornment } from '@salt-ds/lab';

interface SaveAdornmentProps {
  onSave: ButtonProps['onClick'];
}

export const SaveAdornment = ({ onSave }: SaveAdornmentProps) => (
  <StaticInputAdornment>
    <Button onClick={onSave}>
      <Icon name="save" />
    </Button>
  </StaticInputAdornment>
);
