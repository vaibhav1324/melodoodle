import { useCallback, useEffect, useRef } from 'react';

import * as Tone from 'tone';

import { keyMap } from 'constants/keys';

import { NotesPlayed } from 'types/common';

type Synth = Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>;

export const useKeyboardListener = (
  synth: Synth,
  setActiveKeys: React.Dispatch<React.SetStateAction<string[]>>,
  setNotesPlayed: React.Dispatch<React.SetStateAction<NotesPlayed>>,
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

      setActiveKeys((prev) => prev.filter((p) => p !== note));

      setNotesPlayed((prevNotes) =>
        prevNotes.map((n) =>
          n.note === note && n.end === null ? { ...n, end: Tone.now() } : n,
        ),
      );

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

      setActiveKeys((prev) => [...prev, note]);

      setNotesPlayed((prevNotes) => [
        ...prevNotes,
        {
          note: note,
          start: Tone.now(),
          end: null,
        },
      ]);

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
