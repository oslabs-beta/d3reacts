/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import BarChart from "./charts/BarChart/BarChart";
import LineChart from "./charts/LineChart/LineChart";
import AreaChart from "./charts/AreaChart/AreaChart";
import ScatterPlot from "./charts/ScatterPlot/ScatterPlot";
import PieChart from "./charts/PieChart/PieChart";
import unemployment from "./data/unemployment.json";
import penguins from "./data/penguins.json";
import portfolio from "./data/portfolio.json";
import fruit from "./data/fruit.json";
import skinny_fruit from "./data/skinny_fruit.json";

function App() {
  return (
    <div className="app">
      <PieChart
        data={fruit}
        label="label"
        value="value"
        legend="top"
        outerRadius={240}
        legendLabel="l"
      />
      <PieChart
        data={fruit}
        label="label"
        value="value"
        innerRadius="70%"
        outerRadius="80%"
        legend="left-top"
      />
      <AreaChart
        data={penguins}
        height="300"
        width="400"
        xKey="body_mass_g"
        xDataType="number"
        yKey="culmen_length_mm"
        xGrid={true}
        yGrid={true}
        xAxis="bottom"
        yAxis="left"
        legend="bottom-left"
        legendLabel="🐬"
      />
      <AreaChart
        data={skinny_fruit}
        // height="600"
        xKey="date"
        xDataType="date"
        yKey="value"
        groupBy="fruit"
        xGrid={true}
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Number of fruit"
        legend={"bottom"}
      />
      <ScatterPlot
        height="100%"
        width="100%"
        data={penguins}
        xKey="flipper_length_mm"
        xDataType="number"
        yKey="body_mass_g"
        groupBy="species"
        xAxis="bottom"
        yAxis="right"
        // xGrid={true}
        // yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Value"
        legend={"right"}
        legendLabel={"Dolphins i mean penguins"}
      />
      <BarChart
        height="300"
        data={skinny_fruit}
        xKey="date"
        yKey="value"
        groupBy="fruit"
        xAxis="bottom"
        yAxis="left"
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Value"
        legend={"right"}
        // legendLabel={''}
      />
      <BarChart
        height="500"
        width="400"
        data={skinny_fruit}
        xKey="date"
        yKey="value"
        // groupBy='fruit'
        xAxis="bottom"
        yAxis="left"
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Value"
        legend={true}
      />
      <LineChart
        height="100%"
        data={unemployment}
        xKey="date"
        xDataType="date"
        yKey="unemployment"
        groupBy="division"
        xAxis="bottom"
        yAxis="left"
        xGrid={true}
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Unemployment"
        legend={"bottom-right"}
        legendLabel="Locations"
      />
      <LineChart
        height="500"
        width="500"
        data={portfolio}
        xKey="date"
        xDataType="date"
        yKey="value"
        xAxis="bottom"
        yAxis="left"
        xGrid={true}
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Value"
        legend={'bottom-left'}
      />
    </div>
  );
}

export default App;
