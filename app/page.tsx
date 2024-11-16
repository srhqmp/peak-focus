import { Timer, Tasks, TaskSummary } from './components';

export default function Home() {
  return (
    <div className="px-2 sm:px-0 container max-w-2xl mx-auto">
      <Timer />
      <Tasks />
      <TaskSummary />
    </div>
  );
}
