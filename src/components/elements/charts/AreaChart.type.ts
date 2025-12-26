export interface AreaConfig {
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
}

export interface AreaChartProps {
  data: any[];
  dataKey?: string;
  xAxisKey?: string;
  areas?: AreaConfig[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
  gradient?: boolean;
}
