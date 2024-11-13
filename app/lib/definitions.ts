export enum TimerOption {
  pomodoro = 'pomodoro',
  shortBreak = 'short-break',
  longBreak = 'long-break',
}

export type TimeType = {
  minutes: number;
  seconds: number;
};

export type BackgroundContextType = {
  changeBg: (option: TimerOption) => void;
  color: string;
};

export type TaskType = {
  name: string;
  id: string;
  isDone: boolean;
  pomodoro: { estimated: number; finished: number };
};

export type TasksContextType = {
  activeTask: TaskType;
  // TODO: Add task list?
};
