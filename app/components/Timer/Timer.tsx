'use client';

import { useState, useRef, useContext, useEffect } from 'react';
import { TimerOption, TimeType } from '@/app/lib/definitions';
import { BackgroundContext, TasksContext } from '@/app/context';

const timeOptions = {
  pomodoro: { minutes: 25, seconds: 0 },
  'short-break': { minutes: 5, seconds: 0 },
  'long-break': { minutes: 15, seconds: 0 },
};

export default function Timer() {
  const [active, setActive] = useState<TimerOption>(TimerOption.pomodoro); // pomodoro | short-break | long-break
  const [time, setTime] = useState<TimeType>(timeOptions[active]);
  const [isStarted, setIsStarted] = useState(false);

  const bgContext = useContext(BackgroundContext);
  const taskContext = useContext(TasksContext);

  if (!bgContext || !taskContext) {
    throw new Error('Context is not provided');
  }

  const { changeBg, color } = bgContext;
  const { updateTask, activeTask } = taskContext;

  useEffect(() => {
    changeBg(active); // Update background after the component mounts or active changes
  }, [active, changeBg]);

  useEffect(() => {
    if (
      active === TimerOption.pomodoro &&
      time.minutes === 0 &&
      time.seconds === 0 &&
      activeTask
    ) {
      // update active task with finished pomodoro
      setTimeout(() => {
        const updatedTask = {
          ...activeTask,
          pomodoro: {
            ...activeTask?.pomodoro,
            finished: activeTask?.pomodoro.finished + 1,
          },
        };
        updateTask(updatedTask);
      }, 1200);
    }
  }, [time, activeTask, updateTask, active]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const changeOption = (option: TimerOption) => {
    setActive(option);
    setTime(timeOptions[option]);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleButton = () => {
    const status = !isStarted;
    console.log('timer ', status ? 'started' : 'paused');
    setIsStarted(status);
    if (status) {
      decreaseTime();
    } else {
      stopInterval();
    }
  };

  const decreaseTime = () => {
    intervalRef.current = setInterval(() => {
      setTime(({ minutes, seconds }: TimeType): TimeType => {
        if (seconds === 0 && minutes !== 0) {
          return { minutes: minutes - 1, seconds: 59 };
        }
        if (seconds !== 0 && minutes !== 0) {
          return { minutes, seconds: seconds - 1 };
        }
        if (seconds !== 0 && minutes === 0) {
          return { minutes, seconds: seconds - 1 };
        }
        console.log('timer ended');
        setIsStarted(false);
        stopInterval();

        if (active === TimerOption.pomodoro) {
          changeOption(TimerOption.shortBreak);
        }
        if (
          active == TimerOption.shortBreak ||
          active == TimerOption.longBreak
        ) {
          changeOption(TimerOption.pomodoro);
        }
        return { minutes, seconds };
      });
    }, 1000);
  };

  return (
    <div className="bg-white bg-opacity-10 rounded-md py-6 flex flex-col items-center">
      <div id="timer-options" className="flex gap-6">
        <button
          onClick={() => changeOption(TimerOption.pomodoro)}
          className={
            active === TimerOption.pomodoro
              ? `bg-${color} px-4 py-1 rounded-md font-bold`
              : ''
          }
        >
          Pomodoro
        </button>
        <button
          onClick={() => changeOption(TimerOption.shortBreak)}
          className={
            active === TimerOption.shortBreak
              ? `bg-${color}  px-4 py-1 rounded-md font-bold`
              : ''
          }
        >
          Short Break
        </button>
        <button
          onClick={() => changeOption(TimerOption.longBreak)}
          className={
            active === TimerOption.longBreak
              ? `bg-${color}  px-4 py-1 rounded-md font-bold`
              : ''
          }
        >
          Long Break
        </button>
      </div>
      <div id="timer" className="text-8xl font-bold my-8">
        <span className="minute">{String(time.minutes).padStart(2, '0')}</span>:
        <span className="second">{String(time.seconds).padStart(2, '0')}</span>
      </div>
      <button
        id="start-stop-button"
        onClick={() => toggleButton()}
        className={`button uppercase text-2xl bg-white text-${color} px-14 rounded-md py-3 relative border-b-8 font-bold ${
          isStarted ? 'top-1' : ''
        }`}
      >
        {isStarted ? 'Pause' : 'Start'}
      </button>
    </div>
  );
}
