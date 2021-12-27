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
    .attr('class', 'rate-my-prof')
    .style('display', 'grid')
    .style('grid-template-columns', '1fr 1fr');

  // When the resize event is called, reset the plot
  container.selectAll('*').remove();

  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40),
  };

  const margin = {
    top: 50,
    bottom: 20,
    left: 70,
    right: 20,
  };

  // set up containers
  const posContainer = container
    .append('div')
    .attr('class', 'positive-container')
    .style('float', 'left');

  const negContainer = container
    .append('div')
    .attr('class', 'negative-container')
    .style('float', 'right');

  // set up svgs
  const posSvg = posContainer
    .append('svg')
    .attr('class', 'postive-svg')
    .attr('height', size.height)
    .attr('width', size.width / 2)
    .style('background-color', '#ededed');

  const negSvg = negContainer
    .append('svg')
    .attr('class', 'negative-svg')
    .attr('height', size.height)
    .attr('width', size.width / 2)
    .style('background-color', '#ededed');

  // source link
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
    .domain([0, 15000])
    .range([margin.left, size.width / 2 - margin.right]);
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

  const posBars = posSvg
    .selectAll('.pos-bar')
    .data(positiveData)
    .enter()
    .append('rect')
    .attr('class', 'pos-bar')
    .attr('width', (d) => x(d.n))
    .attr('height', posY.bandwidth())
    .attr('x', margin.left)
    .attr('y', (d) => posY(d.word))
    .style('fill', colors.blue)
    .on('mouseenter', (event, d) => {
      posSvg
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

  const negBars = negSvg
    .selectAll('.neg-bar')
    .data(negativeData)
    .enter()
    .append('rect')
    .attr('class', 'neg-bar')
    .attr('width', (data) => x(data.n))
    .attr('height', negY.bandwidth())
    .attr('x', margin.left)
    .attr('y', (data) => negY(data.word))
    .style('fill', colors.red)
    .on('mouseenter', (event, d) => {
      negSvg
        .append('text')
        .attr('x', margin.left + x(d.n))
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
  posSvg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${size.height - margin.bottom})`)
    .attr('color', 'black')
    .call(
      axisBottom(x)
        .ticks(4),
    );

  // positive vertical
  posSvg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(
      axisLeft(posY),
    );

  // negative horizontal
  negSvg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${size.height - margin.bottom})`)
    .attr('color', 'black')
    .call(
      axisBottom(x)
        .ticks(4),
    );

  // negative vertical
  negSvg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(
      axisLeft(negY),
    );
};
export default makeBarPlots;
