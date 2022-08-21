/**
 * File Description
 *
 * @author Name
 *
 */
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

const makeDeptCountPlot = (data) => {
  /**
  * @param {*} data - What is the data?
  *
  * @author Name
  *
  * @since Date
  */

  const container = select('#rate-my-prof-dept-count-plot').attr('class', 'rate-my-prof');
  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40),
  };

  const margin = {
    top: 10,
    right: 0,
    bottom: 35,
    left: 140,
  };
  container.append('h1').text('Most Reviewed UCSB Departments');
  const svg = container
    .append('svg')
    .attr('height', size.height)
    .attr('width', size.width);

  container
    .append('a')
    .text('Source: RateMyProfessor.com')
    .attr('href', '');

  /*
    Create Scales:
  */
  const countsArray = data.map((d) => parseFloat(d.count));
  const x = scaleLinear()
    .domain([0, Math.max(...countsArray)])
    .range([margin.left, size.width - margin.right]);

  const depts = data.map((d) => d.Dept);

  const y = scaleBand()
    .domain(depts.reverse())
    .range([size.height - margin.bottom, margin.top])
    .padding(0.1);

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
    .style('fill', '#f28e2c');

  svg.selectAll('rect')
    .transition()
    .duration(800)
    .attr('x', margin.left)
    .attr('width', (d) => x(d.count) - x(0))
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

  const yLabel = svg.append('text')
    .attr('x', (size.height - (margin.bottom + margin.top) / 2))
    .attr('text-anchor', 'end')
    .attr('dy', '.75em')
    .attr('transform', 'rotate(-90)')
    .text('Department')
    .attr('fill', '#adadad');

  const xLabel = svg.append('text')
    .attr('x', (size.width + margin.left - (margin.left)) / 2)
    .attr('y', size.height - margin.bottom + 30)
    .style('font-size', '12px')
    .text('Number of Reviews');
};

export default makeDeptCountPlot;
