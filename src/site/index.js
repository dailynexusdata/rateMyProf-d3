/**
 * @author zach
 * @since 2021-11-12
 */
import './styles.scss';
import { csv, json } from 'd3-fetch';
import makeBarPlots from './plots/barplots';
import makeLineCharts from './plots/linecharts';

// import plot functions here:
// import makePLOT_NAME from "./PLOT_NAME";

const main = async () => {
  const linesData = await d3.csv('dist/data/lines.csv');
  const barplotsData = await d3.csv('dist/data/barplots.csv');

  const resize = () => {
    makeBarPlots(barplotsData);
    makeLineCharts(linesData);
  };

  window.addEventListener('resize', () => {
    resize();
  });

  resize();
};

main().catch((err) => {
  console.error(err);
});
