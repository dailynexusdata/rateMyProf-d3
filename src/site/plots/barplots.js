/**
 * BarPlots
 *
 * @author Jordan Russo
 *
 */
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

/**
 * @param {*} data - What is the data?
 *
 * @author Name
 *
 * @since Date
 */
const makeBarPlots = (data) => {
  /*
    Container Setup:
  */

  // The class is necessary to apply styling
  const container = select('#rate-my-prof-div-id').attr('class', 'rate-my-prof');

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
    bottom: 10,
    left: 10,
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

  const y = scaleLinear()
    .domain([0, 1])
    .range([size.height - margin.bottom, margin.top]);

  /*
    Start Plot:
  */
};

export default makeBarPlots;
