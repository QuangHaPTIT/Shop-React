import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { LineChartProps } from './LineChart.type';

const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  xAxisKey = 'name',
  lines = [],
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
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
          {lines.length > 0 ? (
            lines.map((line, index) => (
              <Line
                key={line.dataKey}
                type={line.type || 'monotone'}
                dataKey={line.dataKey}
                stroke={line.color || colors[index % colors.length]}
                strokeWidth={line.strokeWidth || 2}
                dot={line.dot !== false ? { r: 4 } : false}
                activeDot={{ r: 6 }}
                name={line.name || line.dataKey}
              />
            ))
          ) : (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;