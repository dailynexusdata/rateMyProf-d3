/**
 * @author zach
 * @since 2021-11-12
 */
import './styles.scss';
import { csv, json } from 'd3-fetch';
import makeBarPlots from './plots/barplots';
import makeLineCharts from './plots/linecharts';
import makeFrequencyPlot from './plots/frequencyPlots';
import makePositiveChart from './plots/positiveDeptPlot';
import makeDeptCountPlot from './plots/deptCountPlot';
import makeYearLineChart from './plots/yearLineChart';
// import plot functions here:
// import makePLOT_NAME from "./PLOT_NAME";

const main = async () => {
  const linesData = await csv('dist/data/lines.csv');
  const barplotsData = await csv('dist/data/barchart.csv');
  const frequencyData = await csv('dist/data/textcounts.csv');
  const posDeptData = await csv('dist/data/average_reviews.csv');
  const deptCountData = await csv('dist/data/dept_counts.csv');
  const yearLineData = await csv('dist/data/review_years.csv');
  const resize = () => {
    makeBarPlots(barplotsData);
    makeLineCharts(linesData);
    makeFrequencyPlot(frequencyData);
    makePositiveChart(posDeptData);
    makeDeptCountPlot(deptCountData);
    makeYearLineChart(yearLineData);
  };

  window.addEventListener('resize', () => {
    resize();
  });

  resize();
};

main().catch((err) => {
  console.error(err);
});
