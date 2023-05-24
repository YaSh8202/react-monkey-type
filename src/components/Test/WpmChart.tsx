import React from "react";
import { useAppSelector } from "../../store/store";
import { defaultStyles } from "@visx/tooltip";

import {
  XYChart,
  LineSeries,
  Axis,
  darkTheme,
  Grid,
  Tooltip,
} from "@visx/xychart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { HistoryType } from "../../typings";
import { useTheme } from "@mui/material";
import { useCss } from "react-use";

const accessors = {
  x: (d: HistoryType) => d.time,
  y: (d: HistoryType) => d.wpm,
};

function WpmChart() {
  const wpmHistory = useAppSelector((state) => state.test.wpmHistory);
  const rawHistory = useAppSelector((state) => state.test.rawHistory);
  const theme = useTheme();
  const labelClass = useCss({
    fill: theme.sub.main,
    fontWeight: 300,
    fontSize: "0.8rem",
    wordSpacing: "0.1rem",
  });

  return (
    <ParentSize>
      {({ width, height }) => (
        <XYChart
          theme={{
            ...darkTheme,
            colors: [theme.main.main as string, theme.sub.main as string],
          }}
          width={width}
          xScale={{
            type: "linear",
          }}
          yScale={{
            type: "linear",
          }}
          height={height}
        >
          <Grid
            numTicks={3}
            columns={false}
            lineStyle={{
              stroke: theme.sub.alt,
            }}
          />
          <Grid
            // numTicks={3}
            rows={false}
            lineStyle={{
              stroke: theme.sub.alt,
            }}
          />
          <LineSeries
            xAccessor={accessors.x}
            yAccessor={accessors.y}
            dataKey={"wpm"}
            data={wpmHistory}
          />
          <LineSeries
            xAccessor={accessors.x}
            yAccessor={accessors.y}
            dataKey={"raw"}
            data={rawHistory}
          />
          <Axis
            stroke={theme.sub.main}
            hideAxisLine
            hideTicks
            orientation="bottom"
          />
          <Axis
            hideAxisLine
            hideTicks
            label={"Words per Minute"}
            orientation="left"
            numTicks={3}
            stroke={theme.sub.main}
            labelClassName={labelClass}
          />
          <Tooltip<HistoryType>
            showSeriesGlyphs
            snapTooltipToDatumX
            style={{
              ...defaultStyles,
              padding: 10,
              backgroundColor: theme.sub.alt,
            }}
            renderTooltip={({ tooltipData, colorScale }) => (
              <div>
                <div
                  style={{
                    color: "white",
                    marginBottom: 4,
                  }}
                >
                  {tooltipData?.datumByKey.wpm.datum.time}
                </div>
                <div
                  style={{
                    color: colorScale?.("wpm"),
                    marginBottom: 2,
                  }}
                >
                  wpm: {tooltipData?.datumByKey.wpm.datum.wpm.toFixed(0)}
                </div>
                <div
                  style={{
                    color: colorScale?.("raw"),
                  }}
                >
                  raw: {tooltipData?.datumByKey.raw.datum.wpm.toFixed(0)}
                </div>
              </div>
            )}
          />
        </XYChart>
      )}
    </ParentSize>
  );
}

export default WpmChart;
