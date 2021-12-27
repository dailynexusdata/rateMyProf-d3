/**
 * BarPlots
 *
 * @author Jordan Russo
 *
 */
import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

/**
 * @author Jordan Russo
 *
 * @since 12/21/2021
 *
 * @param div {*} - div for the specific bar plot
 * @param d {*}- array of data for most frequent positive and negative sentiment words and their frequencies.
 * @param title {string} - Title for each plot
 * @param color {string} - Color each plot
 * @param xMax {number} - max range for x axis of each plot
*/
const makeSinglePlot = (div, d, title, color, yMax) => {
  /*
    Container Setup:
  */
  const size = {
    height: 400,
    width: (Math.min(600, window.innerWidth - 40)) / 2,
  };
  const margin = {
    top: 35,
    left: 20,
    bottom: 30,
    right: 20,
  };
  const svg = div
    .append('svg')
    .attr('height', size.height)
    .attr('width', size.width)
    .style('background-color', '#ededed');

  /*
    Create Scales:
  */
  const x = scaleLinear()
    .domain([0, 15000])
    .range([margin.left, size.width - margin.right]);

  const y = scaleBand()
    .domain(d.map((d) => d.word))
    .range([size.height - margin.bottom, margin.top])
    .padding(0.1);

  /*
    Start Plot:
  */
  const bars = svg
    .selectAll('.bars')
    .data(d)
    .enter()
    .append('rect')
    .attr('class', 'bars')
    .attr('width', (d) => x(d.n))
    .attr('height', (d) => y.bandwidth())
    .attr('x', margin.left)
    .attr('y', (d) => y(d.word))
    .style('fill', color);

  /*
    Define Axes:
  */
  const xAxis = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${size.height - margin.bottom})`)
    .attr('color', 'black')
    .call(
      axisBottom(x)
        .ticks(4),
    );
};
const makeBarPlots = (data) => {
  const container = select('#rate-my-prof-bar-plot')
    .attr('class', 'rate-my-prof')
    .style('display', 'grid')
    .style('grid-template-columns', '1fr 1fr');

  container.selectAll('*').remove();
  const posData = data.filter((d) => d.sentiment === 'positive');
  const negData = data.filter((d) => d.sentiment === 'negative');

  const posDiv = container.append('div');
  makeSinglePlot(posDiv, posData, 'Positive Sentiments', '#4e79a7');

  const negDiv = container.append('div');
  makeSinglePlot(negDiv, negData, 'Negative Sentiments', '#e15759');
};

export default makeBarPlots;
