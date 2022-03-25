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
// import plot functions here:
// import makePLOT_NAME from "./PLOT_NAME";

const main = async () => {
  const linesData = await csv('dist/data/quarterReviews.csv');
  const barplotsData = await csv('dist/data/barchart.csv');
  const frequencyData = await csv('dist/data/textcounts.csv');
  const posDeptData = await csv('dist/data/positive_frequencies.csv');
  const resize = () => {
    makeBarPlots(barplotsData);
    makeLineCharts(linesData);
    makeFrequencyPlot(frequencyData);
    makePositiveChart(posDeptData);
  };

  window.addEventListener('resize', () => {
    resize();
  });

  resize();
};

main().catch((err) => {
  console.error(err);
});
