import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2, GripVertical } from 'lucide-react';
import { Task, TaskStatus } from '../types';

interface TaskItemProps {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, onDelete }) => {
  const date = new Date(task.createdAt);
  const dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });

  const renderContent = (content: string) => {
    const creatorName = "Sifat Ahmed";
    // Check if content contains the name to avoid unnecessary processing
    if (!content.toLowerCase().includes(creatorName.toLowerCase())) {
        return content;
    }
    
    // Split by the name, preserving the delimiter (captured group)
    const regex = new RegExp(`(${creatorName})`, 'gi');
    const parts = content.split(regex);
    
    return parts.map((part, i) => 
      part.toLowerCase() === creatorName.toLowerCase() ? (
        <span key={i} className="text-fuchsia-400 font-bold font-cyber drop-shadow-[0_0_8px_rgba(232,121,249,0.8)] animate-pulse inline-block mx-1">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`
            group relative p-2.5 sm:p-4 mb-2 sm:mb-3 rounded-xl border transition-all duration-300
            backdrop-blur-md select-none
            ${snapshot.isDragging ? 'shadow-[0_0_20px_rgba(217,70,239,0.5)] scale-105 z-50' : 'hover:scale-[1.02]'}
            ${task.status === TaskStatus.DONE 
              ? 'bg-slate-900/40 border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
              : 'bg-slate-800/40 border-fuchsia-500/20 shadow-[0_0_10px_rgba(217,70,239,0.1)]'
            }
          `}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <div 
              {...provided.dragHandleProps}
              className="mt-1 sm:mt-1.5 text-slate-500 hover:text-white cursor-grab active:cursor-grabbing transition-colors"
            >
              <GripVertical size={16} className="sm:w-5 sm:h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex gap-2">
                <span className={`font-mono text-xs sm:text-sm font-bold pt-0.5 sm:pt-1 ${
                  task.status === TaskStatus.DONE ? 'text-cyan-500/40' : 'text-fuchsia-500/40'
                }`}>
                  #{String(index + 1).padStart(2, '0')}
                </span>
                <span 
                  className={`flex-1 font-medium text-sm sm:text-lg tracking-wide leading-snug break-words ${
                    task.status === TaskStatus.DONE 
                      ? 'text-cyan-400 line-through opacity-70' 
                      : 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]'
                  }`}
                >
                  {renderContent(task.content)}
                </span>
              </div>
              
              <div className={`flex justify-end items-center gap-2 mt-2 sm:mt-3 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold transition-all ${
                task.status === TaskStatus.DONE 
                  ? 'text-cyan-500/30' 
                  : 'text-fuchsia-300 bg-fuchsia-900/30 border border-fuchsia-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md shadow-[0_0_8px_rgba(217,70,239,0.15)] inline-flex'
              }`}>
                <span>{dateStr}</span>
                <span className={task.status === TaskStatus.DONE ? "opacity-50" : "text-fuchsia-500"}>•</span>
                <span>{timeStr}</span>
              </div>
            </div>

            <button
              onClick={() => onDelete(task.id)}
              className="mt-0 sm:mt-1 p-1.5 sm:p-2 rounded-lg opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-400 hover:bg-red-900/20"
              aria-label="Delete task"
            >
              <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;