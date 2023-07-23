import { useCallback, useEffect, useRef } from 'react';

import * as Tone from 'tone';

import { keyMap } from 'constants/keys';

type Synth = Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>;

export const useKeyboardListener = (
  synth: Synth,
  setActiveKey: (_note: string | null) => void,
) => {
  useEffect(() => {
    let keyDownMap: Record<string, boolean> = {};

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!keyDownMap[event.key]) {
        return;
      }

      if (!keyMap[event.key]) {
        return;
      }

      const note = keyMap[event.key];

      synth.triggerRelease(note);

      setActiveKey(null);

      keyDownMap[event.key] = false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (keyDownMap[event.key]) {
        return;
      }

      if (!keyMap[event.key]) {
        return;
      }

      const note = keyMap[event.key];

      synth.triggerAttack(keyMap[event.key]);

      setActiveKey(note);

      keyDownMap[event.key] = true;
    };

    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};

export const useMouseEvents = (synth: Synth) => {
  let keyDownMap = useRef<Record<string, boolean>>({}).current;

  const onMouseUp = useCallback(
    (note: string) => {
      if (!keyDownMap[note]) {
        return;
      }

      synth.triggerRelease(note);

      keyDownMap[note] = false;
    },
    [synth.triggerRelease],
  );

  const onMouseDown = useCallback(
    (note: string) => {
      if (keyDownMap[note]) {
        return;
      }

      synth.triggerAttack(note);

      keyDownMap[note] = true;
    },
    [synth.triggerAttack],
  );

  return { onMouseUp, onMouseDown };
};
