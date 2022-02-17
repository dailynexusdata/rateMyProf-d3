/**
 * File Description
 *
 * @author Name
 *
 */
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

/**
 * @param {*} data - What is the data?
 *
 * @author Name
 *
 * @since Date
 */

function colorPicker(num) {
  if (num < 0.5) {
    return '#ff9c9c';
  }
  if (num > 0.6) {
    return '#68ffbe';
  }

  return '#ebc934';
}

const makePositiveChart = (data) => {
  /*
    Container Setup:
  */
  const plotData = data.slice(0, 10);
  console.log(plotData);
  // The class is necessary to apply styling
  const container = select('#rate-my-prof-positive-dept-plot').attr('class', 'rate-my-prof');

  // When the resize event is called, reset the plot
  container.selectAll('*').remove();

  container.append('h1').text('My title');

  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40),
  };

  const margin = {
    top: 10,
    right: 10,
    bottom: 20,
    left: 80,
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
    .domain([0, 1])
    .range([margin.left, size.width - margin.right]);

  const y = scaleBand()
    .domain(plotData.map((d) => d.Dept))
    .range([size.height - margin.bottom, margin.top])
    .padding(0.1);

  /*
    Start Plot:
  */

  const bars = svg
    .selectAll('.rate-my-prof-bars')
    .data(plotData)
    .enter()
    .append('rect')
    .attr('class', 'rate-my-prof-bars')
    // for the width of the bar you'll typically have to subtract the starting point:
    .attr('width', 0)
    .attr('height', y.bandwidth())
    .attr('x', margin.left)
    .attr('y', (d) => y(d.Dept))
    .style('fill', (d) => colorPicker(d.positive_percapita));

  svg.selectAll('rect')
    .transition()
    .duration(800)
    .attr('x', margin.left)
    .attr('width', (d) => x(d.positive_percapita) - x(0))
    .delay((d, i) => i * 100);

  const xAxis = svg
    .append('g')
    .attr('transform', `translate(0, ${size.height - margin.bottom})`)
    .attr('color', 'black')
    .call(axisBottom(x).ticks(4));

  const yAxis = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr('color', 'black')
    .call(axisLeft(y));
};

export default makePositiveChart;
