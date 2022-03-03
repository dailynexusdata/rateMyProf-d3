/**
 * Line Charts
 *
 * @author Alec Chen
 *
 */
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeParse } from 'd3-time-format';
import { extent } from 'd3-array';
/**
 * @param {*} data - What is the data?
 *
 * @author Name
 *
 * @since Date
 */

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const makeSinglePlot = (div, data, title, color) => {
  /*
    Container Setup:
  */
  const plotData = data.map((d) => ({ year: timeParse('%Y')(d.year), value: parseFloat(d.value) }));
  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40),
  };
  const margin = {
    top: 35,
    left: 72,
    bottom: 70,
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

  const x = scaleTime()
    .domain(extent(plotData, (d) => d.year))
    .range([margin.left, size.width - margin.right]);

  const y = scaleLinear()
    .domain([2.5, 5])
    .range([size.height - margin.bottom, margin.top]);

  /*
    Start Plot:
  */
  console.log(plotData);
  const myLine = line()
    .x((d) => x(d.year))
    .y((d) => y(d.value));

  svg
    .selectAll('lines')
    .data([plotData])
    .enter()
    .append('path')
    .attr('d', myLine)
    .attr('stroke', 'black')
    .attr('fill', 'none');
  /*
    Animation:
  */

  /*
    Define Axes:
  */
  const xAxis = svg
    .append('g')
    .attr('transform', `translate(0, ${size.height - margin.bottom})`)
    .attr('color', 'black')
    .call(axisBottom(x));

  const yAxis = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr('color', 'black')
    .call(axisLeft(y));
};

const makeLineCharts = (data) => {
  /*
    Container Setup:
  */

  // The class is necessary to apply styling
  const container = select('#rate-my-prof-line-plot').attr(
    'class',
    'rate-my-prof',
  );

  // When the resize event is called, reset the plot
  container.selectAll('*').remove();

  const qualityData = data.filter((d) => d.variable === 'quality');
  const difficultyData = data.filter((d) => d.variable === 'difficulty');

  // const xMax = max(data, (d) => d.n);

  const qualityDiv = container.append('div');
  makeSinglePlot(qualityDiv, qualityData, 'Quality Ratings', '#4e79a7');

  const difficultyDiv = container.append('div');
  makeSinglePlot(difficultyDiv, difficultyData, 'Difficulty Ratings', '#e15759');
  container.append('a').text('Source: __________').attr('href', '');
};

export default makeLineCharts;
