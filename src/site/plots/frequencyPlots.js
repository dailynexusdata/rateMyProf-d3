/**
 * Plot one Departments word frequency relative to another
 *
 * @author Name
 *
 */
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

/**
 * @param {*} data - What is the data? textcounts.csv, a dataframe made in R by scraping ratemyprof
 * for text, each column is a department, and each row is a word with its count.
 *
 * @author Zach
 *
 * @since 11/29/2021
 */
const makeFrequencyPlot = (data) => {
  /*
    Container Setup:
  */

  // The class is necessary to apply styling
  const container = select('#rate-my-prof-frequency-plot')
    .attr('class', 'rate-my-prof-frequency');
  const depts = Object.keys(data[1]).slice(2, 89);
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

export default makeFrequencyPlot;
