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
