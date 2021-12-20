/** App.js */
import React, { useState, useEffect, useRef } from "react";
import useEnvEffect from '../../hooks/useEnvEffect';
import BarChartBody from "./BarChartBody";
import { BarChartProps } from "../../../types";

export default function BarChart({
  data,
  height = "100%",
  width = "100%",
  xKey,
  yKey,
  groupBy,
  xAxis = "bottom",
  yAxis = "left",
  yGrid = false,
  xAxisLabel,
  yAxisLabel,
}: BarChartProps<string | number>): JSX.Element {
  const anchor = useRef(null as unknown as SVGSVGElement)
  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0])
  const [cHeight, setCHeight] = useState<number>(0)
  const [cWidth, setCWidth] = useState<number>(0)

  function updateSize() {
    setWindowSize([window.innerWidth, window.innerHeight])
  }

  // Set up an event listener on mount
  useEnvEffect(() => {
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    const container = anchor.current.getBoundingClientRect()
    setCHeight(container.height)
    setCWidth(container.width)
  }, [windowSize])

  return (
    <svg ref={anchor} width={width} height={height}>
      <BarChartBody
        data={data}
        height={cHeight}
        width={cWidth}
        xKey={xKey}
        yKey={yKey}
        groupBy={groupBy}
        xAxis={xAxis}
        yAxis={yAxis}
        yGrid={yGrid}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
      />
    </svg>
  )
}
