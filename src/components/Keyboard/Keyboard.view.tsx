import React, { FC, useState } from 'react';

import { withMotion } from 'utils';

import {
  notesMap,
  blackNotes,
  whiteNotes,
  blackKeyMarginLeft,
} from 'constants/keys';

import * as Tone from 'tone';

import {
  WhiteKey,
  BlackKey,
  Container,
  AnimationConfig,
} from './Keyboard.style';

import { useKeyboardListener, useMouseEvents } from './Keyboard.utils';

const synth = new Tone.PolySynth().toDestination();

const Keyboard: FC = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { onMouseUp, onMouseDown } = useMouseEvents(synth);

  useKeyboardListener(synth, setActiveKey);

  return (
    <Container position="relative">
      <Container justify="flex-start" align="flex-start" flex={0}>
        {whiteNotes.map((note, i) => (
          <WhiteKey
            key={note}
            animate={activeKey === note ? 'pressed' : 'notPressed'}
            onMouseUp={() => {
              onMouseUp(note);
              setActiveKey(null);
            }}
            onMouseDown={() => {
              onMouseDown(note);
              setActiveKey(note);
            }}>
            {notesMap[note] === 'Backspace'
              ? '⌫'
              : notesMap[note] === 'Enter'
              ? 'Ent'
              : notesMap[note]}
          </WhiteKey>
        ))}
        {blackNotes.map(
          (note, i) =>
            note && (
              <BlackKey
                key={note}
                animate={activeKey === note ? 'pressed' : 'notPressed'}
                marginLeft={blackKeyMarginLeft[i]}
                onMouseUp={() => {
                  onMouseUp(note);
                  setActiveKey(null);
                }}
                onMouseDown={() => {
                  onMouseDown(note);
                  setActiveKey(note);
                }}>
                {notesMap[note] === 'Backspace'
                  ? '⌫'
                  : notesMap[note] === 'Enter'
                  ? 'Ent'
                  : notesMap[note]}
              </BlackKey>
            ),
        )}
      </Container>
    </Container>
  );
};

export default withMotion(Keyboard, AnimationConfig);
