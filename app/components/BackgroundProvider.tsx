'use client';

import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import { BackgroundContext } from '@/app/context/index';

import { TimerOption } from '../lib/definitions';

const color = {
  pomodoro: 'pomodoro',
  'short-break': 'shortbreak',
  'long-break': 'longbreak',
};

export default function BackgroundProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [backgroundColor, setBackgroundColor] = useState(color.pomodoro);

  const changeBg = (mode: TimerOption) => {
    if (mode) {
      setBackgroundColor(() => color[mode]);
    }
  };

  const bg = `bg-${backgroundColor}`;

  return (
    <div className={clsx(bg, 'h-screen')}>
      <BackgroundContext.Provider value={{ changeBg, color: backgroundColor }}>
        {children}
      </BackgroundContext.Provider>
    </div>
  );
}
