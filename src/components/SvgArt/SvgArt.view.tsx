import React, { memo } from 'react';

import { chakra } from '@chakra-ui/react';

import { useInitializer } from 'hooks';

import * as d3 from 'd3';
import * as Tone from 'tone';

import { SvgArtProps } from './SvgArt.props';

const Svg = chakra('svg');

const SvgArt = memo<SvgArtProps>(({ notesPlayed }) => {
  const path = useInitializer(() => {
    const data = notesPlayed;

    const durations = data.map((n) => (n.end || 0) - n.start);

    const frequencies = data.map((n) => Tone.Frequency(n.note).toFrequency());
    const amplitudes = [...frequencies];
    const phases = frequencies.map(
      (f) => 2 * Math.PI * (Math.log(f) / Math.log(2)),
    );

    const sqrtDurations = durations.map((d) => Math.sqrt(d));
    const logDurations = durations.map((d) => Math.log(d));

    const modulatedPhases = phases.map((p, i) => p | i % 256);
    const modulatedAmplitudes = amplitudes.map((a, i) => a | i % 256);
    const modulatedFrequencies = frequencies.map((f, i) => f | i % 256);

    const points = modulatedPhases.map((p, i) => {
      const x = p + modulatedFrequencies[i] + sqrtDurations[i];
      const y = modulatedAmplitudes[i] + logDurations[i] - amplitudes[i];

      return [x, y] as [number, number];
    });

    const areaGenerator = d3
      .area()
      .x((d) => d?.[0])
      .y0(0)
      .y1((d) => d?.[1])
      .curve(d3.curveCardinal);

    const pathData = areaGenerator(points);

    return pathData || '';
  });

  return (
    <Svg
      h="50vh"
      w="50vw"
      bg="#fff"
      p="5px"
      my="20px"
      boxShadow="0 0 20px 0 rgba(0,0,0,0.1)">
      <path d={path} fill="#fff" strokeWidth="1px" stroke="black"></path>
    </Svg>
  );
});

export default SvgArt;
