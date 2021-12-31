import { useEffect } from "react";
import { ColorLegendProps } from "../../types";

export const ColorLegend = ({
  colorScale,
  circleRadius = 10,
  tickSpacing = circleRadius * 2 + 6,
  tickTextOffset = circleRadius * 1.2 + 3,
  legendLabel = "",
  legendPosition,
  xOffset,
  yOffset,
  setLegendOffset,
  margin,
  cWidth,
  cHeight,
  EXTRA_LEGEND_MARGIN = 6,
  fontSize = 16,
  isPie,
  outerRadius,
}: ColorLegendProps) => {
  const RECT_MARGIN = 6;
  const domain = colorScale.domain();
  let longestWord: number;
  let labelHeightOffset: number;
  if (legendLabel) {
    longestWord = legendLabel.length;
    labelHeightOffset = 1.5;
  } else {
    longestWord = 0;
    labelHeightOffset = 0;
  }
  const rectHeight =
    tickSpacing * (domain.length + labelHeightOffset) + RECT_MARGIN * 2;

  // determine legend placement:
  let xPosition: number;
  let yPosition: number;
  if (isPie && outerRadius) {
    xPosition = outerRadius + margin.left;
    yPosition = 0;
    switch (legendPosition) {
      case "top":
        xPosition = -margin.top / 2;
        yPosition = -outerRadius - margin.top;
        break;
      case "bottom":
        xPosition = margin.bottom / 2;
        yPosition = outerRadius - margin.bottom;
        break;
      case "left-top":
        xPosition = -outerRadius - margin.top;
        yPosition = -outerRadius - margin.left;
        break;
      case "left-bottom":
        xPosition = -outerRadius + margin.bottom;
        yPosition = outerRadius + margin.left;
        break;
      case "right-top":
        xPosition = outerRadius + margin.right;
        yPosition = -outerRadius;
        break;
      case "right-bottom":
        xPosition = outerRadius + margin.right;
        yPosition = outerRadius;
        break;
      case "left":
        xPosition = -outerRadius - margin.left;
        break;
      case "top-left":
        xPosition = -outerRadius - margin.left;
        yPosition = -outerRadius;
        break;
      case "bottom-left":
        xPosition = -outerRadius - margin.left;
        yPosition = outerRadius;
        break;
      case "top-right":
        xPosition = outerRadius + margin.right;
        yPosition = -outerRadius;
        break;
      case "bottom-right":
        xPosition = outerRadius + margin.right;
        yPosition = outerRadius + margin.bottom;
        break;
      case "right":
    }
  } else {
    xPosition = 0;
    yPosition = cHeight / 2 - yOffset / 2;
    switch (legendPosition) {
      case "top":
        xPosition = (cWidth - margin.left - margin.right) / 2 - xOffset / 2;
        yPosition = yOffset / 2 - margin.top + EXTRA_LEGEND_MARGIN;
        break;
      case "bottom":
        xPosition = (cWidth - margin.left - margin.right) / 2 - xOffset / 2;
        yPosition = cHeight - yOffset - EXTRA_LEGEND_MARGIN * 2;
        break;
      case "left-top":
        xPosition = EXTRA_LEGEND_MARGIN - margin.left;
        yPosition = yOffset / 2 - margin.top + EXTRA_LEGEND_MARGIN;
        break;
      case "left-bottom":
        xPosition = EXTRA_LEGEND_MARGIN - margin.left;
        yPosition = cHeight - yOffset - EXTRA_LEGEND_MARGIN * 2;
        break;
      case "right-top":
        xPosition =
          cWidth -
          margin.left -
          margin.right -
          xOffset -
          EXTRA_LEGEND_MARGIN +
          20;
        yPosition = yOffset / 2 - margin.top + EXTRA_LEGEND_MARGIN;
        break;
      case "right-bottom":
        xPosition =
          cWidth -
          margin.left -
          margin.right -
          xOffset -
          EXTRA_LEGEND_MARGIN +
          20;
        yPosition = cHeight - yOffset - EXTRA_LEGEND_MARGIN * 2;
        break;
      case "left":
        xPosition = -margin.left - EXTRA_LEGEND_MARGIN;
        break;
      case "top-left":
        xPosition = -margin.left - EXTRA_LEGEND_MARGIN;
        yPosition = margin.top;
        break;
      case "bottom-left":
        xPosition = -margin.left - EXTRA_LEGEND_MARGIN;
        yPosition = cHeight - yOffset / 2 - margin.bottom;
        break;
      case "top-right":
        xPosition = cWidth - margin.left - margin.right + 20;
        yPosition = margin.top;
        break;
      case "bottom-right":
        xPosition = cWidth - margin.left - margin.right + 20;
        yPosition = cHeight - yOffset / 2 - margin.bottom;
        break;
      case "right":
      default:
        xPosition = cWidth - margin.left - margin.right + 20;
    }
  }

  // iterate thru category names, create color swab & text for each
  const legend = domain.map((domainValue: string, i: number) => {
    if (domainValue.length > longestWord) longestWord = domainValue.length;
    return (
      <g
        className="tick"
        key={domainValue}
        transform={`translate(${RECT_MARGIN + circleRadius}, 
                   ${
                     (i + labelHeightOffset) * tickSpacing +
                     RECT_MARGIN -
                     rectHeight / 2 +
                     circleRadius
                   })`}
      >
        <circle fill={colorScale(domainValue)} r={circleRadius} />
        <text x={tickTextOffset} dy=".32em">
          {domainValue}
        </text>
      </g>
    );
  });

  const rectWidth =
    tickTextOffset +
    circleRadius * 2 +
    (longestWord * (fontSize + 1)) / 2 +
    RECT_MARGIN * 2; //+1 by fontSize is a bit of a kludge

  useEffect(() => setLegendOffset([rectWidth, rectHeight]), []);
  // setLegendOffset(rectWidth);

  const style: React.CSSProperties | undefined = {
    margin: "0px 0px",
    padding: "0px 0px",
    maxHeight: "100%",
    width: rectWidth > 0 ? rectWidth : 20,
    height: rectHeight > 0 ? rectHeight : 20,
    border: "1px solid $tooltip-border",
    borderRadius: "3px",
    color: "#3f517e",
    // You can also use a fixed width and ommit the white-sapce.
    whiteSpace: "nowrap",
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.3) 0 2px 10px",
  };
  return (
    <g transform={`translate(${xPosition}, ${yPosition})`}>
      <foreignObject
        x={0}
        y={-rectHeight / 2}
        width={rectWidth > 0 ? rectWidth : 20}
        height={rectHeight > 0 ? rectHeight : 20}
        pointerEvents="none"
        // style={fill: 'red'}
      >
        <div style={style}></div>
      </foreignObject>

      <text
        className={"sectionLabel" /* TODO: implement CSS */}
        x={rectWidth / 2 /* Where to put Legend title label */}
        y={
          -rectHeight / 2 +
          RECT_MARGIN / 2 +
          16 /* Where to put Legend title label */
        }
        textAnchor={"middle"}
      >
        {legendLabel}
      </text>
      {legend}
    </g>
  );
};
