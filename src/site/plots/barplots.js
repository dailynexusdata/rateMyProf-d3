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
    top: 50,
    bottom: 20,
    left: 70,
    midright: (size.width / 2) - 80, // right margin for left side
    midleft: (size.width / 2) + 70, // left margin for right side
    right: 10,
  };

  const svg = container
    .append('svg')
    .attr('height', size.height)
    .attr('width', size.width)
    .style('background-color', '#ededed');

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
    .range([margin.left, margin.midright]);

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
    .style('fill', colors.blue)
    .on('mouseenter', (event, d) => {
      svg
        .append('text')
        .attr('x', margin.left + x(d.n))
        .attr('y', posY(d.word) + 20)
        .text(d.n)
        .attr('class', 'hover-over-text')
        .style('font-size', 'small');
    })
    .on('mouseleave', () => {
      selectAll('.hover-over-text').remove();
    });

  const negBars = svg
    .selectAll('.neg-bar')
    .data(negativeData)
    .enter()
    .append('rect')
    .classed('neg-bar', true)
    .attr('width', (data) => x(data.n))
    .attr('height', negY.bandwidth())
    .attr('x', margin.midleft)
    .attr('y', (data) => negY(data.word))
    .style('fill', colors.red)
    .on('mouseenter', (event, d) => {
      svg
        .append('text')
        .attr('x', margin.midleft + x(d.n))
        .attr('y', negY(d.word) + 20)
        .text(d.n)
        .attr('class', 'hover-over-text')
        .style('font-size', 'small');
    })
    .on('mouseleave', () => {
      selectAll('.hover-over-text').remove();
    });

  /*
    Define Axes:
  */
  // postive horizontal
  svg
    .append('g')
    .attr('transform', `translate(0, ${size.height - margin.bottom})`)
    .attr('color', 'black')
    .call(
      axisBottom(x)
        .ticks(4),
    );

  // positive vertical
  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(
      axisLeft(posY),
    );

  // negative horizontal
  svg
    .append('g')
    .attr('transform', `translate(${margin.midleft}, ${size.height - margin.bottom})`)
    .attr('color', 'black')
    .call(
      axisBottom(x)
        .ticks(4),
    );

  // negative vertical
  svg
    .append('g')
    .attr('transform', `translate(${margin.midleft}, 0)`)
    .call(
      axisLeft(negY),
    );
};
export default makeBarPlots;
