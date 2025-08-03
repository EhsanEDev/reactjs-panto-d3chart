import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import type { ChartPoint, MultiPoint, SinglePoint } from "../constants/types";

interface ChartProps {
  data: ChartPoint[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  console.log("data is :", data[0][1]);
  useEffect(() => {
    if (!ref.current) return;

    // Clear existing content
    d3.select(ref.current).selectAll("*").remove();

    // Type detection, multi or single
    // If the value is an array, it's a multi-point chart
    const isMulti = Array.isArray(data[0][1]);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    // Creates a D3 linear scale for the x-axis.
    // The domain is set to the minimum and maximum values of the first element in each data entry.
    // The range maps the domain to pixel values between the particular margins.
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[0]) as [number, number])
      .range([margin.left, width - margin.right]);

    // Get all Y values for calculating Y axis domain
    const allYValues: (number | null)[] = isMulti
      ? (data as MultiPoint[]).flatMap((d) => d[1])
      : (data as SinglePoint[]).map((d) => d[1]);

    // Creates a D3 linear scale for the y-axis.
    // The domain is set to the minimum and maximum values of the Y values in the dataset.
    // The range maps the domain to pixel values between the particular margins.
    const y = d3
      .scaleLinear()
      .domain(
        d3.extent(allYValues.filter((v) => v !== null)) as [number, number]
      )
      .range([height - margin.bottom, margin.top]);

    // D3 line generator function
    const line = (i?: number) =>
      d3
        .line<ChartPoint>()
        .defined((d) => {
          const val = Array.isArray(d[1]) ? d[1][i!] : d[1];
          return val !== null;
        })
        .x((d) => x(d[0]))
        .y((d) => {
          const val = Array.isArray(d[1]) ? d[1][i!] : d[1];
          return y(val as number); // safe cast after null check
        });

    if (isMulti) {
      const colors = ["blue", "green", "red"];
      // Makes three separate lines for each Y value, e.g. [0, 1, 2]
      for (let i = 0; i < 3; i++) {
        svg
          .append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", colors[i])
          .attr("stroke-width", 1.5)
          .attr("d", line(i));
      }
    } else {
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("d", line());
    }

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default Chart;
