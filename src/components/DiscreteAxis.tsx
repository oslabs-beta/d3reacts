import React, { useEffect, useMemo } from "react"
import * as d3 from "d3"
import { useD3 } from "../hooks/useD3"
import { DiscreteAxisProps, Data } from "../../types"
import { getAxisLabelCoordinates } from "../utils"

export const DiscreteAxis = React.memo(({
  x,
  y,
  scale,
  type,
  label,
  width,
  height,
  margin,
  data, 
  layers,
  xAccessor,
  setTickMargin
}: DiscreteAxisProps): JSX.Element => {
  const fontSize = 12;
 



  // const gRef = useD3(
  //   (anchor) => {
  //     let axis = d3.axisBottom(scale)
  //     switch (type) {
  //       case "bottom":
  //         axis = d3.axisBottom(scale)
  //         break
  //       case "top":
  //         axis = d3.axisTop(scale)
  //         break
  //       case "left":
  //         axis = d3.axisLeft(scale)
  //         break
  //       case "right":
  //         axis = d3.axisRight(scale)
  //         break
  //       default:
  //         axis = d3.axisRight(scale)
  //         break
  //     }

  //     anchor.call(axis)
  //   },
  //   [type, scale]
  // )


  let x1 = 0,
  y1 = 0,
  x2 = 0,
  y2 = 0
switch (type) {
  case "bottom":
    x1 = x
    y1 = y
    x2 = width - margin.right - margin.left
    y2 = y
    break
  case "top":
    x1 = x
    y1 = y
    x2 = width - margin.right - margin.left
    y2 = y
    break

  default:
    x1 = 0
    y1 = 0
    x2 = 0
    y2 = 0
    break
}

const formatTick = d3.timeFormat("%x")
const getFormattedTick = (individualTick: string )  => {
  if (individualTick.length > 8 && !isNaN(Date.parse(individualTick))) {
    return formatTick(new Date(individualTick))
  } else {
    return individualTick
  }
}
const ticks = data.map(d => getFormattedTick(xAccessor(d)))
const check = ticks.some(tick => tick.length * 9 > scale.bandwidth())
const longestTick = ticks.reduce((a, b) => (a.length > b.length ?  a : b));

useEffect(() => {
 check ? setTickMargin(longestTick.length * fontSize/2) : setTickMargin(0);
}, [check])



const getTickTranslation = (
  axisType: string,
  individualTick: string
): string => {
  switch (axisType) {
    case "top":

      return (check ? `translate(${scale.bandwidth()/2 + (scale(individualTick) ?? 0)}, ${y - fontSize})`
        : `translate(${scale.bandwidth()/2 + (scale(individualTick) ?? 0)}, ${y - fontSize})`)
    case "bottom":
      return ( check ? `translate(${scale.bandwidth()/2 + (scale(individualTick) ?? 0) - fontSize/2}, ${y + individualTick.length * fontSize/2}), rotate(-90)`
        : `translate(${scale.bandwidth()/2 + (scale(individualTick) ?? 0)}, ${y + fontSize*2})`)
    default:
      return `translate(0,0)`
  }
}

const getTickStyle = (
  axisType: string,
  individualTick: Data
): any => { // TODO remove any
  switch (axisType) {
    case "top":
      return { textAnchor: "middle", dominantBaseline: "auto" }
    case "bottom":
      return { textAnchor: "middle", dominantBaseline: "auto" }
  }
}



// const horizontalTicks = scale.ticks(width/120)
// const verticalTicks = scale.ticks(numberOfVerticalTicks)
// console.log('vt',verticalTicks)

  return (
    <g>
      <line stroke="#77848d" strokeWidth={1.9} x1={x1} y1={y1} x2={x2} y2={y2} />
      {ticks.map((tick: any, i: number) => (
        <text 
          key={i}
          style={getTickStyle(type, tick)}
          transform={getTickTranslation(type, tick)}>
          {check ? tick.slice(0,7) : tick}</text>
      ))}
    
    </g>
  )
})
