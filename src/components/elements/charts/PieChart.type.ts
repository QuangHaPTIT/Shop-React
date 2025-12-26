export interface PieChartProps {
  data: Array<{ name: string; value: number; [key: string]: any }>;
  dataKey?: string;
  nameKey?: string;
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  label?: boolean;
}
