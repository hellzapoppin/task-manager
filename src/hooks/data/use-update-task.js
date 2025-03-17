import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskQueryKeys } from '../../keys/queries';
import { api } from '../../lib/axios';

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (newTask) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: newTask.title.trim(),
        time: newTask.time,
        description: newTask.description.trim(),
      });

      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }
          return task;
        });
      });
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask);
    },
  });
};
