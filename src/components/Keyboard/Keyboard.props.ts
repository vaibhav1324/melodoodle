import { NotesPlayed } from 'types/common';

export type FileType = {
  blob: Blob;
  audio: HTMLAudioElement;
} | null;

export type KeyboardProps = {
  onCreateArt: (notesPlayed: NotesPlayed) => void;
};
