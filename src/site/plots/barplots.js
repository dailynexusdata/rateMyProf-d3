/**
 * BarPlots
 *
 * @author Jordan Russo
 *
 */
import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { transition } from 'd3-transition';

/**
 * @author Jordan Russo
 *
 * @since 12/21/2021
 *
 * @param div {*} - div for the specific bar plot
 * @param d {*}- array of data for most frequent positive and negative sentiment words and their frequencies.
 * @param title {string} - Title for each plot
 * @param color {string} - Color each plot
 * @param xMax {number} - max range for x axis of each plot
 */
const makeSinglePlot = (div, d, title, color, xMax) => {
  /*
    Container Setup:
  */
  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40) / 2,
  };
  const margin = {
    top: 35,
    left: 72,
    bottom: 40,
    right: 30,
  };
  const svg = div
    .append('svg')
    .attr('height', size.height)
    .attr('width', size.width);
  svg.append('h3')
    .attr('x', 20)
    .attr('y', 50)
    .text(title);
  /*
    Create Scales:
  */
  const x = scaleLinear()
    .domain([0, xMax])
    .range([margin.left, size.width - margin.right]);

  const y = scaleBand()
    .domain(d.map((d) => d.word))
    .range([size.height - margin.bottom, margin.top])
    .padding(0.1);

  /*
    Start Plot:
  */

  const bars = svg
    .selectAll('.rate-my-prof-bars')
    .data(d)
    .enter()
    .append('rect')
    .attr('class', 'rate-my-prof-bars')
    // for the width of the bar you'll typically have to subtract the starting point:
    .attr('width', 0)
    .attr('height', y.bandwidth())
    .attr('x', margin.left)
    .attr('y', (d) => y(d.word))
    .style('fill', color)
    .on('mouseenter', (event, d) => {
      svg
        .append('text')
        .attr('x', margin.left + x(d.n) - x(0))
        .attr('y', y(d.word) + 20)
        .text(d.n)
        .attr('class', 'hover-over-text')
        .style('font-size', 'small');
    })
    .on('mouseleave', () => {
      selectAll('.hover-over-text').remove();
    });

  /*
    Animation:
  */
  svg.selectAll('rect')
    .transition()
    .duration(800)
    .attr('x', margin.left)
    .attr('width', (d) => x(d.n) - x(0))
    .delay((d, i) => i * 100);

  /*
    Define Axes:
  */
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
    .attr('x', x(xMax / 2))
    .attr('y', size.height - margin.bottom + 30)
    .style('font-size', '12px')
    .style('text-anchor', 'middle')
    .text('Word Count');
};

const makeBarPlots = (data) => {
  const titleContainer = select('#rate-my-prof-bar-plot').append('div').attr('class', 'rate-my-prof');

  titleContainer.append('h1').text('Top Words Used To Review UCSB Profs by Connotation').style('margin-bottom', '10px');
  titleContainer.append('p').text('The UCSB Data team matched text collected from RMP reviews with the Bing Sentiment Lexicon to determine if a given word had a positive or negative connotation');
  const container = select('#rate-my-prof-bar-plot')
    .append('div')
    .attr('class', 'rate-my-prof')
    .style('display', 'grid')
    .style('grid-template-columns', '1fr 1fr');

  container.selectAll('*').remove();

  const posData = data.filter((d) => d.sentiment === 'positive');
  const negData = data.filter((d) => d.sentiment === 'negative');

  const xMax = max(data.map((d) => parseInt(d.n))) + 1000;

  // const xMax = max(data, (d) => d.n);

  const posDiv = container.append('div');
  makeSinglePlot(posDiv, posData, 'Positive Sentiments', '#4e79a7', xMax);

  const negDiv = container.append('div');
  makeSinglePlot(negDiv, negData, 'Negative Sentiments', '#e15759', xMax);

  container
    .append('p')
    .html(
      'Source: RateMyProfessor.com',
    ).style('margin-bottom', '10px');
};

export default makeBarPlots;
