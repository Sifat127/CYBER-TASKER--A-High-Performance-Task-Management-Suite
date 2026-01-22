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