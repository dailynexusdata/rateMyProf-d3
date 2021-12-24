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

  container.append('h1').text('Bar Plot');
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

  // split data
  const positiveData = [];
  const negativeData = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].sentiment === 'positive') {
      positiveData.push(data[i]);
    }
    else {
      negativeData.push(data[i]);
    }
  }

  const x = scaleLinear()
    .domain([0, 11000])
    .range([margin.left, (size.width / 2)]);

  const posY = scaleBand()
    .domain(positiveData.map((dataPoint) => dataPoint.word))
    .range([size.height - margin.bottom, margin.top])
    .padding(0.1);

  const negY = scaleBand()
    .domain(negativeData.map((dataPoint) => dataPoint.word))
    .range([size.height - margin.bottom, margin.top])
    .padding(0.1);

  /*
    Start Plot:
  */

  const colors = {
    blue: '#4e79a7',
    red: '#e15759',
  };
  const posBars = svg
    .selectAll('.pos-bar')
    .data(positiveData)
    .enter()
    .append('rect')
    .classed('pos-bar', true)
    .attr('width', (data) => x(data.n))
    .attr('height', posY.bandwidth())
    .attr('x', margin.left)
    .attr('y', (data) => posY(data.word))
    .style('fill', colors.blue);

  const posText = svg
    .selectAll('labels')
    .data(positiveData)
    .enter()
    .append('text')
    .text((d) => d.word)
    .attr('x', margin.left)
    .attr('y', (d) => posY(d.word) + 20);

  const negBars = svg
    .selectAll('.neg-bar')
    .data(negativeData)
    .enter()
    .append('rect')
    .classed('neg-bar', true)
    .attr('width', (data) => x(data.n))
    .attr('height', negY.bandwidth())
    .attr('x', size.width / 2)
    .attr('y', (data) => negY(data.word))
    .style('fill', colors.red);

  const negText = svg
    .selectAll('labels')
    .data(negativeData)
    .enter()
    .append('text')
    .text((d) => d.word)
    .attr('x', size.width / 2)
    .attr('y', (d) => negY(d.word) + 20);
};
export default makeBarPlots;
