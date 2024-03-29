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

const makeSinglePlot = (div, data, title, color) => {
  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40),
  };

  const margin = {
    top: 10,
    right: 20,
    bottom: 40,
    left: 140,
  };

  const svg = div
    .append('svg')
    .attr('height', size.height)
    .attr('width', size.width);

  div
    .append('a')
    .text('Source: RateMyProfessor.com')
    .attr('href', '');

  /*
    Create Scales:
  */

  const x = scaleLinear()
    .domain([0, 5])
    .range([margin.left, size.width - margin.right]);
  console.log([1, 2, 3].reverse());
  const y = scaleBand()
    .range([size.height - margin.bottom, margin.top])
    .padding(0.1);
  if (title === 'Most Positively Reviewed Departments') {
    const depts = data.map((d) => d.Dept);
    y.domain(depts.reverse());
  }
  else {
    y.domain(data.map((d) => d.Dept));
  }
  /*
    Start Plot:
  */

  const bars = svg
    .selectAll('.rate-my-prof-bars')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'rate-my-prof-bars')
    // for the width of the bar you'll typically have to subtract the starting point:
    .attr('width', 0)
    .attr('height', y.bandwidth())
    .attr('x', margin.left)
    .attr('y', (d) => y(d.Dept))
    .style('fill', color);

  svg.selectAll('rect')
    .transition()
    .duration(800)
    .attr('x', margin.left)
    .attr('width', (d) => x(d.quality) - x(0))
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

  const xLabel = svg.append('text')
    .attr('x', x(2.5))
    .attr('y', size.height - margin.bottom + 30)
    .style('font-size', '12px')
    .style('text-anchor', 'middle')
    .text('Average Rating');
};

const makePositiveChart = (data) => {
  /*
    Container Setup:
  */
  const posData = data.slice(0, 5);
  const negData = data.slice(Math.max(data.length - 5, 1));
  // The class is necessary to apply styling
  const container = select('#rate-my-prof-positive-dept-plot').attr('class', 'rate-my-prof');

  // When the resize event is called, reset the plot
  container.selectAll('*').remove();

  container.append('h1').text('Best and Worst Departments by Average Quality');
  const posDiv = container.append('div');
  const negDiv = container.append('div');
  makeSinglePlot(posDiv, posData, 'Most Positively Reviewed Departments', '#68ffbe');
  makeSinglePlot(negDiv, negData, 'Most Negatively Reviewed Departments', 'ff9c9c');
};

export default makePositiveChart;
