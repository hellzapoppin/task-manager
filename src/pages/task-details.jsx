import { useEffect, useState } from 'react';
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
import Input from '../components/input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const { taskId } = useParams();

  const [task, setTask] = useState([]);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });

      const data = await response.json();
      setTask(data);
      reset(data);
    };

    fetchTask();
  }, [taskId, reset]);

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      }),
    });
    if (!response.ok) {
      return toast.error('Ocorreu um erro ao salva a tarefa');
    }
    const newTask = await response.json();
    setTask(newTask);
    toast.success('Tarefa salva com sucesso!');
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return toast.error('Erro ao deletar tarefa');
    }

    toast.success('Tarefa deletada com sucesso');
    navigate(-1);
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
            disabled={isSubmitting}
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
              {isSubmitting && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
