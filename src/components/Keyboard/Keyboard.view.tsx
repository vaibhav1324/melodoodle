import React, { FC, useEffect, useRef, useState } from 'react';

import { Button } from '@chakra-ui/react';
import { MdAttractions, MdPlayCircle } from 'react-icons/md';

import { withMotion } from 'utils';
import { useInitializer } from 'hooks';

import {
  notesMap,
  blackNotes,
  whiteNotes,
  blackKeyMarginLeft,
} from 'constants/keys';

import * as Tone from 'tone';

import Countdown from './Countdown';

import {
  Note,
  Title,
  WhiteKey,
  BlackKey,
  Container,
  BallContainer,
  RecordingBall,
  AnimationConfig,
} from './Keyboard.style';

import { useKeyboardListener, useMouseEvents } from './Keyboard.utils';

import { NotesPlayed } from 'types/common';
import { FileType, KeyboardProps } from './Keyboard.props';

const synth = new Tone.PolySynth().toDestination();

const DURATION = 24000;

const Keyboard: FC<KeyboardProps> = ({ onCreateArt }) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const recorder = useInitializer(new Tone.Recorder());

  const [file, setFile] = useState<FileType>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [notesPlayed, setNotesPlayed] = useState<NotesPlayed>([]);

  const onRecordingStart = () => {
    Tone.Transport.start();

    Tone.Destination.connect(recorder);

    recorder.start();

    timeoutIdRef.current = setTimeout(async () => {
      const blob = await recorder.stop();

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      if (blob.size !== 0) {
        setFile({
          blob,
          audio,
        });
      }

      setIsRecording(false);
    }, DURATION);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);

        timeoutIdRef.current = null;
      }
    };
  }, []);

  useKeyboardListener(synth, setActiveKeys, setNotesPlayed);

  const { onMouseUp, onMouseDown } = useMouseEvents(synth);

  const onKeyRelease = (note: string) => () => {
    if (activeKeys.length === 0) {
      return;
    }

    onMouseUp(note);

    setActiveKeys((prev) => prev.filter((p) => p !== note));

    setNotesPlayed((prevNotes) =>
      prevNotes.map((n) =>
        n.note === note && n.end === null ? { ...n, end: Tone.now() } : n,
      ),
    );
  };

  const onKeyAttack = (note: string) => () => {
    onMouseDown(note);

    setActiveKeys((prev) => [...prev, note]);

    setNotesPlayed((prevNotes) => [
      ...prevNotes,
      {
        note: note,
        start: Tone.now(),
        end: null,
      },
    ]);
  };

  return (
    <Container position="relative" direction="column" overflow="hidden">
      <Title>Create an Audio</Title>
      <Container justify="flex-start" align="flex-start" flex={0}>
        {whiteNotes.map((note, i) => (
          <WhiteKey
            key={note}
            onMouseUp={onKeyRelease(note)}
            onMouseDown={onKeyAttack(note)}
            onMouseLeave={onKeyRelease(note)}
            animate={activeKeys.includes(note) ? 'pressed' : 'notPressed'}>
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
                onMouseUp={onKeyRelease(note)}
                onMouseDown={onKeyAttack(note)}
                onMouseLeave={onKeyRelease(note)}
                marginLeft={blackKeyMarginLeft[i]}
                animate={activeKeys.includes(note) ? 'pressed' : 'notPressed'}>
                {notesMap[note] === 'Backspace'
                  ? '⌫'
                  : notesMap[note] === 'Enter'
                  ? 'Ent'
                  : notesMap[note]}
              </BlackKey>
            ),
        )}
      </Container>

      {isRecording && (
        <>
          <BallContainer>
            <RecordingBall />
          </BallContainer>
          <Countdown />
        </>
      )}

      {file && (
        <>
          <Button
            mb="20px"
            variant="outline"
            rightIcon={<MdPlayCircle size="22px" />}
            onClick={() => {
              try {
                file.audio.play();
              } catch (error) {}
            }}>
            Play Audio
          </Button>
          <Button
            rightIcon={<MdAttractions />}
            variant="outline"
            colorScheme="secondary"
            onClick={() => onCreateArt(notesPlayed)}>
            Create Art
          </Button>
        </>
      )}

      {file === null && (
        <>
          <Button
            isDisabled={isRecording}
            colorScheme={isRecording ? 'red' : 'secondary'}
            onClick={() => {
              setFile(null);
              setNotesPlayed([]);
              setIsRecording((prev) => !prev);

              onRecordingStart();
            }}>
            {isRecording ? 'Recording...' : 'Start Recording'}
          </Button>
          <Note>
            Audio redording will start as soon as you press 'Start' button and
            will continue uptill {(DURATION / 1000).toLocaleString()}s
          </Note>
        </>
      )}
    </Container>
  );
};

export default withMotion(Keyboard, AnimationConfig);
