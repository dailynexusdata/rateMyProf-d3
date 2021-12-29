/**
 * BarPlots
 *
 * @author Jordan Russo
 *
 */
import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';

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
const makeSinglePlot = (div, d, title, color) => {
  /*
    Container Setup:
  */
  const size = {
    height: 400,
    width: (Math.min(600, window.innerWidth - 40)) / 2,
  };
  const margin = {
    top: 35,
    left: 70,
    bottom: 30,
    right: 30,
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
    .attr('width', 0)
    .attr('height', (d) => y.bandwidth())
    .attr('x', margin.left)
    .attr('y', (d) => y(d.word))
    .style('fill', color)
    .on('mouseenter', (event, d) => {
      svg
        .append('text')
        .attr('x', margin.left + x(d.n))
        .attr('y', y(d.word) + 20)
        .text(d.n)
        .attr('class', 'hover-over-text')
        .style('font-size', 'small');
    })
    .on('mouseleave', () => {
      selectAll('.hover-over-text').remove();
    });

  /*
    Animation:
  */
  svg.selectAll('rect')
    .transition()
    .duration(800)
    .attr('x', margin.left)
    .attr('width', (d) => x(d.n))
    .delay((d, i) => i * 100);

  /*
    Define Axes:
  */
  const xAxis = svg
    .append('g')
    .attr('transform', `translate(0, ${size.height - margin.bottom})`)
    .attr('color', 'black')
    .call(
      axisBottom(x)
        .ticks(4),
    );

  const yAxis = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr('color', 'black')
    .call(
      axisLeft(y),
    );
};

const makeBarPlots = (data) => {
  const container = select('#rate-my-prof-bar-plot')
    .attr('class', 'rate-my-prof')
    .style('display', 'grid')
    .style('grid-template-columns', '1fr 1fr');

  console.log(data);
  container.selectAll('*').remove();

  const posData = data.filter((d) => d.sentiment === 'positive');
  const negData = data.filter((d) => d.sentiment === 'negative');

  const posDiv = container.append('div');
  makeSinglePlot(posDiv, posData, 'Positive Sentiments', '#4e79a7');

  const negDiv = container.append('div');
  makeSinglePlot(negDiv, negData, 'Negative Sentiments', '#e15759');
};

export default makeBarPlots;
