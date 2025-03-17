import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeft,
  ChevronRight,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';
import { useDeteleTask } from '../hooks/data/use-delete-task';
import { useGetTask } from '../hooks/data/use-get-task';
import { useUpdateTask } from '../hooks/data/use-update-task';

const TaskDetailsPage = () => {
  const { taskId } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: task } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  });

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeteleTask(taskId);

  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (task) => {
    updateTask(task, {
      onSuccess: () => {
        toast.success('Tarefa salva com sucesso!');
      },
      onError: () => {
        toast.error('Ocorreu um erro ao salva a tarefa');
      },
    });
  };

  const handleDeleteClick = async () => {
    deleteTask(taskId, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso');
        navigate(-1);
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa');
      },
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeft />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRight className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            disabled={updateTaskIsLoading || deleteTaskIsLoading}
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register('title', {
                  required: 'O título é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio';
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.title?.message}
              ></Input>
            </div>
            <div>
              <TimeSelect
                {...register('time', { required: 'O período é obrigatório' })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                {...register('description', {
                  required: 'A descrição é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia';
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.description?.message}
              ></Input>
            </div>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button size="large" type="submit">
              {(updateTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
