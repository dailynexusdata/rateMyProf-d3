import { select } from 'd3-selection';
// import  { range } from 'd3-array'
import { scaleTime, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft, axisRight } from 'd3-axis';
import { timeParse } from 'd3-time-format';
import { extent, range } from 'd3-array';
import { format } from 'd3-format';
import { area, curveCatmullRom, line } from 'd3-shape';

const makeYearLineChart = (data) => {
  /*
      Container Setup:
    */

  // The class is necessary to apply styling
  const container = select('#rate-my-prof-year-line-chart').attr(
    'class',
    'rate-my-prof',
  );

  // When the resize event is called, reset the plot
  container.selectAll('*').remove();
  // const plotData = data.map((d) => ({ ...d, date: new Date(d.monthyear) }));

  // const xMax = max(data, (d) => d.n);

  const div = container.append('div');

  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40),
  };
  const margin = {
    top: 30,
    left: 50,
    bottom: 30,
    right: 30,
  };

  div.append('h1').text('Number of UCSB Reviews By Year');
  div.append('text').text('In 2000, 2 reviews were left for professors at UCSB. Since, the number of reviews left for UCSB profs per year has risen to 3,500 in 2021.  ');
  const svg = div
    .append('svg')
    .attr('height', size.height)
    .attr('width', size.width)
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  /*
      Create Scales:
    */
  div
    .append('a')
    .text('Source: RateMyProfessor.com')
    .attr('href', '');
  const x = scaleLinear()
    .domain([2000, 2023])
    .range([margin.left, size.width - margin.right]);

  const y = scaleLinear()
    .domain([0, 4000])
    .range([size.height - margin.bottom, margin.top]);

  const myLine = line()
    .x((d) => x(parseFloat(d.year)))
    .y((d) => y(parseFloat(d.count)))
    .curve(curveCatmullRom);
  svg
    .selectAll('lines')
    .data([data])
    .enter()
    .append('path')
    .attr('d', myLine)
    .attr('stroke', '#f28e2c')
    .attr('fill', 'none')
    .attr('stroke-width', '2px');
  const xAxis = svg
    .append('g')
    .style('font-size', '12pt')
    .attr('transform', `translate(0, ${size.height - margin.bottom})`)
    // .attr('color', '#adadad')
    .call(axisBottom(x).ticks(5).tickFormat(format('d')));
  const yLabel = svg.append('text')
    .attr('x', -100)
    .attr('text-anchor', 'end')
    .attr('dy', '.75em')
    .attr('transform', 'rotate(-90)')
    .text('Number of Reviews');
    // .attr('fill', '#adadad');

  const xLabel = svg.append('text')
    .attr('x', size.width - margin.right - 35)
    .attr('y', size.height - margin.bottom + 8)
    .attr('dy', '.75em')
    .text('Year');
    // .attr('fill', '#adadad');

  const floats = data.map((d) => parseFloat(d.count));
  console.log(floats);
  const yMax = Math.max(...floats);
  const yticks = range(0, yMax, 500);
  console.log(yMax);

  const horizLines = svg.append('g');
  const commas = format(','); // add commas for label markings
  yticks.slice(1).forEach((yVal) => {
    horizLines
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', size.width - margin.right)
      .attr('y1', y(yVal))
      .attr('y2', y(yVal))
      .attr('stroke', '#000000')
      .attr('stroke-width', '0.5px');

    horizLines
      .append('text')
      .text(commas(yVal))
      .style('font-size', '10pt')
      // .attr('fill', '#adadad')
      .attr('x', margin.left)
      .attr('y', y(yVal) - 5);
  });

  // yAxis.select('path').remove();
};

export default makeYearLineChart;
