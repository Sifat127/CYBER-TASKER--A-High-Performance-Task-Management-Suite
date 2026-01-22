import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Task, TaskStatus } from '../types';

interface StatsChartProps {
  tasks: Task[];
}

const StatsChart: React.FC<StatsChartProps> = ({ tasks }) => {
  const todoCount = tasks.filter(t => t.status === TaskStatus.TODO).length;
  const doneCount = tasks.filter(t => t.status === TaskStatus.DONE).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((doneCount / totalTasks) * 100);

  const data = [
    { name: 'Pending', value: todoCount, color: '#d946ef' },
    { name: 'Completed', value: doneCount, color: '#22d3ee' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {totalTasks === 0 ? (
        <div className="text-center text-slate-500 text-sm">
          <p className="mb-2">No tasks yet</p>
          <p className="text-xs opacity-70">Add a task to begin</p>
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <p className="text-lg sm:text-2xl font-bold text-cyan-400 font-cyber tracking-widest">
              {completionRate}%
            </p>
            <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider">Completion Rate</p>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsChart;