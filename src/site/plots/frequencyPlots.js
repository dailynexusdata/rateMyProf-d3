/**
 * Plot one Departments word frequency relative to another
 *
 * @author Name
 *
 */
import { select, selectAll } from 'd3-selection';
import { scaleLog } from 'd3-scale';
import { min, max } from 'd3-array';
import { transition } from 'd3-transition';
import { axisBottom, axisLeft } from 'd3-axis';
/**
 * @param {*} data - What is the data? textcounts.csv, a dataframe made in R by scraping ratemyprof
 * for text, each column is a department, and each row is a word with its count.
 *
 * @author Zach
 *
 * @since 11/29/2021
 */

const randomJitter = (coord) =>
  // Math.random() - 0.5 is a number [-0.5, 0.5]
  // * 20 => [-10, 10]
  // I'm not sure if you want it to be an integer, you could remove the last math.round
  coord + Math.round(20 * (Math.random() - 0.5));

const buttonClick = () => {
  firstSelectIndex = document
    .getElementById('first-option-frequency-selector').selectedIndex;
  secondSelectIndex = document
    .getElementById('second-option-frequency-selector').selectedIndex;
  makePlot();
};
const makeFrequencyPlot = (data) => {
  /*
    Container Setup:
  */

  // The class is necessary to apply styling
  const container = select('#rate-my-prof-frequency-plot').attr(
    'class',
    'rate-my-prof-frequency',
  );
  let firstSelectIndex = 0;
  let secondSelectIndex = 5;
  container.selectAll('*').remove();

  const buttonClick = () => {
    firstSelectIndex = document.getElementById(
      'first-option-frequency-selector',
    ).selectedIndex;

    // if you reorganize the order of this file, then you could
    // probably remove the id's from the selection boxes. Typically,
    // if you're saving something to a variable you don't need an id
    // to select later. You can do something like this to have this
    // function work the same but with the variable:
    // firstSelectIndex = firstSelector.node().selectedIndex;

    console.log(firstSelectIndex);
    secondSelectIndex = document.getElementById(
      'second-option-frequency-selector',
    ).selectedIndex;
    makePlot();
  };

  const depts = Object.keys(data[1]).slice(2, 89);
  const firstSelector = container
    .append('select')
    .attr('dept', 'dept-list')
    .attr('id', 'first-option-frequency-selector')
    .on('change', buttonClick);

  const firstOptions = firstSelector
    .selectAll('option')
    .data(depts)
    .enter()
    .append('option')
    .text((d) => d)
    .attr('value', (d) => d);

  const secondSelector = container
    .append('select')
    .attr('id', 'second-option-frequency-selector')
    .on('change', buttonClick);

  const secondOptions = secondSelector
    .selectAll('option')
    .data(depts)
    .enter()
    .append('option')
    .text((d) => d)
    .attr('value', (d) => d)
    .property('selected', (d) => d === 'Art');

  const size = {
    height: 400,
    width: Math.min(600, window.innerWidth - 40),
  };

  const margin = {
    top: 10,
    right: 10,
    bottom: 60,
    left: 50,
  };

  const svg = container
    .append('svg')
    .attr('height', size.height)
    .attr('width', size.width);

  container.append('a').text('Source: __________').attr('href', '');

  /*
    Create Scales:
  */
  let circleLabels = null;

  const t = transition().duration(1000);

  const addAnimations = () => {
    circleLabels.style('opacity', 0.6);

    const newLabels = circleLabels.sort(() => Math.random() - 0.5);

    newLabels.transition(t).each(function () {
      const that = this;

      // this is basically the same function, just for svgs,
      // doesn't really matter:
      const a = this.getBBox();

      if (+select(this).style('opacity') === 0) {
        return;
      }

      newLabels.each(function () {
        if (this === that) {
          return;
        }

        const sel = select(this);

        if (+sel.style('opacity') === 0) {
          return;
        }

        const b = this.getBBox();

        // Instead of adding the heights together, I'm just looking at the one
        // height that matters (Because of the text size, both heights are
        // probably the same). If you draw two slightly overlapping rectangles,
        // label the bottom left corner (x_i, y_i) and the heights and widths, I think
        // it makes sense.
        // the `+5` just adds a little bit of padding, you can adjust or remove
        if (
          Math.abs(a.x - b.x) < (a.x < b.x ? a.width : b.width) + 5
          && Math.abs(a.y - b.y) < (a.y < b.y ? b.height : a.height) + 5
        ) {
          sel.style('opacity', 0);
        }
      });
    });
  };

  const makePlot = () => {
    svg.selectAll('*').remove();

    const firstDept = depts[firstSelectIndex];
    const secondDept = depts[secondSelectIndex];
    const plotData = data
      .map((d) => [d.word, parseFloat(d[firstDept]), parseFloat(d[secondDept])])
      .filter((d) => !isNaN(d[1]) && !isNaN(d[2]));
    const maxX = max(plotData.map((d) => d[1]));
    const minX = min(plotData.map((d) => d[1]));
    const maxY = max(plotData.map((d) => d[2]));
    const minY = min(plotData.map((d) => d[2]));

    const x = scaleLog()
      .domain([minX, maxX])
      .range([margin.left, size.width - margin.right]);

    const xaxis = svg.append('g')
      .attr('transform', `translate(0,${size.height - margin.bottom + 10})`)
      .call(axisBottom(x).ticks(size.width / 80, ','))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.append('text')
        .attr('x', size.width)
        .attr('y', margin.bottom - 30)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'end')
        .text(`${firstDept} →`));

    const y = scaleLog()
      .domain([minY, maxY])
      .range([size.height - margin.bottom, margin.top]);

    const yAxis = svg.append('g')
      .attr('transform', `translate(${margin.left - 10},0)`)
      .call(axisLeft(y).ticks(size.height / 80, ','))
      .call((g) => g.select('.domain').remove())
      .call((g) => g.append('text')
        .attr('x', -20)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text(`${secondDept}↑`));
    /*
      Start Plot:
    */
    console.log(x(1));
    svg
      .append('line')

      .attr('x1', x(minX))
      .attr('x2', x(maxX))
      .attr('y1', y(minY))
      .attr('y2', y(maxY))
      .attr('stroke-width', 1)
      .attr('stroke', 'gray')
      .attr('stroke-dasharray', '5,5');

    const circleGroup = svg
      .append('g')
      .selectAll('dot')
      .data(plotData)
      .enter()
      .append('g');
    const circles = circleGroup
      .append('circle')
      .attr('cx', (d) => {
        const jitterPointX = randomJitter(x(d[1]));

        // I don't think it makes sense to compare to the right margin,
        // do you mean `size.width - margin.right`? same thing for
        // margin.bottom below
        return jitterPointX < margin.right ? x(d[1]) : jitterPointX;
      })
      .attr('cy', (d) => {
        const jitterPointY = randomJitter(y(d[2]));
        return jitterPointY < margin.bottom ? x(d[1]) : jitterPointY;
      })
      .attr('r', 5)
      .style('fill', '#69b3a2')
      .style('opacity', '0.15');

    circleLabels = circleGroup
      .data(plotData)
      .append('text')
      .attr('x', (d) => x(d[1]))
      .attr('y', (d) => y(d[2]))
      .text((d) => d[0])
      .style('font-family', 'Arial, Helvetica, sans-serif')
      .style('color', '#b5b5b5')
      .style('font-size', '14px')
      .style('opacity', '0.6');

    let start = null;
    let playBack = null;

    const animate = (dt) => {
      if (start === null) {
        start = dt;
      }
      if (start - dt > 1000) {
        start = dt;
        addAnimations();
        playBack = window.requestAnimationFrame(animate);
      }
    };

    addAnimations();
    playBack = window.requestAnimationFrame(animate);
  };

  makePlot();
};

export default makeFrequencyPlot;
