import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';

/**
 *
 * @param div {*} - div for the specific bar plot
 * @param d {*}- array of data for most frequent positive and negative sentiment words and their frequencies.
 * @param title {string} - Title for each plot
 * @param color {string} - Color each plot
 * @param xMax {number} - max range for x axis of each plot
 */

const makeSinglePlot = (div, d, title, color, yMax) => {
  const size = {
    width: 250,
    height: 250,
  };
  const margin = {
    top: 35,
    left: 10,
    bottom: 30,
    right: 10,
  };

  const svg = div.append('svg');

  svg.attr('height', size.height).attr('width', size.width);
};

const makeBarPlots = (data) => {
  const container = select('#rate-my-prof-bar-plot')
    .attr('class', 'rate-my-prof')
    .style('display', 'grid')
    .style('grid-template-columns', '1fr 1fr');

  container.selectAll('*').remove();
  const posData = data.filter((d) => d.sentiment === 'positive');
  const negData = data.filter((d) => d.sentiment === 'negative');

  const posDiv = container.append('div');
  makeSinglePlot(posDiv, posData, 'Positive Sentiments', '#4e79a7');

  const negDiv = container.append('div');
  makeSinglePlot(negDiv, negData, 'Negative Sentiments', '#e15759');
};
