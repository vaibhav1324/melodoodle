import React, { memo, useEffect, useRef } from 'react';

import { Button, Center } from '@chakra-ui/react';

import { withMotion } from 'utils';

import * as d3 from 'd3';
import * as Tone from 'tone';

import { SvgArtProps } from './SvgArt.props';

import { Title } from './SvgArt.style';

const SvgArt = memo<SvgArtProps>(({ onRetry, notesPlayed }) => {
  const isSvgDrawnRef = useRef(false);

  const noteToWaveform = (frequency: number) => {
    const waveform = Array(100)
      .fill(0)
      .map((_, i) => Math.sin((2 * Math.PI * frequency * i) / 100));

    return waveform;
  };

  const drawGraph = (notesPlayed: SvgArtProps['notesPlayed']) => {
    const waveforms = notesPlayed.map((n) => {
      const frequency = Tone.Frequency(n.note).toFrequency();
      const duration = (n.end || 0) - n.start;

      const waveform = noteToWaveform(frequency);

      return { waveform, duration };
    });

    const points = waveforms.flatMap((wf) =>
      wf.waveform.map((amplitude, index) => {
        const r = amplitude;
        const theta = (2 * Math.PI * index) / wf.waveform.length;

        return {
          x: r * Math.cos(theta),
          y: r * Math.sin(theta),
        };
      }),
    );

    const durations = waveforms.map((wf) => wf.duration);
    const thresholdDuration = d3.quantile(durations, 0.3) || 0;

    const filteredPoints = points.filter(
      (_, i) => durations[i] > thresholdDuration,
    );

    // Append SVG to the div
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const maxX = Math.max(...points.map((p) => Math.abs(p.x)));
    const maxY = Math.max(...points.map((p) => Math.abs(p.y)));

    // Add X axis
    const x = d3.scaleLinear().domain([-maxX, maxX]).range([0, width]);
    svg
      .append('g')
      .attr('transform', `translate(0,${height / 2})`)
      .call(d3.axisBottom(x).ticks([]))
      .selectAll('path')
      .style('stroke', '#ffffff');

    // Add Y axis
    const y = d3.scaleLinear().domain([-maxY, maxY]).range([height, 0]);
    svg
      .append('g')
      .attr('transform', `translate(${width / 2},0)`)
      .call(d3.axisLeft(y).ticks([]))
      .selectAll('path')
      .style('stroke', '#ffffff');

    // Add dots
    svg
      .append('g')
      .selectAll('dot')
      .data(points)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('r', 4)
      .style('fill', '#fa0563');

    const line = d3
      .line<{ x: number; y: number }>()
      .curve(d3.curveCardinalClosed)
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    svg
      .append('path')
      .datum(filteredPoints)
      .attr('fill', '#afa')
      .attr('stroke', '#7646FF')
      .attr('stroke-width', 1)
      .attr('d', line);

    // svg
    //   .append('path')
    //   .datum(points)
    //   .attr('fill', 'none')
    //   .attr('stroke', '#00000010')
    //   .attr('stroke-width', 0.1)
    //   .attr('d', line);

    const hull = d3.polygonHull(points.map((d) => [x(d.x), y(d.y)]));

    svg
      .append('path')
      .attr('fill', '#ffffff50')
      .attr('stroke', 'black')
      .attr('stroke-width', 3)
      .attr('d', `M${hull?.join('L')}Z`);
  };

  useEffect(() => {
    if (isSvgDrawnRef.current) {
      return;
    }

    drawGraph(notesPlayed);

    isSvgDrawnRef.current = true;
  }, []);

  return (
    <Center flex={1} flexDirection="column">
      <Title>Your Amazing Art</Title>

      <Center id="chart"></Center>
      <Button mt="30px" onClick={onRetry} colorScheme="secondary">
        Try Again
      </Button>
    </Center>
  );
});

export default withMotion(SvgArt);
