const whiteNotes = [
  'C4',
  'D4',
  'E4',
  'F4',
  'G4',
  'A4',
  'B4',
  'C5',
  'D5',
  'E5',
  'F5',
  'G5',
  'A5',
  'B5',
];

const blackNotes = [
  'C#4',
  'D#4',
  null,
  'F#4',
  'G#4',
  'A#4',
  null,
  'C#5',
  'D#5',
  null,
  'F#5',
  'G#5',
  'A#5',
];

const blackKeyMarginLeft = [
  '35px',
  '85px',
  '',
  '185px',
  '235px',
  '285px',
  '',
  '385px',
  '435px',
  '',
  '535px',
  '585px',
  '635px',
];

const keyMap: Record<string, string> = {
  a: 'C4',
  w: 'C#4',
  s: 'D4',
  e: 'D#4',
  d: 'E4',
  f: 'F4',
  t: 'F#4',
  g: 'G4',
  y: 'G#4',
  h: 'A4',
  u: 'A#4',
  j: 'B4',
  k: 'C5',
  o: 'C#5',
  l: 'D5',
  p: 'D#5',
  ';': 'E5',
  "'": 'F5',
  '[': 'F#5',
  ']': 'G5',
  Backspace: 'G#5',
  Enter: 'A5',
  n: 'A#5',
  m: 'B5',
};

const notesMap: Record<string, string> = Object.entries(keyMap).reduce(
  (map, [key, value]) => {
    map[value] = key;

    return map;
  },
  {} as Record<string, string>,
);

export { blackNotes, whiteNotes, blackKeyMarginLeft, keyMap, notesMap };
