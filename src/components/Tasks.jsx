import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';
import TaskItem from './TaskItem';
import TaskSeparator from './TasksSeparator';

const Tasks = () => {
  const queryClient = useQueryClient();
  const { data: tasks } = useQuery({
    queryKey: 'tasks',
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });
      const tasks = await response.json();
      return tasks;
    },
  });

  const [AddTaskDialogisOpen, setAddTaskDialogisOpen] = useState(false);

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks?.filter((task) => task.time === 'evening');

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!');
        return {
          ...task,
          status: 'in_progress',
        };
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!');
        return {
          ...task,
          status: 'done',
        };
      }

      if (task.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso!');
        return {
          ...task,
          status: 'not_started',
        };
      }

      return task;
    });

    queryClient.setQueryData('tasks', newTasks);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefa
            <TrashIcon />
          </Button>
          <Button onClick={() => setAddTaskDialogisOpen(true)}>
            Adicionar tarefa
            <AddIcon />
          </Button>
          <AddTaskDialog
            isOpen={AddTaskDialogisOpen}
            handleClose={() => setAddTaskDialogisOpen(false)}
          />
        </div>
      </div>

      <div className="rounded-lg bg-white p-6">
        <div className="space-y-3">
          {morningTasks?.length > 0 && (
            <TaskSeparator title="Manhã" icon={<SunIcon />} />
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          {afternoonTasks?.length > 0 && (
            <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="space-y-3">
          {eveningTasks?.length > 0 && (
            <TaskSeparator title="Noite" icon={<MoonIcon />} />
          )}
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
