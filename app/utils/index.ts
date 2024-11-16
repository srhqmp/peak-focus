export const calculateRemainingHours = (remainingPomodoros: number): number => {
  const POMODORO_DURATION = 25; // minutes
  const SHORT_BREAK = 5; // minutes
  const LONG_BREAK = 15; // minutes
  const COMPLETE_SET_POMODOROS = 4; // Number of Pomodoros in a complete set

  // Time for 4 Pomodoros including breaks (3 short breaks + 1 long break)
  const completeSetTime =
    POMODORO_DURATION * COMPLETE_SET_POMODOROS +
    SHORT_BREAK * (COMPLETE_SET_POMODOROS - 1) +
    LONG_BREAK;

  const completeSets = Math.floor(remainingPomodoros / COMPLETE_SET_POMODOROS);
  const remaining = remainingPomodoros % COMPLETE_SET_POMODOROS;

  // Time for remaining Pomodoros (each with a short break except the last one)
  const remainingTime =
    remaining > 0
      ? POMODORO_DURATION * remaining + SHORT_BREAK * (remaining - 1)
      : 0;

  const totalTimeMinutes = completeSets * completeSetTime + remainingTime;
  const totalTimeHours = totalTimeMinutes / 60;

  const roundedTime = Math.floor(totalTimeHours * 10) / 10;

  return roundedTime;
};

export const getCurrentTimePlusRemainingHours = (
  remainingHours: number
): string => {
  const currentTime = new Date();

  const futureTime = new Date(
    currentTime.getTime() + remainingHours * 60 * 60 * 1000
  );

  // Format the future time to HH:MM AM/PM format
  const hours = futureTime.getHours();
  const minutes = futureTime.getMinutes().toString().padStart(2, '0');

  // Convert to 12-hour format with AM/PM
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

  const formattedFutureTime = `${period} ${formattedHours}:${minutes}`;

  return formattedFutureTime;
};
