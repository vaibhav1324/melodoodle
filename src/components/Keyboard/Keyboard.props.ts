import React from 'react';

export type NoteKeyProps = {
  type: 0 | 1;
  note: string;
  index: number;
  isActive: boolean;
  children: React.ReactNode;
  onMouseUp: (note: string) => void;
  onMouseDown: (note: string) => void;
};
