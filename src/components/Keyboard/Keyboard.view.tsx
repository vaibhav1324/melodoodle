import React, { FC, useEffect, useRef, useState } from 'react';

import { Button } from '@chakra-ui/react';
import { MdPlayCircle } from 'react-icons/md';

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

type FileType = {
  blob: Blob;
  audio: HTMLAudioElement;
} | null;

const synth = new Tone.PolySynth().toDestination();

const Keyboard: FC = () => {
  const isRecordingRef = useRef(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const recorder = useInitializer(new Tone.Recorder());

  const [file, setFile] = useState<FileType>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const onRecordingStart = () => {
    if (isRecordingRef.current) {
      return;
    }

    Tone.Transport.start();

    Tone.Destination.connect(recorder);

    recorder.start();

    isRecordingRef.current = true;

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

      isRecordingRef.current = false;
    }, 18000);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);

        timeoutIdRef.current = null;
      }
    };
  }, []);

  useKeyboardListener(synth, setActiveKeys);

  const { onMouseUp, onMouseDown } = useMouseEvents(synth);

  return (
    <Container position="relative" direction="column" overflow="hidden">
      <Title>Create an Audio</Title>
      <Container justify="flex-start" align="flex-start" flex={0}>
        {whiteNotes.map((note, i) => (
          <WhiteKey
            key={note}
            animate={activeKeys.includes(note) ? 'pressed' : 'notPressed'}
            onMouseLeave={() => {
              onMouseUp(note);

              setActiveKeys((prev) => prev.filter((p) => p !== note));
            }}
            onMouseUp={() => {
              onMouseUp(note);

              setActiveKeys((prev) => prev.filter((p) => p !== note));
            }}
            onMouseDown={() => {
              onMouseDown(note);

              setActiveKeys((prev) => [...prev, note]);
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
                animate={activeKeys.includes(note) ? 'pressed' : 'notPressed'}
                marginLeft={blackKeyMarginLeft[i]}
                onMouseLeave={() => {
                  onMouseUp(note);

                  setActiveKeys((prev) => prev.filter((p) => p !== note));
                }}
                onMouseUp={() => {
                  onMouseUp(note);

                  setActiveKeys((prev) => prev.filter((p) => p !== note));
                }}
                onMouseDown={() => {
                  onMouseDown(note);

                  setActiveKeys((prev) => [...prev, note]);
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

      {isRecording && (
        <>
          <BallContainer>
            <RecordingBall />
          </BallContainer>
          <Countdown />
        </>
      )}

      {file && (
        <Button
          mb="20px"
          rightIcon={<MdPlayCircle size="22px" />}
          onClick={() => {
            try {
              file.audio?.play?.();
            } catch (error) {}
          }}>
          Play Audio
        </Button>
      )}

      <Button
        isDisabled={isRecording}
        colorScheme={isRecording ? 'red' : 'secondary'}
        onClick={() => {
          setFile(null);

          setIsRecording((prev) => !prev);

          onRecordingStart();
        }}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </Button>
      <Note>
        Audio redording will start as soon as you press 'Start' button
      </Note>
    </Container>
  );
};

export default withMotion(Keyboard, AnimationConfig);
