import { CloudSunIcon, MoonIcon, SunIcon } from '../assets/icons';
import { useGetTasks } from '../hooks/data/use-get-tasks';
import Header from './Header';
import TaskItem from './TaskItem';
import TaskSeparator from './TasksSeparator';

const Tasks = () => {
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks?.filter((task) => task.time === 'evening');

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />

      <div className="rounded-lg bg-white p-6">
        <div className="space-y-3">
          {morningTasks?.length > 0 && (
            <TaskSeparator title="Manhã" icon={<SunIcon />} />
          )}
          {morningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="my-6 space-y-3">
          {afternoonTasks?.length > 0 && (
            <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="space-y-3">
          {eveningTasks?.length > 0 && (
            <TaskSeparator title="Noite" icon={<MoonIcon />} />
          )}
          {eveningTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
