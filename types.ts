export enum TaskStatus {
  TODO = 'TODO',
  DONE = 'DONE'
}

export interface Task {
  id: string;
  content: string;
  status: TaskStatus;
  createdAt: number;
}

export interface DragResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  } | null;
}
