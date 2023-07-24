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
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

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

      setFile({
        blob,
        audio,
      });

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

  useKeyboardListener(synth, setActiveKey);

  const { onMouseUp, onMouseDown } = useMouseEvents(synth);

  return (
    <Container position="relative" direction="column" overflow="hidden">
      <Title>Create an Audio</Title>
      <Container justify="flex-start" align="flex-start" flex={0}>
        {whiteNotes.map((note, i) => (
          <WhiteKey
            key={note}
            animate={activeKey === note ? 'pressed' : 'notPressed'}
            onMouseLeave={() => {
              onMouseUp(note);
              setActiveKey(null);
            }}
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
                onMouseLeave={() => {
                  onMouseUp(note);
                  setActiveKey(null);
                }}
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

      {isRecording && (
        <BallContainer>
          <RecordingBall />
        </BallContainer>
      )}

      {file && (
        <Button
          mb="20px"
          rightIcon={<MdPlayCircle size="22px" />}
          onClick={() => {
            file.audio.play();
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
