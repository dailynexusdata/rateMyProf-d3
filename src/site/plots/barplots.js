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

  const x = scaleLinear()
    .domain([0, 11000])
    .range(([margin.left, size.width - margin.right]));

  const y = scaleBand()
    .domain(data.map((dataPoint) => dataPoint.word))
    .range([size.height - margin.bottom, margin.top])
    .padding(0.1);

  /*
    Start Plot:
  */
  // spliting data
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

  console.log([positiveData, negativeData]);

  const bars = svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', (data) => x(data.n))
    .attr('height', y.bandwidth())
    .attr('x', margin.left)
    .attr('y', (data) => y(data.word))
    .style('fill', '#69b3a2')
    .text((dataPoint) => dataPoint.name);
};
export default makeBarPlots;
