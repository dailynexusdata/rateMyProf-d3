/**
 * Plot one Departments word frequency relative to another
 *
 * @author Name
 *
 */
import { select } from 'd3-selection';
import { scaleLog } from 'd3-scale';
import { min, max } from 'd3-array';
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

  console.log(data);
  // The class is necessary to apply styling
  const container = select('#rate-my-prof-frequency-plot')
    .attr('class', 'rate-my-prof-frequency');
  let firstSelectIndex = 0;
  let secondSelectIndex = 5;
  container.selectAll('*').remove();

  const depts = Object.keys(data[1]).slice(2, 89);
  const firstSelector = container.append('select')
    .attr('dept', 'dept-list')
    .attr('id', 'first-option-frequency-selector');

  const firstOptions = firstSelector.selectAll('option')
    .data(depts)
    .enter()
    .append('option')
    .text((d) => d)
    .attr('value', (d) => d);

  const secondSelector = container.append('select')
    .attr('id', 'second-option-frequency-selector');

  const secondOptions = secondSelector.selectAll('option')
    .data(depts)
    .enter()
    .append('option')
    .text((d) => d)
    .attr('value', (d) => d)
    .property('selected', (d) => d === 'Art');

  const plotButton = container
    .append('button')
    .text('Make Plot')
    .on('click', () => {
      // const s = firstSelector[0];
      // console.log(s.options[s.selectedIndex].text);
      firstSelectIndex = document
        .getElementById('first-option-frequency-selector').selectedIndex;
      secondSelectIndex = document
        .getElementById('second-option-frequency-selector').selectedIndex;
    });

  const firstDept = depts[firstSelectIndex];
  const secondDept = depts[secondSelectIndex];
  const plotData = data
    .map((d) => [d.word, parseFloat(d[firstDept]), parseFloat(d[secondDept])])
    .filter((d) => !isNaN(d[1]) && !isNaN(d[2]));
  console.log(plotData[1]);

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
  const maxX = max(plotData.map((d) => d[1]));
  const minX = min(plotData.map((d) => d[1]));
  const maxY = max(plotData.map((d) => d[2]));
  const minY = min(plotData.map((d) => d[2]));

  const x = scaleLog()
    .domain([minX, maxX])
    .range([margin.left, size.width - margin.right]);

  const y = scaleLog()
    .domain([minY, maxY])
    .range([size.height - margin.bottom, margin.top]);
  /*
    Start Plot:
  */
  console.log(x(1));
  const circleGroup = svg.append('g')
    .selectAll('dot')
    .data(plotData)
    .enter()
    .append('g');
  circleGroup
    .append('circle')
    .attr('cx', (d) => x(d[1]))
    .attr('cy', (d) => y(d[2]))
    .attr('r', 3)
    .style('fill', '#69b3a2');
  circleGroup
    .data((plotData.filter((d, i) => i % 5 === 0)))
    .append('text')
    .attr('x', (d) => x(d[1]))
    .attr('y', (d) => y(d[2]))
    .text((d) => d[0]);
};

export default makeFrequencyPlot;
