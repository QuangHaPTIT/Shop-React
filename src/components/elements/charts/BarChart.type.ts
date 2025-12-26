export interface BarConfig {
  dataKey: string;
  name?: string;
  color?: string;
  radius?: [number, number, number, number];
}

export interface BarChartProps {
  data: any[];
  dataKey?: string;
  xAxisKey?: string;
  bars?: BarConfig[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
  layout?: "horizontal" | "vertical";
}
