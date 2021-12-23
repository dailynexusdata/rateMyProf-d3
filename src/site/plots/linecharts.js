/**
 * Line Charts
 *
 * @author Alec Chen
 *
 */
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';

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
  console.log(data);
  // When the resize event is called, reset the plot
  container.selectAll('*').remove();

  container.append('h1').text('Line title');

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

  container.append('a').text('Source: __________').attr('href', '');

  /*
    Create Scales:
  */
  const uniqueYears = data.map((d) => d.year).filter(onlyUnique);
  console.log(uniqueYears);
  const x = scaleBand()
    .domain(uniqueYears)
    .range([margin.left, size.width - margin.right]);

  const y = scaleLinear()
    .domain([1, 5])
    .range([size.height - margin.bottom, margin.top]);

  /*
    Start Plot:
  */

    
};

export default makeLineCharts;
