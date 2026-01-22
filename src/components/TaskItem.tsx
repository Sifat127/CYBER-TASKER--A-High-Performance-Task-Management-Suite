import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, onDelete }) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group p-3 sm:p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-white/20 transition-all cursor-move ${
            snapshot.isDragging
              ? 'shadow-[0_0_20px_rgba(192,38,211,0.5)] bg-slate-800/80 scale-105'
              : 'hover:bg-slate-800/70'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-slate-100 break-words text-sm sm:text-base leading-relaxed">
                {task.content}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                {formatDate(task.createdAt)}
              </p>
            </div>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 sm:p-2 rounded-md bg-red-500/0 hover:bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-all shrink-0"
              title="Delete task"
              aria-label="Delete task"
            >
              <Trash2 size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;