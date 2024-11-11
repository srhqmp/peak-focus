'use client';

import { useState, useRef } from 'react';
import { TimerOption, TimeType } from '@/app/lib/definitions';

const timeOptions = {
  pomodoro: { minutes: 25, seconds: 0 },
  'short-break': { minutes: 5, seconds: 0 },
  'long-break': { minutes: 10, seconds: 0 },
};

export default function Timer() {
  const [active, setActive] = useState<TimerOption>(TimerOption.pomodoro); // pomodoro | short-break | long-break
  const [time, setTime] = useState<TimeType>(timeOptions[active]);
  const [isStarted, setIsStarted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const changeOption = (option: TimerOption) => () => {
    setActive(option);
    setTime(timeOptions[option]);
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
        return { minutes, seconds };
      });
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => () => {
    const status = !isStarted;
    console.log('timer ', status ? 'started' : 'paused');
    setIsStarted(status);
    if (status) {
      decreaseTime();
    } else {
      stopInterval();
    }
  };

  return (
    <div className="container max-w-2xl mx-auto bg-white bg-opacity-10 rounded-md py-6 flex flex-col items-center">
      <div id="timer-options" className="flex gap-6">
        <button
          onClick={changeOption(TimerOption.pomodoro)}
          className={
            active === TimerOption.pomodoro
              ? 'bg-background px-4 py-1 rounded-md font-bold'
              : ''
          }
        >
          Pomodoro
        </button>
        <button
          onClick={changeOption(TimerOption.shortBreak)}
          className={
            active === TimerOption.shortBreak
              ? 'bg-background px-4 py-1 rounded-md font-bold'
              : ''
          }
        >
          Short Break
        </button>
        <button
          onClick={changeOption(TimerOption.longBreak)}
          className={
            active === TimerOption.longBreak
              ? 'bg-background px-4 py-1 rounded-md font-bold'
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
        onClick={startTimer()}
        className={`button uppercase text-2xl text-background bg-white px-14 rounded-md py-3 relative border-b-8 font-bold ${
          isStarted ? 'top-1' : ''
        }`}
      >
        {isStarted ? 'Pause' : 'Start'}
      </button>
    </div>
  );
}
