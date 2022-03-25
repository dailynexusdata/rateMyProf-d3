/**
 * Line Charts
 *
 * @author Alec Chen
 *
 */
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';
import { timeParse } from 'd3-time-format';
import { extent } from 'd3-array';
import { area, curveCatmullRom, line } from 'd3-shape';
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
  const plotData = data.map((d) => ({ ...d, date: new Date(d.monthyear) }));
  const qualityData = plotData.filter((d) => d.variable === 'quality');
  const difficultyData = plotData.filter((d) => d.variable === 'difficulty');

  // const xMax = max(data, (d) => d.n);

  const div = container.append('div');

  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40),
  };
  const margin = {
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
  };

  div.append('h1').text('My title');

  const svg = div
    .append('svg')
    .attr('height', size.height)
    .attr('width', size.width)
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  /*
    Create Scales:
  */
  console.log(plotData);
  const x = scaleTime()
    .domain([plotData[0].date, plotData[plotData.length - 1].date])
    .range([margin.left, size.width - margin.right]);

  const y = scaleLinear()
    .domain([0, 4])
    .range([size.height - margin.bottom, margin.top]);

  /*
    Start Plot:
  */
  const myLine = line()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(curveCatmullRom);
  svg
    .selectAll('lines')
    .data([qualityData, difficultyData])
    .enter()
    .append('path')
    .attr('mask', 'url(#line-chart-mask)')
    .attr('d', myLine)
    .attr('stroke', (_, i) => ['#4e79a7', '#f28e2c'][i])
    .attr('fill', 'none')
    .attr('stroke-width', '2px');

  svg.append('line') // attach a line
    .style('stroke', '#e15759') // colour the line
    .attr('x1', x('2013')) // x position of the first end of the line
    .attr('y1', y(3.8)) // y position of the first end of the line
    .attr('x2', x('2013')) // x position of the second end of the line
    .style('stroke-dasharray', ('5, 5'))
    .attr('y2', y(2));

  svg.append('line') // attach a line
    .style('stroke', '#000000') // colour the line
    .attr('x1', x('2022')) // x position of the first end of the line
    .attr('y1', y(3.8)) // y position of the first end of the line
    .attr('x2', x('2013')) // x position of the second end of the line
    .style('stroke-dasharray', ('5, 5'))
    .attr('y2', y(2));

  svg.append('text')
    .attr('x', x('2013'))
    .attr('y', y(3.82))
    .attr('fill', '#e15759')
    .style('font-size', '10px')
    .style('font-family', 'Arial, Helvetica, sans-serif')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'alphabetic')
    .text('Quality peaks/Difficulty at lowest');

  svg.append('line') // attach a line
    .style('stroke', '#e15759') // colour the line
    .attr('x1', x('2020')) // x position of the first end of the line
    .attr('y1', y(3.8)) // y position of the first end of the line
    .attr('x2', x('2020')) // x position of the second end of the line
    .style('stroke-dasharray', ('5, 5'))
    .attr('y2', y(2));

  svg.append('text')
    .attr('x', x('2020'))
    .attr('y', y(3.82))
    .attr('fill', '#e15759')
    .style('font-size', '10px')
    .style('font-family', 'Arial, Helvetica, sans-serif')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'alphabetic')
    .text('COVID pandemic begins');

  svg.append('text')
    .attr('x', x('2004'))
    .attr('y', y(3.68))
    .attr('fill', '#4e79a7')
    .style('font-size', '10px')
    .style('font-family', 'Arial, Helvetica, sans-serif')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'alphabetic')
    .text('Quality Ratings');

  svg.append('text')
    .attr('x', x('2004'))
    .attr('y', y(3.05))
    .attr('fill', '#f28e2c')
    .style('font-size', '10px')
    .style('font-family', 'Arial, Helvetica, sans-serif')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'alphabetic')
    .text('Difficulty Ratings');
  /*
    Animation:
  */

  /*
    Define Axes:
  */
  const xAxis = svg
    .append('g')
    .style('font-size', '12pt')
    .attr('transform', `translate(0, ${size.height - margin.bottom})`)
    .attr('color', '#adadad')
    .call(axisBottom(x).ticks(5));

  const leftAxis = svg
    .append('g')
    .style('font-size', '12pt')
    .attr('transform', `translate(${margin.left}, 0)`)
    .attr('color', '#adadad')
    .call(axisLeft(y).tickValues([1, 2, 3, 4]).tickFormat((d) => parseInt(d)));

  leftAxis.select('path').remove();

  const rightAxis = svg
    .append('g')
    .style('font-size', '12pt')
    .attr('transform', `translate(${size.width - margin.right}, 0)`)
    .attr('color', '#adadad')
    .call(axisRight(y).tickValues([1, 2, 3, 4]).tickFormat((d) => parseInt(d)));

  rightAxis.select('path').remove();
};

export default makeLineCharts;
