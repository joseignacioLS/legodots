import React from "react";
interface IProps {
  size: number;
}
const SVGPaths = ({ size }: IProps) => {
  return (
    <svg width="0" height="0">
      <defs>
        <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
          <path
            d="M 0,1
          C 0 .45, .45 0, 1 0
          L 1,.49
          C .7 .5, .5 .7, .49 1
          L 0,1
          Z"
          />
        </clipPath>
        <clipPath
          id="myCurve90"
          clipPathUnits="objectBoundingBox"
          transform={`rotate(90 0 0) translate(0, -${size * 2})`}
        >
          <path
            d="M 0,1
          C 0 .45, .45 0, 1 0
          L 1,.49
          C .7 .5, .5 .7, .49 1
          L 0,1
          Z"
          />
        </clipPath>
        <clipPath
          id="myCurve180"
          clipPathUnits="objectBoundingBox"
          transform={`rotate(180 0 0) translate(-${size * 2}, -${size * 2})`}
        >
          <path
            d="M 0,1
          C 0 .45, .45 0, 1 0
          L 1,.49
          C .7 .5, .5 .7, .49 1
          L 0,1
          Z"
          />
        </clipPath>
        <clipPath
          id="myCurve270"
          clipPathUnits="objectBoundingBox"
          transform={`rotate(270 0 0) translate(-${size * 2}, 0)`}
        >
          <path
            d="M 0,1
          C 0 .45, .45 0, 1 0
          L 1,.49
          C .7 .5, .5 .7, .49 1
          L 0,1
          Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SVGPaths;
