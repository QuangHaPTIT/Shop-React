export interface LineConfig {
  dataKey: string;
  name?: string;
  color?: string;
  type?:
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "linear"
    | "linearClosed"
    | "natural"
    | "monotone"
    | "monotoneX"
    | "monotoneY"
    | "step"
    | "stepBefore"
    | "stepAfter";
  strokeWidth?: number;
  dot?: boolean;
}

export interface LineChartProps {
  data: any[];
  dataKey?: string;
  xAxisKey?: string;
  lines?: LineConfig[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
}
