import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Task, TaskStatus } from '../types';

interface StatsChartProps {
  tasks: Task[];
}

const StatsChart: React.FC<StatsChartProps> = ({ tasks }) => {
  const todoCount = tasks.filter(t => t.status === TaskStatus.TODO).length;
  const doneCount = tasks.filter(t => t.status === TaskStatus.DONE).length;

  const data = [
    { name: 'To Do', value: todoCount },
    { name: 'Done', value: doneCount },
  ];

  const COLORS = ['#d946ef', '#22d3ee']; // Fuchsia-500, Cyan-400

  if (tasks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500 italic text-sm">
        No data to visualize
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
          itemStyle={{ color: '#e2e8f0' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatsChart;
