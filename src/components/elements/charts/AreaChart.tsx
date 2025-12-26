import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { AreaChartProps } from './AreaChart.type';

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  dataKey,
  xAxisKey = 'name',
  areas = [],
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
  gradient = true,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            {areas.length > 0 ? (
              areas.map((area, index) => (
                <linearGradient key={area.dataKey} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={area.color || colors[index % colors.length]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={area.color || colors[index % colors.length]} stopOpacity={0.1}/>
                </linearGradient>
              ))
            ) : (
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0.1}/>
              </linearGradient>
            )}
          </defs>
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
          {areas.length > 0 ? (
            areas.map((area, index) => (
              <Area
                key={area.dataKey}
                type={area.type || 'monotone'}
                dataKey={area.dataKey}
                stroke={area.color || colors[index % colors.length]}
                fill={gradient ? `url(#color${index})` : area.color || colors[index % colors.length]}
                fillOpacity={gradient ? 1 : 0.6}
                name={area.name || area.dataKey}
              />
            ))
          ) : (
            <Area
              type="monotone"
              dataKey={dataKey || ''}
              stroke={colors[0]}
              fill={gradient ? "url(#color)" : colors[0]}
              fillOpacity={gradient ? 1 : 0.6}
            />
          )}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;