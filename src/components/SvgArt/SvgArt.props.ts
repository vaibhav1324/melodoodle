import { NotesPlayed } from 'types/common';

export type SvgArtProps = {
  notesPlayed: NotesPlayed;
};

export type SvgArtRef = {
  onLoadArt: (notesPlayed: NotesPlayed) => void;
};
