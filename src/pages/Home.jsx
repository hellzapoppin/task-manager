import {
  GlassWaterIcon,
  LoaderIcon,
  Task2Icon,
  TaskIcon,
} from '../assets/icons';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useGetTasks } from '../hooks/data/use-get-tasks';

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length;
  const completedTasks = tasks?.filter((task) => task.status === 'done').length;
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Dashboard" subtitle="Dashboard" />
        <div className="grid grid-cols-4 gap-2">
          <DashboardCard
            icon={<Task2Icon />}
            mainText={tasks?.length}
            secondaryText="Tarefas diponíveis"
          />
          <DashboardCard
            icon={<TaskIcon />}
            mainText={completedTasks}
            secondaryText="Tarefas concluídas"
          />
          <DashboardCard
            icon={<LoaderIcon />}
            mainText={inProgressTasks}
            secondaryText="Tarefas em andamento"
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            mainText="5"
            secondaryText="Água"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
