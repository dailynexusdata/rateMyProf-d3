/**
 * BarPlots
 *
 * @author Jordan Russo
 *
 */
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';

/**
 * @param {*} data - What is the data?
 *
 * @author Jordan Russo
 *
 * @since 12/21/2021
 */
const makeBarPlots = (data) => {
  /*
    Container Setup:
  */

  // The class is necessary to apply styling
  console.log(data);
  const container = select('#rate-my-prof-bar-plot')
    .attr('class', 'rate-my-prof');

  // When the resize event is called, reset the plot
  container.selectAll('*').remove();

  container.append('h1').text('My title2');
  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40),
  };

  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  const svg = container
    .append('svg')
    .attr('height', size.height)
    .attr('width', size.width);

  container
    .append('a')
    .text('Source: __________')
    .attr('href', '');

  /*
    Create Scales:
  */

  const x = scaleBand()
    .domain(data.map((dataPoint) => dataPoint.word))
    .range([margin.left, size.width - margin.right])
    .paddingInner(0.1);

  const y = scaleLinear()
    .domain([0, 11000])
    .range([size.height - margin.bottom, margin.top]);

  /*
    Start Plot:
  */
  const bars = svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', x.bandwidth())
    .attr('height', (data) => size.height - y(data.n))
    .attr('x', (data) => x(data.word))
    .attr('y', (data) => y(data.n))
    .style('fill', '#69b3a2');
};

export default makeBarPlots;
