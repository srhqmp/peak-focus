import React from 'react';

import { BackgroundContextType } from '@/app/lib/definitions';

export const BackgroundContext =
  React.createContext<BackgroundContextType | null>(null);

export const TasksContext = React.createContext(null);
