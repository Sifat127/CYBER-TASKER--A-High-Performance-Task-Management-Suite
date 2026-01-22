import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Plus, Sparkles, BrainCircuit, List, Calendar, ArrowDownAZ, Clock, Menu, X, Settings2, Check } from 'lucide-react';
import { Task, TaskStatus } from './types';
import TaskItem from './components/TaskItem';
import StatsChart from './components/StatsChart';
import { triggerConfetti } from './utils/confetti';
import { generateAIPlan } from './services/geminiService';

type SortType = 'MANUAL' | 'DATE' | 'ALPHA';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('cyber-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading tasks:', e);
      return [];
    }
  });
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sortType, setSortType] = useState<SortType>('MANUAL');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMobileDashboard, setShowMobileDashboard] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cyber-tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks:', e);
    }
  }, [tasks]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getSortedTasks = (taskList: Task[]) => {
    if (sortType === 'MANUAL') return taskList;
    
    return [...taskList].sort((a, b) => {
      if (sortType === 'DATE') {
        return b.createdAt - a.createdAt;
      }
      if (sortType === 'ALPHA') {
        return a.content.localeCompare(b.content);
      }
      return 0;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    if (sortType !== 'MANUAL' && source.droppableId === destination.droppableId) {
      return;
    }

    const newTasks = [...tasks];

    if (sortType === 'MANUAL') {
      const taskIndex = newTasks.findIndex(t => t.id === draggableId);
      if (taskIndex === -1) return;
      
      const [movedTask] = newTasks.splice(taskIndex, 1);
      
      if (source.droppableId !== destination.droppableId) {
        movedTask.status = destination.droppableId as TaskStatus;
        if (movedTask.status === TaskStatus.DONE) {
          triggerConfetti();
        }
      }

      const targetList = newTasks.filter(t => t.status === destination.droppableId);
      
      if (destination.index >= targetList.length) {
        const todoTasks = newTasks.filter(t => t.status === TaskStatus.TODO);
        const doneTasks = newTasks.filter(t => t.status === TaskStatus.DONE);
        
        if (destination.droppableId === TaskStatus.TODO) {
          todoTasks.splice(destination.index, 0, movedTask);
        } else {
          doneTasks.splice(destination.index, 0, movedTask);
        }
        
        setTasks([...todoTasks, ...doneTasks]);
      } else {
        const targetItem = targetList[destination.index];
        const targetIndexInMain = newTasks.findIndex(t => t.id === targetItem.id);
        
        newTasks.splice(targetIndexInMain, 0, movedTask);
        setTasks(newTasks);
      }
    } else {
      if (source.droppableId !== destination.droppableId) {
         setTasks(prev => prev.map(t => {
           if (t.id === draggableId) {
             if (destination.droppableId === TaskStatus.DONE) {
               triggerConfetti();
             }
             return { ...t, status: destination.droppableId as TaskStatus };
           }
           return t;
         }));
      }
    }
  };

  const addTask = (content: string) => {
    if (!content.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      content: content.trim(),
      status: TaskStatus.TODO,
      createdAt: Date.now()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue('');
  };

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAIGenerate = async () => {
    if (!inputValue.trim()) return;
    setIsGenerating(true);
    try {
      const suggestedTasks = await generateAIPlan(inputValue);
      
      const newTasks = suggestedTasks.map(content => ({
        id: crypto.randomUUID(),
        content,
        status: TaskStatus.TODO,
        createdAt: Date.now()
      }));
      
      setTasks(prev => [...newTasks, ...prev]);
      setInputValue('');
    } catch (error) {
      console.error('Error generating AI plan:', error);
      alert('Failed to generate AI plan. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const todoTasks = getSortedTasks(tasks.filter(t => t.status === TaskStatus.TODO));
  const doneTasks = getSortedTasks(tasks.filter(t => t.status === TaskStatus.DONE));

  // Shared Components
  const HeaderContent = () => (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#020617] shrink-0">
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-[#020617] to-[#020617]"></div>
      </div>

      <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-3">
              <div className="relative w-fit">
                 {/* Neon Background Highlight (No Box) */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-cyan-500/20 blur-[30px] rounded-full pointer-events-none"></div>
                 
                 <h1 className="relative font-cyber text-3xl sm:text-4xl font-bold tracking-widest flex flex-col leading-none z-10">
                   <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">CYBER</span>
                   <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">TASKER</span>
                 </h1>
              </div>

              <div className="flex items-center gap-2 text-slate-300 text-[10px] font-bold tracking-widest uppercase bg-slate-950/50 border border-white/5 w-fit px-2.5 py-1 rounded-full z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
                  Protocol: Neural Link
              </div>
          </div>

          <div className="text-right shrink-0 z-10">
              <p className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase mb-0.5">
                  Architect
              </p>
              <p className="text-fuchsia-500 font-cyber font-bold text-sm sm:text-base tracking-widest drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                  SIFAT AHMED
              </p>
          </div>
      </div>
    </div>
  );

  const DashboardWidgets = () => (
    <>
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center gap-1 shadow-lg shadow-fuchsia-900/10 shrink-0">
          <div className="text-4xl font-cyber font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tabular-nums">
            {currentTime.toLocaleTimeString([], { hour12: false })}
          </div>
          <div className="text-cyan-400 font-medium tracking-widest uppercase text-xs flex items-center gap-2">
            <Clock size={12} />
            {currentTime.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 h-64 flex flex-col relative overflow-hidden group shrink-0">
        <h2 className="text-xl font-bold text-slate-100 mb-4 z-10 flex items-center gap-2">
          <BrainCircuit className="text-fuchsia-500" />
          Sync Rate
        </h2>
        <div className="flex-1 w-full h-full relative z-10">
          <StatsChart tasks={tasks} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shrink-0">
          <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            View Protocol
          </h3>
          <div className="flex gap-2 mb-6 bg-slate-900/50 p-1 rounded-lg">
            <button
              onClick={() => setSortType('MANUAL')}
              className={`flex-1 p-2 rounded flex justify-center items-center transition-all ${
                sortType === 'MANUAL' 
                ? 'bg-slate-700 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Manual Sort"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setSortType('DATE')}
              className={`flex-1 p-2 rounded flex justify-center items-center transition-all ${
                sortType === 'DATE' 
                ? 'bg-slate-700 text-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.2)]' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Sort by Date (Newest)"
            >
              <Calendar size={18} />
            </button>
            <button
              onClick={() => setSortType('ALPHA')}
              className={`flex-1 p-2 rounded flex justify-center items-center transition-all ${
                sortType === 'ALPHA' 
                ? 'bg-slate-700 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.2)]' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Sort A-Z"
            >
              <ArrowDownAZ size={18} />
            </button>
          </div>

          <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-4">Quick Actions</h3>
          <button 
            onClick={() => setTasks([])}
            className="w-full py-2 px-4 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
          >
            Purge Memory
          </button>
      </div>
    </>
  );

  return (
    <div className="h-screen w-full text-slate-200 overflow-hidden relative flex flex-col lg:flex-row bg-[#050510]">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* MOBILE HEADER (Visible < lg) */}
      <div className="lg:hidden p-3 shrink-0 flex flex-col gap-2 z-20">
         <HeaderContent />
         <button 
           onClick={() => setShowMobileDashboard(true)}
           className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900/60 border border-white/10 text-cyan-400 font-cyber tracking-widest uppercase text-xs hover:bg-slate-800/80 transition-colors shadow-lg backdrop-blur-md"
         >
           <Settings2 size={14} /> Open Dashboard
         </button>
      </div>

      {/* MOBILE DASHBOARD OVERLAY */}
      {showMobileDashboard && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#050510]/95 backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200">
           <div className="p-4 flex items-center justify-between border-b border-white/10 bg-slate-900/50">
              <h2 className="font-cyber text-lg text-white tracking-widest">SYSTEM DASHBOARD</h2>
              <button 
                onClick={() => setShowMobileDashboard(false)}
                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white border border-white/5"
              >
                <X size={20} />
              </button>
           </div>
           <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              <DashboardWidgets />
           </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Visible >= lg) */}
      <aside className="hidden lg:flex flex-col w-[340px] shrink-0 h-full overflow-y-auto p-6 gap-6 border-r border-white/5 bg-slate-950/30 backdrop-blur-sm custom-scrollbar">
         <HeaderContent />
         <DashboardWidgets />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full min-h-0 overflow-hidden relative">
        
        {/* Input Area */}
        <div className="p-3 lg:p-6 pb-0 shrink-0 z-10">
          <div className="p-0.5 sm:p-1 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(192,38,211,0.2)]">
            <div className="bg-slate-900 rounded-xl p-1.5 sm:p-2 flex flex-col sm:flex-row gap-2 relative overflow-hidden">
               <form onSubmit={handleAddTask} className="flex-1 flex gap-2">
                 <input
                   type="text"
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder="Enter directive..."
                   className="flex-1 bg-transparent border-none outline-none text-white px-2 py-2 sm:px-3 sm:py-3 placeholder-slate-500 text-base sm:text-lg font-medium min-w-0"
                   disabled={isGenerating}
                 />
                 <button
                   type="submit"
                   disabled={!inputValue.trim() || isGenerating}
                   className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(192,38,211,0.5)] hover:shadow-[0_0_25px_rgba(192,38,211,0.8)] disabled:opacity-50 disabled:shadow-none shrink-0"
                   aria-label="Add Task"
                 >
                   <Plus size={20} className="sm:w-6 sm:h-6" />
                 </button>
               </form>
               <div className="w-full h-px sm:w-px sm:h-auto bg-slate-700 hidden sm:block mx-1"></div>
               <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={!inputValue.trim() || isGenerating}
                  className="bg-cyan-900/30 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 mt-1 sm:mt-0 text-sm sm:text-base"
               >
                 {isGenerating ? (
                   <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-cyan-400" />
                 ) : (
                   <Sparkles size={16} className="sm:w-5 sm:h-5" />
                 )}
                 <span>AI Plan</span>
               </button>
            </div>
          </div>
        </div>

        {/* Kanban Board - Layout Engine */}
        <div className="flex-1 min-h-0 p-3 lg:p-6 pt-2 lg:pt-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-3 lg:gap-6 h-full min-h-0">
              
              {/* PENDING Column */}
              <div className="flex flex-col rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/5 overflow-hidden h-full min-h-0 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 to-transparent pointer-events-none" />
                
                {/* Header */}
                <div className="p-3 sm:p-4 border-b border-white/5 bg-slate-900/60 flex items-center justify-between shrink-0 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-fuchsia-500 shadow-[0_0_10px_#d946ef] animate-pulse" />
                    <h2 className="font-cyber text-lg sm:text-2xl font-bold tracking-widest text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.6)]">
                      PENDING
                    </h2>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold font-mono text-slate-400 bg-slate-950 border border-white/10 px-3 py-1.5 rounded-full uppercase">
                    {todoTasks.length} TASKS
                  </span>
                </div>

                {/* List Area */}
                <Droppable droppableId={TaskStatus.TODO}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 p-2 sm:p-4 overflow-y-auto overflow-x-hidden space-y-2 sm:space-y-3 transition-colors custom-scrollbar relative z-10 ${
                        snapshot.isDraggingOver ? 'bg-fuchsia-500/5' : ''
                      }`}
                    >
                      {todoTasks.map((task, index) => (
                        <TaskItem key={task.id} task={task} index={index} onDelete={handleDelete} />
                      ))}
                      {provided.placeholder}
                      {todoTasks.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-xl m-2">
                           <List className="mb-2 opacity-50" />
                           <span className="text-xs uppercase tracking-widest">System Idle</span>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* COMPLETED Column */}
              <div className="flex flex-col rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/5 overflow-hidden h-full min-h-0 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
                
                {/* Header */}
                <div className="p-3 sm:p-4 border-b border-white/5 bg-slate-900/60 flex items-center justify-between shrink-0 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_10px_#22d3ee]">
                        <Check size={14} className="text-black" strokeWidth={3} />
                    </div>
                    <h2 className="font-cyber text-lg sm:text-2xl font-bold tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                      COMPLETED
                    </h2>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold font-mono text-slate-400 bg-slate-950 border border-white/10 px-3 py-1.5 rounded-full uppercase">
                    {doneTasks.length} TASKS
                  </span>
                </div>

                {/* List Area */}
                <Droppable droppableId={TaskStatus.DONE}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 p-2 sm:p-4 overflow-y-auto overflow-x-hidden space-y-2 sm:space-y-3 transition-colors custom-scrollbar relative z-10 ${
                        snapshot.isDraggingOver ? 'bg-cyan-500/5' : ''
                      }`}
                    >
                      {doneTasks.map((task, index) => (
                        <TaskItem key={task.id} task={task} index={index} onDelete={handleDelete} />
                      ))}
                      {provided.placeholder}
                       {doneTasks.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800/50 rounded-xl m-2">
                          <span className="text-xs uppercase tracking-widest opacity-50">Awaiting Completion</span>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>

            </div>
          </DragDropContext>
        </div>
      </main>
    </div>
  );
};

export default App;