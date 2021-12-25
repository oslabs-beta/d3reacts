/* eslint-disable no-unused-vars */
import React from "react"
import "./App.css"
import BarChart from "./charts/BarChart/BarChart"
import LineChart from "./charts/LineChart/LineChart"
import AreaChart from "./charts/AreaChart/AreaChart"
import ScatterPlot from "./charts/ScatterPlot/ScatterPlot"
import PieChart from "./charts/PieChart/PieChart"
import unemployment from "./data/unemployment.json"
import penguins from "./data/penguins.json"
import portfolio from "./data/portfolio.json"
import fruit from "./data/fruit.json"
import skinny_fruit from "./data/skinny_fruit.json"

function App() {
  return (
    <div className="app">
      {/* <PieChart
        data={fruit}
        label="label"
        value="value"
        legend={true}
        outerRadius={240}
      />
      <PieChart
        data={fruit}
        label="label"
        value="value"
        innerRadius="70%"
        outerRadius="80%"
      />
      <AreaChart
        data={penguins.slice(0,7)}
        height="700"
        width="100%"
        xKey="body_mass_g"
        xDataType="number"
        yKey="culmen_length_mm"
        xGrid={true}
        yGrid={true}
        xAxis="bottom"
        yAxis="left"
      />
      <AreaChart
        data={skinny_fruit.slice(0,40)}
        height="300"
        xKey="date"
        xDataType="date"
        yKey="value"
        groupBy="fruit"
        xGrid={true}
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Number of fruit"
      />
      <ScatterPlot
        height="100%"
        width="100%"
        data={penguins.concat(penguins)}
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
      />
      <BarChart
        height="300"
        data={skinny_fruit}
        xKey="date"
        yKey="value"
        // groupBy='fruit'
        xAxis="bottom"
        yAxis="left"
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Value"
      /> */}
      <LineChart
        height="100%"
        data={unemployment.slice(0,5000)}
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
      />
      <LineChart
        height="500"
        width='500'
        data={portfolio.slice(0, 3)}
        xKey="date"
        xDataType="date"
        yKey="value"
        xAxis="bottom"
        yAxis="left"
        xGrid={true}
        yGrid={true}
        xAxisLabel="Date"
        yAxisLabel="Value"
      />
    </div>
  )
}

export default App
