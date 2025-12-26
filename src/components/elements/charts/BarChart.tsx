import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BarChartProps } from './BarChart.type';

const BarChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  xAxisKey = 'name',
  bars = [],
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
  layout = 'horizontal',
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart 
          data={data} 
          layout={layout}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          {layout === 'horizontal' ? (
            <>
              <XAxis 
                dataKey={xAxisKey} 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
            </>
          ) : (
            <>
              <XAxis 
                type="number"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                type="category"
                dataKey={xAxisKey}
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
            </>
          )}
          {showTooltip && (
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
          )}
          {showLegend && (
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            />
          )}
          {bars.length > 0 ? (
            bars.map((bar, index) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                fill={bar.color || colors[index % colors.length]}
                radius={bar.radius || [8, 8, 0, 0]}
                name={bar.name || bar.dataKey}
              />
            ))
          ) : (
            <Bar
              dataKey={dataKey}
              fill={colors[0]}
              radius={[8, 8, 0, 0]}
            />
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;