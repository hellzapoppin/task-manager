import { useQuery } from '@tanstack/react-query';

import { taskQueryKeys } from '../../keys/queries';
import { api } from '../../lib/axios';

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get('http://localhost:3000/tasks');
      return tasks;
    },
  });
};
